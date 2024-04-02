import { ApexChart, ApexStroke, ApexDataLabels, ApexXAxis, ApexAxisChartSeries, ApexTitleSubtitle } from "ng-apexcharts";
import { Rate, Fuel } from "../../interfaces";

const CoalRateToCarbonDioxide = (rate: Rate) => rate.coal ? rate.coal * 0.768 * 2.76 : 0
const GasRateToCarbonDioxide = (rate: Rate) => rate.gas ? rate.gas * 1.129 * 1.59 : 0
const TotalRateToCarbonDioxide = (rate: Rate) => CoalRateToCarbonDioxide(rate) + GasRateToCarbonDioxide(rate)

type Calculator = {
    [key in Fuel]: (rate: Rate) => number;
};

type SeriesMap = {
    [key in Fuel]: string;
}

export type ChartOptions = {
    chart: ApexChart;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
    dataLabels: ApexDataLabels;
    xaxis: ApexXAxis;
    series: ApexAxisChartSeries;
  };

export const CHART_OPTIONS: ChartOptions = {
    chart: {
      type: "area"
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth"
    },
    title: {
        text: " Выбросы углекислого газа в тоннах",
        align: "left"
      },
    xaxis: {
        type: 'datetime',
        categories: [],
        labels: {
          datetimeUTC: false,
        },
        tooltip: {
            enabled: false
        }
    },
    series: []
  };

export const SERIES_NAME_MAP: SeriesMap = {
    'coal': 'уголь',
    'gas': 'газ',
    'total': 'всего'
  }

export const CarbonDioxideCalculator: Calculator = {
    coal: CoalRateToCarbonDioxide,
    gas: GasRateToCarbonDioxide,
    total: TotalRateToCarbonDioxide
}


  