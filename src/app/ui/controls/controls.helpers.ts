import { DateTime } from "luxon";

/**
 * Костыль, т.к. не было времени заниматься прокидыванием локалей для чартов
 */

export const formatTime = (date: Date): string => DateTime.fromJSDate(date).toFormat('MM-dd-yyyy')