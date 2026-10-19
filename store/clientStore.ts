import { create } from 'zustand'
import type { Client } from '@/types/client'

type ClientStore = {
  clients: Client[]
  selectedClient: Client | null
  setClients: (clients: Client[]) => void
  setSelectedClient: (client: Client | null) => void
}

export const useClientStore = create<ClientStore>((set) => ({
  clients: [],
  selectedClient: null,
  setClients: (clients) => set({ clients }),
  setSelectedClient: (client) => set({ selectedClient: client }),
}))
