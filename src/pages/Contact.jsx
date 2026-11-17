



///////////////////////////////////////////////////////////////////////////////////

import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { profile } from '../data/profile'
import { getProject, projectCopy } from '../data/projects'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import Magnetic from '../components/Magnetic'
import LocalTime from '../components/LocalTime'
import Icon from '../components/Icon'

// ضعي هنا رابط Formspree بعد إنشاء النموذج
const FORM_ENDPOINT = 'https://formspree.io/f/xljbjeaq'

const quote = {
  ar: ['«', '»'],
  en: ['“', '”'],
}

export default function Contact() {
  const { lang, t, tx } = useLanguage()
  const C = t('contact')

  const [params] = useSearchParams()
  const ref = getProject(params.get('project') || '')
  const refTitle = ref ? projectCopy(ref, lang).title : ''

  const [form, setForm] = useState(() => ({
    name: '',
    email: '',
    type: ref ? C.types[0] : '',
    message: ref
      ? `${C.similarTo} ${quote[lang]?.[0] || ''}${refTitle}${quote[lang]?.[1] || ''}\n\n`
      : '',
  }))

  const [copied, setCopied] = useState(null)
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState('')

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  async function copy(key, text) {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)

      setTimeout(() => {
        setCopied((c) => (c === key ? null : c))
      }, 1600)
    } catch {
      // Clipboard unavailable
    }
  }

  async function submit(e) {
    e.preventDefault()

    setSending(true)
    setStatus('')

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Message sending failed')
      }

      setStatus('success')

      setForm({
        name: '',
        email: '',
        type: '',
        message: '',
      })
    } catch (error) {
      setStatus('error')
    } finally {
      setSending(false)
    }
  }

  const statusMessages = {
    success: {
      ar: 'تم إرسال رسالتك بنجاح! شكرًا لتواصلك معنا.',
      en: 'Your message has been sent successfully. Thank you!',
    },
    error: {
      ar: 'حصلت مشكلة أثناء إرسال الرسالة. حاول مرة تانية.',
      en: 'Something went wrong. Please try again.',
    },
  }

  return (
    <>
      <PageHeader
        eyebrow={C.eyebrow}
        title={C.title}
        lead={C.subtitle}
      />

      <section className="container contact">
        <Reveal className="contact-form-wrap" data-spot>
          <form className="contact-form" onSubmit={submit}>
            <h2>{C.formTitle}</h2>

            <div className="field-row">
              <label className="field">
                <input
                  name="name"
                  value={form.name}
                  onChange={set('name')}
                  placeholder=" "
                  autoComplete="name"
                  required
                />
                <span>{C.name}</span>
              </label>

              <label className="field">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder=" "
                  autoComplete="email"
                  dir="ltr"
                  required
                />
                <span>{C.email}</span>
              </label>
            </div>

            <fieldset className="topics">
              <legend>{C.type}</legend>

              {C.types.map((type) => (
                <label
                  key={type}
                  className={form.type === type ? 'is-active' : ''}
                >
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    checked={form.type === type}
                    onChange={set('type')}
                  />
                  {type}
                </label>
              ))}
            </fieldset>

            <label className="field">
              <textarea
                rows={6}
                name="message"
                value={form.message}
                onChange={set('message')}
                placeholder=" "
                required
              />
              <span>{C.message}</span>
            </label>

            <div className="contact-send">
              <Magnetic>
                <button
                  type="submit"
                  className="btn btn-accent btn-lg"
                  disabled={sending}
                >
                  {sending
                    ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...')
                    : C.send}

                  <Icon
                    name="send"
                    size={18}
                    className="flip-rtl"
                  />
                </button>
              </Magnetic>

              <p>{C.sendNote}</p>
            </div>

            {status && (
              <p
                role="status"
                aria-live="polite"
                className={`form-status ${status}`}
              >
                {statusMessages[status][lang] ||
                  statusMessages[status].en}
              </p>
            )}
          </form>
        </Reveal>

        <aside className="contact-side">
          <Reveal className="contact-card" delay={100} data-spot>
            <p className="contact-label">{C.direct}</p>

            <ContactLine
              icon="mail"
              label={C.emailLabel}
              value={profile.email}
              href={`mailto:${profile.email}`}
              onCopy={() => copy('email', profile.email)}
              copied={copied === 'email'}
              C={C}
            />

            <ContactLine
              icon="phone"
              label={C.phoneLabel}
              value={profile.phoneDisplay}
              href={`tel:${profile.phone}`}
              onCopy={() => copy('phone', profile.phone)}
              copied={copied === 'phone'}
              C={C}
            />

            <div className="contact-line">
              <span className="contact-ico">
                <Icon name="pin" size={18} />
              </span>

              <div>
                <span className="contact-k">{C.location}</span>
                <span className="contact-v">
                  {tx(profile.location)} · <LocalTime />
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal className="contact-card" delay={200} data-spot>
            <p className="contact-label">{C.social}</p>

            <div className="socials">
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="linkedin" size={18} />
                LinkedIn
              </a>

              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="github" size={18} />
                GitHub
              </a>

              <a
                href={`https://wa.me/${profile.links.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                <Icon name="whatsapp" size={20} />
                WhatsApp
              </a>
            </div>
          </Reveal>
        </aside>
      </section>
    </>
  )
}

function ContactLine({
  icon,
  label,
  value,
  href,
  onCopy,
  copied,
  C,
}) {
  return (
    <div className="contact-line">
      <span className="contact-ico">
        <Icon name={icon} size={18} />
      </span>

      <div>
        <span className="contact-k">{label}</span>
        <a className="contact-v" href={href} dir="ltr">
          {value}
        </a>
      </div>

      <button
        type="button"
        className={`copy-btn${copied ? ' is-done' : ''}`}
        onClick={onCopy}
        title={copied ? C.copied : C.copy}
        aria-label={copied ? C.copied : C.copy}
      >
        <Icon name={copied ? 'check' : 'copy'} size={16} />
        <span className="copy-tip" aria-hidden="true">
          {C.copied}
        </span>
      </button>
    </div>
  )
}
 
