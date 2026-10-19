import { calculateTax } from '@/lib/tax'

const subtotal = 1000

describe('calculateTax — international clients', () => {
  it('US client returns zero-rated with note', () => {
    const lines = calculateTax('NS', 'US', null, subtotal, true)
    expect(lines).toHaveLength(1)
    expect(lines[0].rate).toBe(0)
    expect(lines[0].amount).toBe(0)
    expect(lines[0].note).toMatch(/ETA s\.123/)
  })

  it('UK client returns zero-rated', () => {
    const lines = calculateTax('ON', 'GB', null, subtotal, true)
    expect(lines[0].rate).toBe(0)
  })
})

describe('calculateTax — seller not registered', () => {
  it('returns empty array for Canadian client when not registered', () => {
    const lines = calculateTax('ON', 'CA', 'ON', subtotal, false)
    expect(lines).toHaveLength(0)
  })
})

describe('calculateTax — HST provinces', () => {
  it('Ontario: HST 13%', () => {
    const lines = calculateTax('NS', 'CA', 'ON', subtotal, true)
    expect(lines).toHaveLength(1)
    expect(lines[0]).toMatchObject({ name: 'HST', rate: 0.13, amount: 130 })
  })

  it('Nova Scotia: HST 15%', () => {
    const lines = calculateTax('NS', 'CA', 'NS', subtotal, true)
    expect(lines[0]).toMatchObject({ name: 'HST', rate: 0.15, amount: 150 })
  })

  it('New Brunswick: HST 15%', () => {
    const lines = calculateTax('NS', 'CA', 'NB', subtotal, true)
    expect(lines[0]).toMatchObject({ name: 'HST', rate: 0.15, amount: 150 })
  })

  it('PEI: HST 15%', () => {
    const lines = calculateTax('NS', 'CA', 'PEI', subtotal, true)
    expect(lines[0]).toMatchObject({ name: 'HST', rate: 0.15, amount: 150 })
  })

  it('Newfoundland: HST 15%', () => {
    const lines = calculateTax('NS', 'CA', 'NL', subtotal, true)
    expect(lines[0]).toMatchObject({ name: 'HST', rate: 0.15, amount: 150 })
  })
})

describe('calculateTax — GST + PST provinces', () => {
  it('British Columbia: GST 5% + PST 7%', () => {
    const lines = calculateTax('NS', 'CA', 'BC', subtotal, true)
    expect(lines).toHaveLength(2)
    expect(lines[0]).toMatchObject({ name: 'GST', rate: 0.05, amount: 50 })
    expect(lines[1]).toMatchObject({ name: 'PST', rate: 0.07, amount: 70 })
  })

  it('Saskatchewan: GST 5% + PST 6%', () => {
    const lines = calculateTax('NS', 'CA', 'SK', subtotal, true)
    expect(lines[0]).toMatchObject({ name: 'GST', rate: 0.05, amount: 50 })
    expect(lines[1]).toMatchObject({ name: 'PST', rate: 0.06, amount: 60 })
  })

  it('Manitoba: GST 5% + RST 7%', () => {
    const lines = calculateTax('NS', 'CA', 'MB', subtotal, true)
    expect(lines[0]).toMatchObject({ name: 'GST', rate: 0.05, amount: 50 })
    expect(lines[1]).toMatchObject({ name: 'RST', rate: 0.07, amount: 70 })
  })

  it('Quebec: GST 5% + QST 9.975%', () => {
    const lines = calculateTax('NS', 'CA', 'QC', subtotal, true)
    expect(lines[0]).toMatchObject({ name: 'GST', rate: 0.05, amount: 50 })
    expect(lines[1]).toMatchObject({ name: 'QST', rate: 0.09975, amount: 99.75 })
  })
})

describe('calculateTax — GST only provinces', () => {
  it('Alberta: GST 5%', () => {
    const lines = calculateTax('NS', 'CA', 'AB', subtotal, true)
    expect(lines).toHaveLength(1)
    expect(lines[0]).toMatchObject({ name: 'GST', rate: 0.05, amount: 50 })
  })

  it('Yukon: GST 5%', () => {
    const lines = calculateTax('NS', 'CA', 'YT', subtotal, true)
    expect(lines[0]).toMatchObject({ name: 'GST', rate: 0.05, amount: 50 })
  })

  it('NWT: GST 5%', () => {
    const lines = calculateTax('NS', 'CA', 'NT', subtotal, true)
    expect(lines[0]).toMatchObject({ name: 'GST', rate: 0.05, amount: 50 })
  })

  it('Nunavut: GST 5%', () => {
    const lines = calculateTax('NS', 'CA', 'NU', subtotal, true)
    expect(lines[0]).toMatchObject({ name: 'GST', rate: 0.05, amount: 50 })
  })
})
