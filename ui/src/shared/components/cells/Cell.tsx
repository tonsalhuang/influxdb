// Libraries
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {get} from 'lodash'

// Components
import CellHeader from 'src/shared/components/cells/CellHeader'
import CellContext from 'src/shared/components/cells/CellContext'
import ViewComponent from 'src/shared/components/cells/View'
import {ErrorHandling} from 'src/shared/decorators/errors'
import {SpinnerContainer, RemoteDataState} from '@influxdata/clockface'
import EmptyGraphMessage from 'src/shared/components/EmptyGraphMessage'

// Utils
import {getByID} from 'src/resources/selectors'

// Types
import {AppState, View, Cell, TimeRange, ResourceType} from 'src/types'

interface StateProps {
  view: View
}

interface OwnProps {
  cell: Cell
  timeRange: TimeRange
  manualRefresh: number
}

interface State {
  inView: boolean
}

type Props = StateProps & OwnProps

@ErrorHandling
class CellComponent extends Component<Props, State> {
  public render() {
    const {cell, view} = this.props

    return (
      <>
        <CellHeader name={this.viewName} note={this.viewNote}>
          {view && (
            <CellContext
              cell={cell}
              view={view}
              onCSVDownload={this.handleCSVDownload}
            />
          )}
        </CellHeader>
        <div className="cell--view" data-testid="cell--view-empty">
          {this.view}
        </div>
      </>
    )
  }

  private get viewName(): string {
    const {view} = this.props

    if (view && view.properties.type !== 'markdown') {
      return view.name
    }

    return 'Note'
  }

  private get viewNote(): string {
    const {view} = this.props

    if (!view) {
      return ''
    }

    const isMarkdownView = view.properties.type === 'markdown'
    const showNoteWhenEmpty = get(view, 'properties.showNoteWhenEmpty')

    if (isMarkdownView || showNoteWhenEmpty) {
      return ''
    }

    return get(view, 'properties.note', '')
  }

  private get view(): JSX.Element {
    const {timeRange, manualRefresh, view} = this.props

    return (
      <SpinnerContainer
        loading={view.status || RemoteDataState.Loading}
        spinnerComponent={<EmptyGraphMessage message="Loading..." />}
      >
        <ViewComponent
          view={view}
          timeRange={timeRange}
          manualRefresh={manualRefresh}
        />
      </SpinnerContainer>
    )
  }

  private handleCSVDownload = (): void => {
    throw new Error('csv download not implemented')
  }
}

const mstp = (state: AppState, ownProps: OwnProps): StateProps => {
  return {view: getByID<View>(state, ResourceType.Views, ownProps.cell.id)}
}

export default connect<StateProps, {}, OwnProps>(
  mstp,
  null
)(CellComponent)
