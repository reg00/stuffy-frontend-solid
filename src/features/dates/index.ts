import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ru"
import dayjs from "dayjs";

dayjs.extend(utc)
dayjs.extend(relativeTime)
dayjs.locale('ru')

export function formatEventDate(date: string): string {
    return dayjs.utc(date).fromNow()
}

export function formatDate(date: string): string {
    return dayjs.utc(date).format('LL')
}