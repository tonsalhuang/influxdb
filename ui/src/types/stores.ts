import {Links} from 'src/types/links'
import {Notification} from 'src/types'
import {TimeRange} from 'src/types/queries'
import {TimeMachinesState} from 'src/timeMachine/reducers'
import {AppState as AppPresentationState} from 'src/shared/reducers/app'
import {RouterState} from 'react-router-redux'
import {MeState} from 'src/shared/reducers/me'
import {NoteEditorState} from 'src/dashboards/reducers/notes'
import {DataLoadingState} from 'src/dataLoaders/reducers'
import {OnboardingState} from 'src/onboarding/reducers'
import {PredicatesState, VariableEditorState} from 'src/types'
import {LabelsState} from 'src/labels/reducers'
import {
  TelegrafEditorPluginState,
  PluginResourceState,
  TelegrafEditorActivePluginState,
  TelegrafEditorState,
} from 'src/dataLoaders/reducers/telegrafEditor'
import {TemplatesState} from 'src/templates/reducers'
import {RangeState} from 'src/dashboards/reducers/ranges'
import {UserSettingsState} from 'src/userSettings/reducers'
import {OverlayState} from 'src/overlays/reducers/overlays'
import {AutoRefreshState} from 'src/shared/reducers/autoRefresh'
import {LimitsState} from 'src/cloud/reducers/limits'
import {ChecksState} from 'src/alerting/reducers/checks'
import {NotificationRulesState} from 'src/alerting/reducers/notifications/rules'
import {NotificationEndpointsState} from 'src/alerting/reducers/notifications/endpoints'
import {AlertBuilderState} from 'src/alerting/reducers/alertBuilder'

import {ResourceState} from 'src/types'

export interface AppState {
  alertBuilder: AlertBuilderState
  app: AppPresentationState
  autoRefresh: AutoRefreshState
  checks: ChecksState
  cloud: {limits: LimitsState}
  dataLoading: DataLoadingState
  endpoints: NotificationEndpointsState
  labels: LabelsState
  links: Links
  me: MeState
  noteEditor: NoteEditorState
  notifications: Notification[]
  onboarding: OnboardingState
  overlays: OverlayState
  predicates: PredicatesState
  ranges: RangeState
  resources: ResourceState
  routing: RouterState
  rules: NotificationRulesState
  telegrafEditorPlugins: TelegrafEditorPluginState
  telegrafEditorActivePlugins: TelegrafEditorActivePluginState
  plugins: PluginResourceState
  telegrafEditor: TelegrafEditorState
  templates: TemplatesState
  timeMachines: TimeMachinesState
  timeRange: TimeRange
  userSettings: UserSettingsState
  variableEditor: VariableEditorState
  VERSION: string
}

export type GetState = () => AppState
