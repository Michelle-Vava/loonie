import type { TaxLine } from '@/types/tax'

const HST_PROVINCES: Record<string, number> = {
  ON: 0.13,
  NS: 0.15,
  NB: 0.15,
  PEI: 0.15,
  NL: 0.15,
}

const GST_PST_PROVINCES: Record<string, { pstName: string; pstRate: number }> = {
  BC: { pstName: 'PST', pstRate: 0.07 },
  SK: { pstName: 'PST', pstRate: 0.06 },
  MB: { pstName: 'RST', pstRate: 0.07 },
  QC: { pstName: 'QST', pstRate: 0.09975 },
}

const GST_ONLY_PROVINCES = ['AB', 'YT', 'NT', 'NU']

const GST_RATE = 0.05

export function calculateTax(
  sellerProvince: string,
  clientCountry: string,
  clientProvince: string | null,
  subtotal: number,
  isGstRegistered: boolean
): TaxLine[] {
  // Rule 1: international client — zero-rated
  if (clientCountry !== 'CA') {
    return [
      {
        name: 'GST/HST',
        rate: 0,
        amount: 0,
        note: 'Zero-rated export supply — GST/HST not applicable (ETA s.123)',
      },
    ]
  }

  // Rule 2: seller not registered — no tax
  if (!isGstRegistered) {
    return []
  }

  // Rule 3: Canadian client, seller is registered — use client province
  const province = (clientProvince ?? sellerProvince).toUpperCase()

  if (HST_PROVINCES[province] !== undefined) {
    const rate = HST_PROVINCES[province]
    return [{ name: 'HST', rate, amount: round(subtotal * rate) }]
  }

  if (GST_PST_PROVINCES[province]) {
    const { pstName, pstRate } = GST_PST_PROVINCES[province]
    return [
      { name: 'GST', rate: GST_RATE, amount: round(subtotal * GST_RATE) },
      { name: pstName, rate: pstRate, amount: round(subtotal * pstRate) },
    ]
  }

  // Alberta + territories: GST only
  if (GST_ONLY_PROVINCES.includes(province)) {
    return [{ name: 'GST', rate: GST_RATE, amount: round(subtotal * GST_RATE) }]
  }

  // fallback: GST only
  return [{ name: 'GST', rate: GST_RATE, amount: round(subtotal * GST_RATE) }]
}

function round(n: number) {
  return Math.round(n * 100) / 100
}
