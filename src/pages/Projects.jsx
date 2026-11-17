
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { projects, categories } from '../data/projects'
import PageHeader from '../components/PageHeader'
import ProjectCard from '../components/ProjectCard'
import CtaBlock from '../components/CtaBlock'

const useIsoLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

export default function Projects() {
  const { t, num } = useLanguage()
  const [params, setParams] = useSearchParams()

  // حساب عدد المشاريع في كل تصنيف
  const count = (key) =>
    key === 'all'
      ? projects.length
      : projects.filter((p) => p.category === key).length

  // إظهار التصنيفات التي تحتوي على مشاريع فقط
  const visibleCategories = categories.filter(
    (key) => key === 'all' || count(key) > 0
  )

  const requestedType = params.get('type')

  const active = visibleCategories.includes(requestedType)
    ? requestedType
    : 'all'

  const shown =
    active === 'all'
      ? projects
      : projects.filter((p) => p.category === active)

  const tabsRef = useRef(null)
  const [pill, setPill] = useState(null)

  // تحريك الخلفية أسفل التصنيف المحدد
  useIsoLayoutEffect(() => {
    function place() {
      const btn = tabsRef.current?.querySelector('.is-active')

      if (!btn) return

      setPill({
        left: btn.offsetLeft,
        width: btn.offsetWidth,
        top: btn.offsetTop,
        height: btn.offsetHeight,
      })
    }

    place()

    window.addEventListener('resize', place)
    document.fonts?.ready.then(place)

    return () => window.removeEventListener('resize', place)
  }, [active, t])

  function select(key) {
    const next = new URLSearchParams(params)

    if (key === 'all') {
      next.delete('type')
    } else {
      next.set('type', key)
    }

    setParams(next, {
      replace: true,
      preventScrollReset: true,
    })
  }

  return (
    <>
      <PageHeader
        eyebrow={t('projects.eyebrow')}
        title={t('projects.title')}
        lead={t('projects.subtitle')}
      />

      <section className="container works">
        <div
          className="filters fade-in"
          style={{ animationDelay: '450ms' }}
          role="tablist"
          ref={tabsRef}
        >
          {pill && (
            <span
              className="filters-pill"
              style={{
                left: pill.left,
                width: pill.width,
                top: pill.top,
                height: pill.height,
              }}
              aria-hidden="true"
            />
          )}

          {visibleCategories.map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active === key}
              className={active === key ? 'is-active' : ''}
              onClick={() => select(key)}
            >
              {t(`projects.categories.${key}`)}
              <sup>{num(count(key))}</sup>
            </button>
          ))}
        </div>

        <div className="pgrid" key={active}>
          {shown.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              index={i}
            />
          ))}
        </div>
      </section>

      <CtaBlock />
    </>
  )
}
