import { useEffect, useState } from 'react'

export function useStoredState<T>(
  key: string,
  fallback: T,
  validate: (value: unknown) => value is T,
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw !== null) {
        const parsed: unknown = JSON.parse(raw)
        if (validate(parsed)) return parsed
      }
    } catch {
      /* Unavailable storage keeps preferences in this browser session. */
    }
    return fallback
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* Browsing remains available when storage is blocked or full. */
    }
  }, [key, value])
  return [value, setValue] as const
}
