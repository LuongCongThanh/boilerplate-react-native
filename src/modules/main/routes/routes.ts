export enum MainRoutes {
  Home = 'Home',
  LocationSearching = 'LocationSearching',
  Calendar = 'Calendar'
}

export type MainStackParamList = {
  [MainRoutes.Home]: undefined
  [MainRoutes.LocationSearching]: undefined
  [MainRoutes.Calendar]: undefined
}
