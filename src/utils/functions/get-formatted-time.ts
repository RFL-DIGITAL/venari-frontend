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

export function formatDate(date: string, _format = 'dd.MM.yyyy') {
  return format(date, _format)
}



export function getLocalDateDateFns(dateString: string) {
  const utcDate = new Date(dateString);
  const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
  
  return localDate
}

export function getLocalDate(dateString: string) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const options = { timeZone: userTimeZone }
  const date = new Date(dateString)
  const formatDate = date.toLocaleString('ru-RU', options)

  return {
    fullDate: date.toLocaleDateString('ru-RU', options),
    date: formatDate.split(', ')[0],
    time: formatDate.split(', ')[1],
    minutes: formatDate.split(', ')[1].slice(0,5),
    houres:formatDate.split(', ')[1].slice(0,3),
  }
}

export function getFormattedDate(date: string): string {
  const localDate = getLocalDateDateFns(date)

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
