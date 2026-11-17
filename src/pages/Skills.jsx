
import { useLanguage } from '../i18n/LanguageContext'
import { skillGroups } from '../data/resume'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import CtaBlock from '../components/CtaBlock'
import Icon from '../components/Icon'

const groupIcon = {
  backend: 'server',
  database: 'database',
  frontend: 'browser',
  devops: 'layers',
  bi: 'chart',
  other: 'spark'
}

export default function Skills() {
  const { t } = useLanguage()

  return (
    <>
      <PageHeader
        eyebrow={t('skills.eyebrow')}
        title={t('skills.title')}
        lead={t('skills.subtitle')}
      >
        <div className="legend fade-in" style={{ animationDelay: '500ms' }}>
          {[3, 2, 1].map((lv) => (
            <span key={lv}>
              <Dots level={lv} /> {t(`skills.levels.${lv}`)}
            </span>
          ))}
        </div>
      </PageHeader>

      <section className="container skills">
        {skillGroups.map((g, i) => (
          <Reveal
            key={g.key}
            className="skill-card"
            delay={(i % 3) * 90}
            data-spot
          >
            <div className="skill-head">
              <span className="bento-icon">
                <Icon name={groupIcon[g.key]} size={22} />
              </span>

              <h2>{t(`skills.groups.${g.key}`)}</h2>
            </div>

            <ul>
              {g.items.map((s) => (
                <li key={s.name}>
                  <span dir="ltr">{s.name}</span>

                  <span className="skill-level">
                    <span className="skill-level-text">
                      {t(`skills.levels.${s.level}`)}
                    </span>

                    <Dots level={s.level} />
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </section>

      <CtaBlock />
    </>
  )
}

function Dots({ level }) {
  return (
    <span className="dots" aria-hidden="true">
      {[1, 2, 3].map((d) => (
        <span key={d} className={d <= level ? 'is-on' : ''} />
      ))}
    </span>
  )
}
