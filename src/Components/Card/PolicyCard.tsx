import { type PolicyType } from '../../Store/Store'

import './policyCard.css'

interface policyProps {
  policy: PolicyType
}

const PolicyCard = ({ policy }: policyProps) => {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long', 
    year: 'numeric',
  })

  const FormatDate = (dateString: string) => {
    if (dateString == '' || dateString == undefined || dateString == null) return ''

    const date = new Date(dateString)
    const convertFormat = formatter.format(date)
    return convertFormat ?? dateString
  }

  return (
    <>
      <div className="policyCard rounded overflow-hidden shadow-lg mx-auto my-2">
        <div className="bg-white  shadow-sm p-6 flex flex-col gap-4 md:flex-row md:justify-between">
          <div className="flex-1 space-y-3">
            <h2 className="text-blue-600 font-semibold text-lg">
              Policy number: <span className="text-gray-800 font-medium">{policy.policyNumber}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2  md:gap-2 text-sm text-gray-700">
              <div className="vertical-line">
                <p>
                  <strong>Destination:</strong> {policy.destinations[0].name}
                </p>
                {policy.policyStart && (
                  <p>
                    <strong>{policy.planName == 'Comprehensive' ? 'Travel date:' : 'Policy start date:'}</strong> {FormatDate(policy.policyStart)}{' '}
                    {policy.planName == 'Comprehensive' ? `- ${FormatDate(policy.policyEnd)}` : ''}
                  </p>
                )}

                {policy.planName != 'Comprehensive' && (
                  <p>
                    <strong>Maximum trip duration:</strong> Up to {policy.maxTripDuration} days
                  </p>
                )}
              </div>
              <div>
                <p>
                  <strong>Plan:</strong> {policy.planName}
                </p>
                <p>
                  <strong>Excess:</strong> ${policy.excess}
                </p>
              </div>
            </div>

            <div className="flex gap-4 text-sm">
              <a href="#" className="text-gray-600 hover:underline">
                View PDS
              </a>
              <a href="#" className="text-gray-600 hover:underline">
                Certificate of insurance
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto md:items-end">
            <button className="button-class bg-yellow-300 hover:bg-yellow-400 text-blue-700 font-medium px-5 py-2 rounded-full border border-blue-600">Make a claim</button>

            <button className="button-class border border-blue-600 text-blue-600 px-5 py-2 rounded-full hover:bg-blue-50">Manage my policy</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PolicyCard
