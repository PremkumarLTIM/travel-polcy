import useStore from '../../Store/Store'

const Navbar = () => {
  const { setFilterBy } = useStore()
  const planItems = ['All', 'Single Trip', 'Annual']
  const defaultFilterBy = useStore((state) => state.filterBy)

  const handleChange = (e: Event | undefined) => {
    if (e?.target?.value == '' || e?.target?.value == undefined || e?.target?.value == null) setFilterBy(defaultFilterBy)
    const { name, value, checked } = e?.target
    setFilterBy({ [name]: name == 'status' ? checked : value })
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
                  <label htmlFor="plan">Plan Type:</label>
                  <select name="plan" id="plan" onChange={handleChange}>
                    {planItems.map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="my-auto mx-5">
                  <input
                    type="checkbox"
                    name="status"
                    checked={defaultFilterBy.status}
                    onChange={handleChange}
                    className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                  ></input>
                  <label htmlFor="status" className="select-none ms-2 text-sm font-medium text-heading">
                    Active-only
                  </label>
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
