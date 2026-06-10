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
  status: string
  sortBy: string
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
    status: 'All',
    sortBy: 'Asc',
  },
  loadPolicy: (policyData) => set({ policyData }),
  setFilterBy: (filter: any) => set((state) => ({ filterBy: { ...state.filterBy, ...filter } })),
  getPolicy: () => {
    const { policyData, filterBy } = get()

    if (policyData.length == 0) return []

    return policyData
      .filter((record) => {
        if (filterBy.plan == 'All' && filterBy.status == 'All') return record
        if (filterBy.plan == record.planName && filterBy.status == 'All') return record
        if (filterBy.plan == 'All' && filterBy.status == record.status) return record
        return filterBy.plan == record.planName && filterBy.status == record.status
      })
      .sort((a, b) => {
        if (filterBy.sortBy == 'Asc') return Date.parse(a.policyStart) - Date.parse(b.policyStart)
        return Date.parse(b.policyStart) - Date.parse(a.policyStart)
      })
  },
}))

export default useStore
