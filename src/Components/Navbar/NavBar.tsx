import useStore from '../../Store/Store'

const Navbar = () => {
  const { setFilterBy } = useStore()
  const planItems = ['All', 'Domestic', 'Comprehensive', 'Essentials']
  const statusItems = ['Active', 'Expired']
  const sortOrderItems = ['Asc', 'Desc']
  const defaultFilterBy = useStore((state) => state.filterBy)

  const handleChange = (e: Event | undefined) => {
    if (e?.target?.value == '' || e?.target?.value == undefined || e?.target?.value == null) setFilterBy(defaultFilterBy)
    const { name, value } = e?.target
    setFilterBy({ [name]: value })
  }

  return (
    <>
      <nav className="relative bg-gray-100 ">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center ">
            <div className="sm:ml-6 sm:block">
              <div className="flex space-x-4 ">
                <div className="rounded-md px-3 py-2 text-sm font-medium text-black">Travel Policy</div>
                <div className="my-auto mx-5">
                  <label htmlFor="plan">Plan:</label>
                  <select name="plan" id="plan" onChange={handleChange}>
                    {planItems.map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="my-auto mx-5">
                  <label htmlFor="status">Status:</label>
                  <select name="status" id="status" onChange={handleChange}>
                    {statusItems.map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="my-auto mx-5">
                  <label htmlFor="sortBy">Sort:</label>
                  <select name="sortBy" id="sortBy" onChange={handleChange}>
                    {sortOrderItems.map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
