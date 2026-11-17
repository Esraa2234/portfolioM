


import { createContext, useContext, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { translations, supportedLangs, defaultLang } from './translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const { lang: rawLang } = useParams()
  const lang = supportedLangs.includes(rawLang) ? rawLang : defaultLang
  const dict = translations[lang]

  const value = useMemo(() => {
    function t(path) {
      let node = dict
      for (const part of path.split('.')) node = node?.[part]
      return node ?? path
    }

    function tx(obj) {
      if (obj == null) return ''
      if (typeof obj === 'string' || typeof obj === 'number') return obj
      return obj[lang] ?? obj.en ?? obj.ar ?? ''
    }

    function num(n) {
      return String(n)
    }

    function to(path = '') {
      return `/${lang}/${path ? `${path}/` : ''}`
    }

    return { lang, dir: dict.dir, t, tx, num, to }
  }, [lang, dict])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
