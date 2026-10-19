import type { TaxLine } from './tax'
import type { Client } from './client'

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue'

export type LineItem = {
  id: string
  invoice_id: string
  description: string
  quantity: number
  rate: number
  amount: number
  sort_order: number
}

export type InvoiceTax = {
  id: string
  invoice_id: string
  tax_name: string
  tax_rate: number
  tax_amount: number
  note?: string
}

export type Invoice = {
  id: string
  user_id: string
  client_id: string
  invoice_number: string
  issue_date: string
  due_date: string
  currency: 'CAD' | 'USD'
  status: InvoiceStatus
  notes: string | null
  subtotal: number
  tax_total: number
  total: number
  created_at: string
  client?: Client
  line_items?: LineItem[]
  taxes?: InvoiceTax[]
}

export type NewInvoicePayload = {
  client_id: string
  invoice_number: string
  issue_date: string
  due_date: string
  currency: 'CAD' | 'USD'
  notes?: string
  line_items: Omit<LineItem, 'id' | 'invoice_id'>[]
  tax_lines: TaxLine[]
}
