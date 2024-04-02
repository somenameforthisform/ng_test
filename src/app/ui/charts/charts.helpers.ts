import { Observable, map, startWith } from "rxjs";
import { merge } from 'lodash';
import { CHART_OPTIONS, CarbonDioxideCalculator, ChartOptions, SERIES_NAME_MAP } from "./charts.const";
import { RateCalendar, Fuel } from "../../interfaces";

const transform = (calendar: RateCalendar): ChartOptions => {

    const seriesData: { [K: string]: number[] } = {};

    const categories: string[] = [];

    calendar.forEach((rate, date) => {

        categories.push(date)

        Object.entries(rate).forEach((entrie) => {
            const [fuelType] = entrie as [Fuel, number]
            const seriesName = SERIES_NAME_MAP[fuelType];
            const calulatedRate = CarbonDioxideCalculator[fuelType](rate)
            if (seriesData[seriesName]) {
                seriesData[seriesName].push(calulatedRate)
            } else {
                seriesData[seriesName] = [calulatedRate]
            }
        })
    })

    const series = Object.entries(seriesData).map(([name, data]) => ({ name, data }))

    return merge({ xaxis: { categories }, series }, CHART_OPTIONS)
}

export const CalendarRatesToChartsData = (source: Observable<RateCalendar>) =>
    source.pipe(
        map((calendar) => transform(calendar)),
        startWith(CHART_OPTIONS),
    ) 
