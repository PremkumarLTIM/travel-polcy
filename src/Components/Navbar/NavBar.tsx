import useStore from "../../Store/Store"



const Navbar = () => {
  const { filterPlan } = useStore()
  const planItems = ['All', 'Domestic', 'Comprehensive', 'Essentials']

  const handleChange = (e: Event) => {
    filterPlan(e.target.value)
  }

  return (
    <>
      <nav className="relative bg-gray-100 ">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center ">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 ">
                <div className="rounded-md px-3 py-2 text-sm font-medium text-black">Travel Policy</div>
                <div style={{ margin: 'auto' }}>
                  <label htmlFor="plan">Plan:</label>
                  <select name="plan" id="plan" onChange={handleChange}>
                    {planItems.map((d, i) => (
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
