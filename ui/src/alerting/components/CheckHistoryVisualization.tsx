// Libraries
import React, {FC, createContext, useState} from 'react'
import {get} from 'lodash'

// Components
import {Plot} from '@influxdata/giraffe'
import CheckPlot from 'src/shared/components/CheckPlot'
import EmptyQueryView, {ErrorFormat} from 'src/shared/components/EmptyQueryView'
import TimeSeries from 'src/shared/components/TimeSeries'

// Types
import {ResourceIDs} from 'src/alerting/reducers/checks'
import {Check, TimeZone, CheckViewProperties, TimeRange} from 'src/types'

// Utils
import {createView} from 'src/views/helpers'
import {checkResultsLength} from 'src/shared/utils/vis'
import {getTimeRangeVars} from 'src/variables/utils/getTimeRangeVars'

export const ResourceIDsContext = createContext<ResourceIDs>(null)

interface OwnProps {
  check: Check
  timeZone: TimeZone
}

type Props = OwnProps

const CheckHistoryVisualization: FC<Props> = ({check, timeZone}) => {
  const view = createView<CheckViewProperties>(get(check, 'threshold'))

  const [submitToken] = useState(0)
  const [manualRefresh] = useState(0)

  return (
    <TimeSeries
      submitToken={submitToken}
      queries={[check.query]}
      key={manualRefresh}
      variables={getTimeRangeVars({lower: 'now() - 5m'} as TimeRange)}
      check={check}
    >
      {({giraffeResult, loading, errorMessage, isInitialFetch, statuses}) => {
        return (
          <EmptyQueryView
            errorFormat={ErrorFormat.Tooltip}
            errorMessage={errorMessage}
            hasResults={checkResultsLength(giraffeResult)}
            loading={loading}
            isInitialFetch={isInitialFetch}
            queries={[check.query]}
            fallbackNote={null}
          >
            <CheckPlot
              checkType={check.type}
              thresholds={check.type === 'threshold' ? check.thresholds : []}
              table={get(giraffeResult, 'table')}
              fluxGroupKeyUnion={get(giraffeResult, 'fluxGroupKeyUnion')}
              loading={loading}
              timeZone={timeZone}
              viewProperties={view.properties}
              statuses={statuses}
            >
              {config => <Plot config={config} />}
            </CheckPlot>
          </EmptyQueryView>
        )
      }}
    </TimeSeries>
  )
}

export default CheckHistoryVisualization
