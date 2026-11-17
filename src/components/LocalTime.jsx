
import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

// Live Egypt clock.
export default function LocalTime({ className = '' }) {
  const { lang } = useLanguage()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    // Update the clock every 15 seconds.
    const id = setInterval(() => {
      setNow(new Date())
    }, 1000 * 15)

    // Clear the interval when the component is removed.
    return () => clearInterval(id)
  }, [])

  // Choose the time format based on the current language.
  const locale = lang === 'ar' ? 'ar-EG' : 'en-GB'

  // Get the current time in Egypt.
  const formatter = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Africa/Cairo',
  })

  const time = formatter.format(now)

  // Get Egypt's current GMT offset automatically.
  const offset = new Intl.DateTimeFormat('en', {
    timeZone: 'Africa/Cairo',
    timeZoneName: 'shortOffset',
  })
    .formatToParts(now)
    .find((part) => part.type === 'timeZoneName')?.value || 'GMT+2'

  return (
    <span className={`local-time ${className}`}>
      <span className="pulse-dot" aria-hidden="true" />

      <span dir="ltr">{time}</span>

      <span className="local-time-zone">
        {offset}
      </span>
    </span>
  )
}
