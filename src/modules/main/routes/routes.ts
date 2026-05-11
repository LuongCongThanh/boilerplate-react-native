export enum MainRoutes {
  Home = 'Home',
  LocationSearching = 'LocationSearching',
  Calendar = 'Calendar'
}

export type MainStackParamList = {
  [MainRoutes.Home]: any
  [MainRoutes.LocationSearching]: any
  [MainRoutes.Calendar]: any
}
