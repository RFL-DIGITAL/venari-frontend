import {
  differenceInDays,
  format,
  formatDistanceStrict,
  isBefore,
  subHours,
} from 'date-fns'
import { ru } from 'date-fns/locale'
import { getDeclensionText } from './get-declension-text'

export function getFormattedTime(date: string): string {
  const now = new Date()
  const twentyFourHoursAgo = subHours(now, 24)

  if (isBefore(date, twentyFourHoursAgo)) {
    return format(date, 'd MMMM yyyy, HH:mm', { locale: ru })
  } else {
    return `${formatDistanceStrict(date, now, { locale: ru, roundingMethod: 'floor' })} назад`
  }
}

export function getFormattedDate(date: string): string {
  const utcDate = new Date(date)
  const localDate = new Date(
    utcDate.getTime() - utcDate.getTimezoneOffset() * 60000,
  )

  const now = new Date()
  const twentyFourHoursAgo = subHours(now, 24)

  if (!isBefore(localDate, twentyFourHoursAgo))
    return `${formatDistanceStrict(localDate, now, { locale: ru, roundingMethod: 'floor' })}`
  else {
    const day = differenceInDays(now, localDate)

    return `${day} ${getDeclensionText(day, ['день', 'дня', 'дней'])}`
  }
}

export function getFormattedTimeForChat(date: string): string {
  const now = new Date()

  return `${formatDistanceStrict(date, now, { locale: ru, roundingMethod: 'floor' })} назад`
}
