import { create } from 'zustand'
import { shallow } from 'zustand/shallow';

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

interface StoreState {
  policyData: PolicyType[]
  plan: string
}

interface StoreActions {
  loadPolicy: (policy: PolicyType[]) => void
  filterPlan: (paln: string) => void
}

type Store = StoreState & StoreActions

const useStore = create<Store>((set, get) => ({
  policyData: [],
  plan: 'All',
  loadPolicy: (policyData) => set({ policyData }),
  filterPlan: (plan: string) => set({ plan }),
  getPolicy: () => {
    console.log("getPolicy")
    return get().policyData.filter(record => {
      if(get().plan == 'All') return record
      return get().plan == record.planName
    }) ?? []
  }
}))

export default useStore
