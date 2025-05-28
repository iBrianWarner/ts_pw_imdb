import { ChartType } from '@/common/typedefs/charts.typedefs';

const CHART_ROUTES = {
  [ChartType.Top250Movies]: 'chart/top/?ref_=nv_mv_250',
  [ChartType.Top250TVShows]: 'chart/toptv/?ref_=nv_tvv_250',
} as const;

export const ROUTES = {
  home: '/',
  searchResultsPage: (filmName: string): string =>
    `/find/?q=${filmName}&ref_=nv_sr_sm`,
  film: (filmUUID: string): string => `title/${filmUUID}`,
  charts: (chartType: ChartType): string => CHART_ROUTES[chartType],
};
