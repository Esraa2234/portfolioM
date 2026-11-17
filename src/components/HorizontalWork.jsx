




import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import Icon from './Icon'

// Featured projects section
export default function HorizontalWork({ projects = [], header }) {
  const { lang, t, to, num, dir } = useLanguage()

  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const barRef = useRef(null)

  const [pinned, setPinned] = useState(false)

  // Show featured projects only
  const featuredProjects = projects.filter(
    (project) => project?.featured
  )

  useEffect(() => {
    const mq = window.matchMedia(
      '(min-width: 961px) and (prefers-reduced-motion: no-preference)'
    )

    const apply = () => setPinned(mq.matches)

    apply()
    mq.addEventListener('change', apply)

    return () => mq.removeEventListener('change', apply)
  }, [])

  // Horizontal scrolling animation
  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current

    if (!section || !track) return

    if (!pinned) {
      section.style.height = ''
      track.style.transform = ''
      return
    }

    let distance = 0
    let raf = 0

    function measure() {
      distance = Math.max(
        0,
        track.scrollWidth - window.innerWidth
      )

      section.style.height = `${window.innerHeight + distance}px`

      update()
    }

    function update() {
      raf = 0

      const top = section.getBoundingClientRect().top

      const progress = distance
        ? Math.min(1, Math.max(0, -top / distance))
        : 0

      const x =
        (dir === 'rtl' ? 1 : -1) * progress * distance

      track.style.transform = `translate3d(${x}px, 0, 0)`

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`
      }
    }

    function onScroll() {
      if (!raf) {
        raf = requestAnimationFrame(update)
      }
    }

    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(track)

    window.addEventListener('resize', measure)
    window.addEventListener('scroll', onScroll, {
      passive: true,
    })

    return () => {
      ro.disconnect()

      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', onScroll)

      cancelAnimationFrame(raf)
    }
  }, [pinned, dir, featuredProjects.length])

  return (
    <section
      ref={sectionRef}
      className={`hwork${pinned ? ' is-pinned' : ''}`}
    >
      <div className="hwork-sticky">

        <div className="container hwork-head">
          {header}
        </div>

        <div ref={trackRef} className="hwork-track">

          {featuredProjects.map((p, i) => {
            const title = p.name || ''

            const description =
              typeof p.description === 'string'
                ? p.description
                : p.description?.[lang] ||
                  p.description?.en ||
                  ''

            const Card = p.live ? 'a' : 'article'

            return (
              <Card
                key={p.slug}
                {...(
                  p.live
                    ? {
                        href: p.live,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      }
                    : {}
                )}
                className="hcard"
                data-cursor={p.live ? t('projects.cursor') : undefined}
                style={{ '--i': i }}
              >

                <div className="hcard-media">
                  <img
                    src={p.cover}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    width="1440"
                    height="900"
                  />
                </div>

                <div className="hcard-meta">

                  <span className="hcard-num">
                    {num(String(i + 1).padStart(2, '0'))}
                  </span>

                  <span className="hcard-cat">
                    {t(`projects.categories.${p.category}`)}
                  </span>

                </div>

                <h3 className="hcard-title">
                  {title}
                </h3>

                {description && (
                  <p className="hcard-description">
                    {description}
                  </p>
                )}

                <div className="hcard-tech" dir="ltr">
                  {(p.tech || []).slice(0, 4).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

              </Card>
            )
          })}

          <a
            href={to('projects')}
            className="hcard hcard-all"
            data-cursor="→"
          >
            <span className="hcard-all-circle">
              <Icon
                name="arrow"
                size={34}
                className="flip-rtl"
              />
            </span>

            <span className="hcard-all-label">
              {t('work.all')}
            </span>
          </a>

        </div>

        {pinned && (
          <div
            className="container hwork-progress"
            aria-hidden="true"
          >
            <span ref={barRef} />
          </div>
        )}

      </div>
    </section>
  )
}
