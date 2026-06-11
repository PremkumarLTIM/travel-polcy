import { create } from 'zustand'

interface DestinationType {
  code: string
  name: string
}

export interface PolicyType {
  policyNumber: string
  policyStart: string
  policyEnd: string
  primaryTravellerFirstname: string
  primaryTravellerLastName: string
  primaryTravellerPhoneNumber: string
  status: string
  destinations: DestinationType[]
  alphaCode: string
  iSO3CountryOfResidence: string
  underwriterCode: string
  groupCode: string
  type: string
  excess: number
  maxTripDuration: number
  planName: string
}

interface FilterByType {
  plan: string
  status: Boolean
}

interface StoreState {
  policyData: PolicyType[]
  filterBy: FilterByType
  getPolicy: () => PolicyType[]
}

interface StoreActions {
  loadPolicy: (policy: PolicyType[]) => void
  setFilterBy: (filterBy: any) => void
}

type Store = StoreState & StoreActions

const useStore = create<Store>((set, get) => ({
  policyData: [],
  filterBy: {
    plan: 'All',
    status: true,
  },
  loadPolicy: (policyData) => set({ policyData }),
  setFilterBy: (filter: any) => set((state) => ({ filterBy: { ...state.filterBy, ...filter } })),
  getPolicy: () => {
    const { policyData, filterBy } = get()

    if (policyData.length == 0) return []

    return policyData
      .filter((record) => {
        if (filterBy.plan == 'All') return filterBy.status ? record.status == 'Active' : record
        if (filterBy.plan == record.type) return filterBy.status ? record.status == 'Active' : record
        return false
      })
      .sort((a, b) => {
        return Date.parse(a.policyStart) - Date.parse(b.policyStart)
      })
  },
}))

export default useStore
