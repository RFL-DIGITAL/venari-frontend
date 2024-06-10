import { format, formatDistanceStrict, isBefore, subHours } from 'date-fns'
import { ru } from 'date-fns/locale'

export function getFormattedTime(date: string): string {
  const now = new Date()
  const twentyFourHoursAgo = subHours(now, 24)

  if (isBefore(date, twentyFourHoursAgo)) {
    return format(date, 'd MMMM yyyy, HH:mm', { locale: ru })
  } else {
    return `${formatDistanceStrict(date, now, { locale: ru, roundingMethod: 'floor' })} назад`
  }
}
