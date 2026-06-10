import { useEffect, useState } from 'react'
import { PolicyData } from '../../MockData/mockData'
import useStore, { type PolicyType } from '../../Store/Store'
import PolicyCard from '../Card/PolicyCard'
import Pagination from './Pagination'
import Skelton from '../Common/Skelton'

const Layout = () => {
  const { loadPolicy } = useStore()
  const policys = useStore((state) => state.policyData)
  const plan = useStore((state) => state.plan)

  const [currentPageData, setCurrentPageData] = useState<PolicyType[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const [filteredPolicy, setFilteredPolicy] = useState<PolicyType[]>([])

  useEffect(() => {
    loadPolicy(PolicyData)
  }, [])

  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        const response = await fetch('../../MockData/policyData.json')

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data: PolicyType[] = await response.json()
      } catch (err) {
        console.log('Error--')
      }
    }

    fetchLocalData()
  }, [])

  useEffect(() => {
    const startItem = (currentPage - 1) * 3
    const endItem = startItem + 3
    setFilteredPolicy(policys)
    setCurrentPageData(policys.slice(startItem, endItem))
    setTotalPages(policys.length / 3)
  }, [policys])

  useEffect(() => {
    const startItem = (currentPage - 1) * 3
    const endItem = startItem + 3
    setCurrentPageData(filteredPolicy.slice(startItem, endItem))
    setTotalPages(filteredPolicy.length / 3)
  }, [currentPage])

  useEffect(() => {
    const policyItem = policys.filter((d) => {
      if (plan == 'All') return d
      return plan == d.planName
    })
    setFilteredPolicy(policyItem)
    const startItem = (currentPage - 1) * 3
    const endItem = startItem + 3
    setCurrentPageData(policyItem.slice(startItem, endItem))
    setTotalPages(policyItem.length / 3)
  }, [plan])

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      <main>
        {policys.length == 0 && [...Array(3)].map((_, index) => <Skelton key={index}></Skelton>)}
        {currentPageData.length > 0 && currentPageData.map((record, index) => <PolicyCard key={index} policy={record}></PolicyCard>)}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}></Pagination>
      </main>
    </>
  )
}

export default Layout
