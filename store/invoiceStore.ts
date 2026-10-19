import { create } from 'zustand'
import type { Invoice, LineItem } from '@/types/invoice'
import type { TaxLine } from '@/types/tax'

type InvoiceStore = {
  invoices: Invoice[]
  currentInvoice: Partial<Invoice> | null
  lineItems: Omit<LineItem, 'id' | 'invoice_id'>[]
  taxLines: TaxLine[]
  setInvoices: (invoices: Invoice[]) => void
  setCurrentInvoice: (invoice: Partial<Invoice> | null) => void
  setLineItems: (items: Omit<LineItem, 'id' | 'invoice_id'>[]) => void
  setTaxLines: (lines: TaxLine[]) => void
  addLineItem: () => void
  removeLineItem: (index: number) => void
  updateLineItem: (index: number, field: string, value: string | number) => void
  reset: () => void
}

const defaultLineItem = () => ({
  description: '',
  quantity: 1,
  rate: 0,
  amount: 0,
  sort_order: 0,
})

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  invoices: [],
  currentInvoice: null,
  lineItems: [defaultLineItem()],
  taxLines: [],

  setInvoices: (invoices) => set({ invoices }),
  setCurrentInvoice: (invoice) => set({ currentInvoice: invoice }),
  setLineItems: (lineItems) => set({ lineItems }),
  setTaxLines: (taxLines) => set({ taxLines }),

  addLineItem: () =>
    set((state) => ({
      lineItems: [...state.lineItems, { ...defaultLineItem(), sort_order: state.lineItems.length }],
    })),

  removeLineItem: (index) =>
    set((state) => ({
      lineItems: state.lineItems.filter((_, i) => i !== index),
    })),

  updateLineItem: (index, field, value) =>
    set((state) => {
      const items = [...state.lineItems]
      const item = { ...items[index], [field]: value }
      item.amount = Math.round(item.quantity * item.rate * 100) / 100
      items[index] = item
      return { lineItems: items }
    }),

  reset: () =>
    set({ currentInvoice: null, lineItems: [defaultLineItem()], taxLines: [] }),
}))
