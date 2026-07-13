import { useState } from 'react'

const OFFERINGS = [
  {
    tag: 'Youth',
    title: 'Technical Training',
    body: 'Small-sided, high-touch sessions that build first touch, close control, and confidence. Built for kids who want more reps than a full-field game ever gives them.',
  },
  {
    tag: 'Adults',
    title: 'Leagues',
    body: 'Organized 5v5 leagues under the lights. Register a squad or come solo and get placed. Standings, playoffs, and bragging rights on the line every week.',
  },
  {
    tag: 'Members',
    title: 'Pickup Membership',
    body: 'Gym-class energy for grown-ups. Drop into curated pickup sessions on your schedule. No roster to manage, no commitment. Just show up and play.',
  },
  {
    tag: 'Rentals',
    title: 'Book the Cage',
    body: 'Birthdays, corporate outings, tournaments, film shoots. Rent the venue by the hour and make it yours, floodlights included.',
  },
  {
    tag: 'Brands',
    title: 'Experiential Events',
    body: 'A ready-made urban arena for activations and experiential marketing. Bring your brand into the cage and put it in front of a crowd that came to play.',
  },
]

// To collect real signups, drop a form endpoint here (Formspree, Mailchimp,
// Buttondown, a Google Form, or your own API) via a Vite env var. Create a
// `.env` file with e.g. VITE_WAITLIST_ENDPOINT="https://formspree.io/f/xxxx".
// Until then, submissions are stored in the browser so the form still works.
const WAITLIST_ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT

function App() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const trimmed = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error')
      setMessage('That email looks off. Mind checking it?')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      if (WAITLIST_ENDPOINT) {
        const res = await fetch(WAITLIST_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ email: trimmed }),
        })
        if (!res.ok) throw new Error('Request failed')
      } else {
        // Fallback: no endpoint configured yet — persist locally so the
        // form is fully functional during the placeholder phase.
        const key = 'overplay_waitlist'
        const saved = JSON.parse(localStorage.getItem(key) || '[]')
        if (!saved.includes(trimmed)) saved.push(trimmed)
        localStorage.setItem(key, JSON.stringify(saved))
      }

      setStatus('success')
      setMessage("You're on the list. We'll holler before the lights come on.")
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Something jammed on our end. Try again in a sec.')
    }
  }

  return (
    <div className="page">
      <div className="stripes" aria-hidden="true" />
      <svg
        className="pitch"
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g className="pitch-line">
          {/* Boundary + halfway line */}
          <rect x="40" y="40" width="1320" height="820" />
          <line x1="700" y1="40" x2="700" y2="860" />
          {/* Center circle */}
          <circle cx="700" cy="450" r="120" />
          {/* Left penalty area, goal area, spot + arc */}
          <rect x="40" y="250" width="170" height="400" />
          <rect x="40" y="340" width="70" height="220" />
          <path d="M 210 339 A 120 120 0 0 1 210 561" />
          {/* Right penalty area, goal area, spot + arc */}
          <rect x="1190" y="250" width="170" height="400" />
          <rect x="1290" y="340" width="70" height="220" />
          <path d="M 1190 561 A 120 120 0 0 1 1190 339" />
          {/* Corner arcs */}
          <path d="M 40 62 A 22 22 0 0 0 62 40" />
          <path d="M 1338 40 A 22 22 0 0 0 1360 62" />
          <path d="M 62 860 A 22 22 0 0 0 40 838" />
          <path d="M 1360 838 A 22 22 0 0 0 1338 860" />
        </g>
        <g className="pitch-spot">
          <circle cx="700" cy="450" r="6" />
          <circle cx="165" cy="450" r="5" />
          <circle cx="1235" cy="450" r="5" />
        </g>
      </svg>

      <header className="topbar">
        <a className="brand" href="/">
          <span className="brand-mark" aria-hidden="true" />
          OVERPLAY SPORTS
        </a>
        <span className="topbar-tag">5V5 CAGE SOCCER</span>
      </header>

      <main className="hero">
        <p className="eyebrow">
          <span className="pulse" aria-hidden="true" />
          Coming soon
        </p>

        <h1 className="headline">
          THE CAGE
          <br />
          IS <span className="accent">COMING.</span>
        </h1>

        <p className="subhead">
          Five-a-side soccer under the floodlights. Youth technical training,
          adult leagues, pickup memberships, and a rentable urban arena built
          for events. Drop your email and be first through the gate.
        </p>

        <div className="capture-panel">
          <form className="capture" onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              className="capture-input"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              className="capture-btn"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Joining…' : 'Join the waitlist'}
            </button>
          </form>

          {message && (
            <p
              className={`form-msg ${status === 'error' ? 'is-error' : 'is-success'}`}
              role="status"
            >
              {message}
            </p>
          )}
        </div>
      </main>

      <section className="offerings" aria-label="What's coming">
        <h2 className="offerings-title">What's dropping</h2>
        <div className="grid">
          {OFFERINGS.map((o) => (
            <article className="card" key={o.title}>
              <span className="card-tag">{o.tag}</span>
              <h3 className="card-title">{o.title}</h3>
              <p className="card-body">{o.body}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">OVERPLAY SPORTS</div>
        <p className="footer-contact">
          Questions? <a href="mailto:info@overplaysports.com">info@overplaysports.com</a>
        </p>
        <p className="footer-note">
          © {new Date().getFullYear()} Overplay Sports LLC. Lacing up. Built for the cage.
        </p>
      </footer>
    </div>
  )
}

export default App
