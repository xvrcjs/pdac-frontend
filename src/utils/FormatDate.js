import { numberToString, dateToString, timeToString } from '@danielcbezerra/utils'
import moment from 'moment-timezone'

moment.locale(Intl.DateTimeFormat().resolvedOptions().locale)


// Numbers
export const renderInt = numberToString

export const renderFloat = (value) => numberToString(value, true)

// Dates
export const renderDate = dateToString

export const renderTime = timeToString

export const renderDatetime = (value, options) => {
  const { short = false, showDate = true, showTime = true, timezone = null } = options || {}
  const date = !value ? "" : timezone ? moment.tz(value, timezone) : moment(value)
  const timezoneAbbr = !(date && timezone && date.utcOffset() !== moment().utcOffset()) ? "" :
    isNaN(date.zoneAbbr()) ? " z" : ` [GMT${date.utcOffset() >= 0 ? "+" : ""}${(date.utcOffset() / 60).toFixed(2)}]`
  return !date ? "" :
    date.format(
      (showDate ? short ? "ll" : "LL" : "")
      + (showDate && showTime ? " @ " : "")
      + (showTime ? "LT" + timezoneAbbr : "")
    )
}