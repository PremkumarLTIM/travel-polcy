import { type PolicyType } from '../../Store/Store'

import './policyCard.css'

import expand from '../../assets/expand.png'

interface policyProps {
  policy: PolicyType
}

const PolicyCard = ({ policy }: policyProps) => {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
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
      <div className="policyCard rounded-xl overflow-hidden mx-auto my-5">
        <div className="bg-white  shadow-sm p-6 flex flex-col gap-4 md:flex-row md:justify-between">
          <div className="flex-1 space-y-3">
            <h2 className="policy-number text-lg">
              <span className='font-bold '>Policy number:</span>
              <span className="text-gray-800 font-small">{policy.policyNumber}</span>
            </h2>

            <div className="container grid grid-cols-1 md:grid-cols-2  md:gap-2 text-sm text-gray-700">
              <div className="vertical-line ">
                <p>
                  <strong>Destination:</strong> {policy.destinations[0].name}
                </p>
                {policy.policyStart && (
                  <p>
                    <strong>{policy.planName != 'Comprehensive' ? 'Travel date:' : 'Policy start date:'}</strong> {FormatDate(policy.policyStart)}{' '}
                    {policy.planName != 'Comprehensive' ? `- ${FormatDate(policy.policyEnd)}` : ''}
                  </p>
                )}

                {policy.planName == 'Comprehensive' && (
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

            <div className="link-class flex gap-4 pt-2">
              <a href="#" className="text-gray-600 underline link-parent">
                <img src={expand} className="expand-image"></img>
                View PDS
              </a>
              <a href="#" className="text-gray-600 underline link-parent">
                <img src={expand} className="expand-image"></img>
                Certificate of insurance
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full md:w-auto md:items-end">
            <button className="button-class h-8 button-yellow  text-blue-700  px-5 rounded-full border border-blue-600">Make a claim</button>

            <button className="button-class h-8 border border-blue-600 text-blue-600 px-5 rounded-full hover:bg-blue-50">Manage my policy</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PolicyCard
