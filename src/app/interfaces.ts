export type Fuel = 'coal' | 'gas' | 'total'

export type Rate = {
    [key in Fuel]?: number;
} & {
    total: number;
};

export type RateCalendar = Map<string, Rate>

export interface Series {
    name: string;
    data: number[];
}