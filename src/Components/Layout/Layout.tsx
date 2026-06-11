import { useEffect, useState } from 'react'
import useStore, { type PolicyType } from '../../Store/Store'
import PolicyCard from '../Card/PolicyCard'
import Pagination from './Pagination'
import Skelton from '../Common/Skelton'
import { useShallow } from 'zustand/react/shallow'

const Layout = () => {
  const { loadPolicy } = useStore()
  const policys = useStore((state) => state.policyData)
  const policyFilter = useStore(useShallow((state) => state.getPolicy()))

  const [currentPageData, setCurrentPageData] = useState<PolicyType[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        const response = await fetch('/policyData.json')
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data: PolicyType[] = await response.json()
        loadPolicy(data)
      } catch (err) {
        console.log('Error--', err)
      }
    }

    fetchLocalData()
  }, [])

  const calculateTotalAndCurrentPage = (Items: PolicyType[] = [], ItemPerPage: number = 3) => {
    if (Items.length <= ItemPerPage) {
      const total = 1
      if (total < currentPage) setCurrentPage(total)
      const startItem = 0
      const endItem = startItem + ItemPerPage
      setCurrentPageData(policyFilter.slice(startItem, endItem))
      setTotalPages(total)
    } else {
      const total = Math.floor(policyFilter.length / ItemPerPage)
      if (total < currentPage) setCurrentPage(total)
      const startItem = total < currentPage ? total : (currentPage - 1) * 3
      const endItem = startItem + ItemPerPage
      setCurrentPageData(policyFilter.slice(startItem, endItem))
      setTotalPages(total)
    }
  }

  useEffect(() => {
    calculateTotalAndCurrentPage(policyFilter)
  }, [policyFilter, currentPage])

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      <main className="mb-18">
        {policys.length == 0 && [...Array(3)].map((_, index) => <Skelton key={index}></Skelton>)}
        {currentPageData.length > 0 ? (
          currentPageData.map((record, index) => <PolicyCard key={index} policy={record}></PolicyCard>)
        ) : (
          <div className="mt-24 text-center">No Data Available</div>
        )}
      </main>
      <footer> {currentPageData.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}></Pagination>}</footer>
    </>
  )
}

export default Layout
