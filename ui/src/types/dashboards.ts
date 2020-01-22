import {
  Cell as GenCell,
  Dashboard as GenDashboard,
  TableViewProperties,
  DashboardQuery,
  RenamableField,
  BuilderConfig,
} from 'src/client'
import {Label, RemoteDataState} from 'src/types'

export type FieldOption = RenamableField

export interface SortOptions {
  field: string
  direction: string
}

export interface DashboardDraftQuery extends DashboardQuery {
  hidden: boolean
}

export type BuilderConfigAggregateWindow = BuilderConfig['aggregateWindow']

export interface Cell extends GenCell {
  dashboardID: string
  status: RemoteDataState
}

export type NewCell = Omit<Cell, 'id' | 'links' | 'dashboardID'>

export interface Dashboard extends Omit<GenDashboard, 'cells'> {
  cells: string[]
  labels: Label[]
  status: RemoteDataState
}

export type Omit<K, V> = Pick<K, Exclude<keyof K, V>>

export interface DashboardSwitcherLink {
  key: string
  text: string
  to: string
}

export interface DashboardSwitcherLinks {
  active?: DashboardSwitcherLink
  links: DashboardSwitcherLink[]
}

export enum NoteEditorMode {
  Adding = 'adding',
  Editing = 'editing',
}

export type TableOptions = TableViewProperties['tableOptions']

export {
  DashboardQuery,
  BuilderAggregateFunctionType,
  BuilderTagsType,
  BuilderConfig,
  ViewProperties,
  QueryEditMode,
  XYViewProperties,
  LinePlusSingleStatProperties,
  ScatterViewProperties,
  HeatmapViewProperties,
  SingleStatViewProperties,
  HistogramViewProperties,
  GaugeViewProperties,
  TableViewProperties,
  MarkdownViewProperties,
  CheckViewProperties,
  RenamableField,
  Legend,
  DecimalPlaces,
  Axes,
  Axis,
  AxisScale,
  XYGeom,
  CreateDashboardRequest,
  Threshold,
} from 'src/client'
