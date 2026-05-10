import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/')({
  component: Portfolio,
})

// Intersection Observer hook
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// Animated counter
function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          let start = 0
          const duration = 2000
          const step = (end / duration) * 16
          const timer = setInterval(() => {
            start += step
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end])

  return (
    <span ref={ref} className="stat-number">
      {count}{suffix}
    </span>
  )
}

// Mobile nav state
function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#skills', label: 'Skills' },
    { href: '#work', label: 'Work' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav
      aria-label="Main navigation"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
        background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(224,0,0,0.15)' : 'none',
        transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        padding: '0 24px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', background: 'var(--red)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '16px', color: 'white', fontFamily: 'Inter' }}>PS</div>
            <span style={{ color: 'white', fontWeight: 700, fontSize: '16px', letterSpacing: '0.05em' }}>Pujan Shah</span>
          </div>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="hidden-mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
          <a href="https://wa.me/918866016120" target="_blank" rel="noopener noreferrer" className="btn-red" style={{ padding: '10px 22px', fontSize: '12px' }}>
            Connect
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: 'white' }}
          className="mobile-menu-btn"
          aria-label="Menu"
        >
          <div style={{ width: '24px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <span style={{ height: '2px', background: open ? 'var(--red)' : 'white', transition: 'all 0.3s', transform: open ? 'rotate(45deg) translate(5px,5px)' : 'none', display: 'block' }} />
            <span style={{ height: '2px', background: 'white', opacity: open ? 0 : 1, transition: 'all 0.3s', display: 'block' }} />
            <span style={{ height: '2px', background: open ? 'var(--red)' : 'white', transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translate(5px,-5px)' : 'none', display: 'block' }} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: 'rgba(10,10,10,0.98)', borderTop: '1px solid rgba(224,0,0,0.2)', padding: '20px 24px' }} className="mobile-menu">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ display: 'block', padding: '14px 0', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '15px', fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {l.label}
            </a>
          ))}
          <a href="https://wa.me/918866016120" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', marginTop: '16px' }} className="btn-red">Connect</a>
        </div>
      )}

    </nav>
  )
}

export default function Portfolio() {
  useReveal()

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh', color: 'white' }}>
      <a href="#main-content" className="skip-nav">Skip to main content</a>
      <div className="noise-overlay" aria-hidden="true" />
      <Nav />
      <main id="main-content">

        {/* ═══════════════ HERO ═══════════════ */}
        <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: '72px' }}>
          {/* Background */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(224,0,0,0.08) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', top: '10%', right: '5%', width: '600px', height: '600px', borderRadius: '50%', border: '1px solid rgba(224,0,0,0.08)', pointerEvents: 'none' }} className="animate-spin-slow" />
          <div style={{ position: 'absolute', top: '20%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(224,0,0,0.06)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px', width: '100%' }} className="hero-grid">
            {/* Text */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }} className="animate-fade-up">
                <div className="red-dot" />
                <span style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Available for Opportunities</span>
              </div>

              <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '8px' }} className="animate-fade-up delay-100">
                Pujan
              </h1>
              <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '24px' }} className="text-gradient animate-fade-up delay-200">
                Shah
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }} className="animate-fade-up delay-300">
                <div style={{ height: '2px', width: '40px', background: 'var(--red)' }} />
                <p style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                  Marketing & Advertising Professional
                </p>
              </div>

              <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'rgba(255,255,255,0.7)', marginBottom: '40px', maxWidth: '500px' }} className="animate-fade-up delay-400">
                Creative marketer with 1 year of experience in social media, content strategy, brand management, and campaign execution. Experienced in handling leading brands and building engaging digital content.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '48px' }} className="animate-fade-up delay-500">
                <a href="#work" className="btn-red">
                  View My Work
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>
                <a href="#contact" className="btn-outline">
                  Connect With Me
                </a>
              </div>

              {/* Mini stats */}
              <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }} className="animate-fade-up delay-600">
                {[
                  { n: '3', s: '+', label: 'Brands Handled' },
                  { n: '250', s: '+', label: 'Peak Engagement' },
                  { n: '12', s: 'K', label: 'Max Views' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--red)', lineHeight: 1 }}>{stat.n}{stat.s}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px', letterSpacing: '0.05em' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }} className="animate-fade-in delay-400 hero-photo">
              <div style={{ position: 'absolute', inset: '-20px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(224,0,0,0.15), transparent)', zIndex: 0 }} className="animate-float" />
              <div style={{ position: 'relative', zIndex: 1, borderRadius: '8px', overflow: 'hidden', width: '100%', maxWidth: '420px', aspectRatio: '4/5' }} className="red-glow">
                <img src="/pujan-profile.webp" alt="Pujan Shah" width="420" height="525" fetchPriority="high" loading="eager" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 60%)' }} />
                {/* Badge */}
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(224,0,0,0.9)', backdropFilter: 'blur(8px)', padding: '10px 16px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>BAMMC Graduate</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'white' }}>Mumbai University</div>
                </div>
              </div>
              {/* Decorative corner */}
              <div style={{ position: 'absolute', top: '-12px', right: '-12px', width: '80px', height: '80px', border: '2px solid rgba(224,0,0,0.3)', borderRadius: '4px', zIndex: 0 }} />
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Scroll</span>
            <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--red), transparent)' }} />
          </div>

        </section>

        {/* ═══════════════ ABOUT ═══════════════ */}
        <section id="about" style={{ padding: '100px 24px', background: 'var(--black-soft)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(224,0,0,0.4), transparent)' }} />
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="about-grid">
              {/* Image */}
              <div className="reveal-left" style={{ position: 'relative' }}>
                <div style={{ borderRadius: '8px', overflow: 'hidden', aspectRatio: '1/1', maxWidth: '480px' }} className="img-overlay">
                  <img src="/pujan-profile.webp" alt="Pujan Shah" width="480" height="480" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                </div>
                {/* Quote card */}
                <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', background: 'var(--black-card)', border: '1px solid rgba(224,0,0,0.2)', borderRadius: '8px', padding: '20px 24px', maxWidth: '220px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                  <div style={{ fontSize: '32px', color: 'var(--red)', fontWeight: 900, lineHeight: 1 }}>"</div>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>Marketing is storytelling. I make brands speak.</p>
                </div>
              </div>

              {/* Text */}
              <div className="reveal">
                <div className="section-label">About Me</div>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px' }}>
                  Creative Marketer.<br />
                  <span className="text-gradient">Strategic Thinker.</span>
                </h2>
                <p style={{ fontSize: '16px', lineHeight: 1.85, color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>
                  I am Pujan Shah, a BAMMC graduate from Mumbai University with 1 year of hands-on experience in marketing, advertising, and social media management. I have worked across brand pages, content calendars, influencer collaborations, campaign support, and performance tracking.
                </p>
                <p style={{ fontSize: '16px', lineHeight: 1.85, color: 'rgba(255,255,255,0.7)', marginBottom: '32px' }}>
                  I enjoy creating content that connects with audiences and drives engagement. My approach blends creativity with data — crafting stories that are both beautiful and measurable.
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px' }}>
                  {['Social Media', 'Brand Marketing', 'Content Strategy', 'Campaign Execution', 'Copywriting', 'Analytics'].map((tag) => (
                    <span key={tag} style={{ padding: '6px 14px', borderRadius: '3px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', background: 'rgba(224,0,0,0.1)', border: '1px solid rgba(224,0,0,0.2)', color: 'rgba(255,255,255,0.85)' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Socials */}
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <a href="https://www.linkedin.com/in/pujanshahh/" target="_blank" rel="noopener noreferrer" className="btn-red" style={{ padding: '12px 20px', fontSize: '13px' }}>
                    LinkedIn
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </a>
                  <a href="https://www.instagram.com/pujan.shahh/?hl=en" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '12px 20px', fontSize: '13px' }}>
                    Instagram
                  </a>
                  <a href="mailto:shahpujanpujan@gmail.com" className="btn-outline" style={{ padding: '12px 20px', fontSize: '13px' }}>
                    Email Me
                  </a>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* ═══════════════ STATS BAND ═══════════════ */}
        <section style={{ background: 'var(--red)', padding: '50px 24px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', textAlign: 'center' }} className="stats-grid">
            {[
              { end: 3, suffix: '+', label: 'Premium Brands' },
              { end: 250, suffix: '+', label: 'Peak Likes' },
              { end: 200, suffix: '+', label: 'Peak Comments' },
              { end: 12, suffix: 'K', label: 'Max Views' },
            ].map((s) => (
              <div key={s.label} className="reveal">
                <Counter end={s.end} suffix={s.suffix} />
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.8)', marginTop: '8px', letterSpacing: '0.05em' }}>{s.label}</div>
              </div>
            ))}
          </div>

        </section>

        {/* ═══════════════ EXPERIENCE ═══════════════ */}
        <section id="experience" style={{ padding: '100px 24px', background: 'var(--black)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }} className="reveal">
              <div className="section-label" style={{ textAlign: 'center' }}>Career</div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.2 }}>
                Professional <span className="text-gradient">Experience</span>
              </h2>
            </div>

            {/* Timeline */}
            <div style={{ position: 'relative' }}>
              {/* Vertical line */}
              <div style={{ position: 'absolute', left: '28px', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, var(--red), rgba(224,0,0,0.1))', zIndex: 0 }} className="timeline-hidden" />

              {/* Entry 1 - Schbang */}
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '32px', marginBottom: '60px' }} className="reveal timeline-item">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 0 4px rgba(224,0,0,0.15)', fontWeight: 800, fontSize: '13px', color: 'white', letterSpacing: '0.02em' }}>SBG</div>
                </div>
                <div style={{ background: 'var(--black-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '32px', paddingBottom: '36px' }} className="card-hover">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
                    <div>
                      <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '6px' }}>Schbang</h3>
                      <p style={{ fontSize: '14px', color: 'var(--red)', fontWeight: 600, letterSpacing: '0.05em' }}>Social Media & Brand Marketing Associate</p>
                    </div>
                    <span style={{ background: 'rgba(224,0,0,0.1)', border: '1px solid rgba(224,0,0,0.2)', padding: '6px 14px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap' }}>3 Months Internship</span>
                  </div>

                  {/* Brands */}
                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '10px' }}>Brands Managed</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {[
                        { name: 'ITC Vivel', url: 'https://www.instagram.com/vivelbyitc?igsh=MXdxbnk3Nnc0ZnQ5MA==' },
                        { name: 'ITC Dermafique', url: 'https://www.instagram.com/dermafique?igsh=ejRvbmRyZWNwaG9y' },
                        { name: 'ITC Charmis', url: 'https://www.instagram.com/charmisbyitc?igsh=ODdwb2htZmp0cjdh' },
                        { name: 'ITC Fiama', url: null },
                        { name: 'Engage', url: null },
                        { name: 'Kotak', url: null },
                      ].map((brand) => (
                        brand.url ? (
                          <a key={brand.name} href={brand.url} target="_blank" rel="noopener noreferrer" style={{ padding: '5px 12px', borderRadius: '3px', fontSize: '12px', fontWeight: 600, background: 'rgba(224,0,0,0.15)', border: '1px solid rgba(224,0,0,0.3)', color: 'white', textDecoration: 'none', transition: 'all 0.2s' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(224,0,0,0.3)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(224,0,0,0.15)')}
                          >
                            {brand.name} ↗
                          </a>
                        ) : (
                          <span key={brand.name} style={{ padding: '5px 12px', borderRadius: '3px', fontSize: '12px', fontWeight: 600, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
                            {brand.name}
                          </span>
                        )
                      ))}
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '12px' }}>Key Responsibilities</p>
                    <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }} className="resp-list">
                      {['Managed content calendars', 'Wrote captions and post copy', 'Coordinated with designers', 'Supported reporting and research', 'Brand communication', 'Content execution'].map((r) => (
                        <li key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                          <span style={{ color: 'var(--red)', marginTop: '3px', flexShrink: 0 }}>▸</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact */}
                  <div style={{ background: 'rgba(224,0,0,0.06)', border: '1px solid rgba(224,0,0,0.15)', borderRadius: '6px', padding: '16px 20px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '8px' }}>⚡ Impact Highlight — Charmis</p>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                      Charmis was a completely organic brand with zero ad support. Average engagement was around <strong style={{ color: 'white' }}>10–15 likes</strong>. A contest-led content strategy helped increase performance to <strong style={{ color: 'var(--red)' }}>250+ likes and 200+ comments</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Entry 2 - The Sleep Company */}
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '32px', marginBottom: '60px' }} className="reveal timeline-item">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--black-card)', border: '2px solid var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800, fontSize: '10px', color: 'var(--red)', textAlign: 'center', lineHeight: 1.2, letterSpacing: '0.02em' }}>TSC</div>
                </div>
                <div style={{ background: 'var(--black-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '32px' }} className="card-hover">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
                    <div>
                      <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '6px' }}>The Sleep Company</h3>
                      <p style={{ fontSize: '14px', color: 'var(--red)', fontWeight: 600, letterSpacing: '0.05em' }}>Marketing & Campaign Intern</p>
                    </div>
                    <span style={{ background: 'rgba(224,0,0,0.1)', border: '1px solid rgba(224,0,0,0.2)', padding: '6px 14px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>6 Months Internship</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }} className="launch-grid">
                    {[
                      { title: 'Smart Ortho Relief Pillow', icon: '🛏️', desc: 'Full product launch — campaign planning, content, and execution' },
                      { title: 'Smart Neck Comfort Pillow', icon: '💤', desc: 'Product launch support — visuals, copy, and social rollout' },
                      { title: 'MS Dhoni Shoot', icon: '⭐', desc: 'On-set and behind-the-scenes contribution to the brand anthem shoot' },
                      { title: 'Anthem Creation', icon: '🎬', desc: 'Contributed to the creation and campaign execution of the brand anthem' },
                    ].map((item) => (
                      <div key={item.title} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '6px', padding: '16px' }}>
                        <div style={{ fontSize: '22px', marginBottom: '8px' }}>{item.icon}</div>
                        <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'white' }}>{item.title}</div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{item.desc}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: 'rgba(224,0,0,0.06)', border: '1px solid rgba(224,0,0,0.15)', borderRadius: '6px', padding: '16px 20px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '8px' }}>⚡ Key Achievement</p>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                      Participated in 2 major product launches and was part of the <strong style={{ color: 'white' }}>MS Dhoni brand shoot and anthem creation</strong> — contributing to premium brand storytelling for one of India's fastest-growing sleep-tech brands.
                    </p>
                  </div>
                </div>
              </div>

              {/* Entry 3 - Dr Gluten */}
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '32px', marginBottom: '60px' }} className="reveal timeline-item">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--black-card)', border: '2px solid rgba(224,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800, fontSize: '12px', color: 'rgba(224,0,0,0.8)', letterSpacing: '0.02em' }}>DG</div>
                </div>
                <div style={{ background: 'var(--black-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '32px' }} className="card-hover">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
                    <div>
                      <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '6px' }}>
                        <a href="https://www.instagram.com/dr_gluten?igsh=dzN2bnlka254OTF5" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>Dr Gluten ↗</a>
                      </h3>
                      <p style={{ fontSize: '14px', color: 'var(--red)', fontWeight: 600, letterSpacing: '0.05em' }}>Social Media & Content Manager</p>
                    </div>
                    <span style={{ background: 'rgba(224,0,0,0.1)', border: '1px solid rgba(224,0,0,0.2)', padding: '6px 14px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Jan 2026 – Present</span>
                  </div>

                  {/* Before/After metrics */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }} className="metric-grid">
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '12px' }}>Baseline Metrics</p>
                      {[
                        { label: 'Avg Views', val: '1,200–1,500' },
                        { label: 'Avg Likes', val: '12–15' },
                        { label: 'Avg Comments', val: '2–3' },
                      ].map((m) => (
                        <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{m.label}</span>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{m.val}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '12px' }}>Peak Performance</p>
                      {[
                        { label: 'Contest Post Likes', val: '70+', highlight: true },
                        { label: 'Contest Comments', val: '70+', highlight: true },
                        { label: 'Barter Collab Views', val: '3K–12K', highlight: true },
                      ].map((m) => (
                        <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(224,0,0,0.1)' }}>
                          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{m.label}</span>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--red)' }}>{m.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ background: 'rgba(224,0,0,0.06)', border: '1px solid rgba(224,0,0,0.15)', borderRadius: '6px', padding: '16px 20px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '8px' }}>⚡ Growth Driver</p>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                      Strategic barter collaborations and contest-based content drove views from <strong style={{ color: 'white' }}>1,200–1,500 to 3K–12K</strong> on selected posts — proving the power of creative content strategy over paid boosts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Also Handled */}
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '32px' }} className="reveal timeline-item">
                <div style={{ display: 'flex', justifyContent: 'center', zIndex: 1 }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800, fontSize: '11px', color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>+</div>
                </div>
                <div style={{ background: 'var(--black-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '24px 32px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>Also Handled</p>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <a href="https://www.instagram.com/chakna_singh?igsh=ZGw4d3l6cmkxYnl1" target="_blank" rel="noopener noreferrer" style={{ padding: '8px 16px', borderRadius: '4px', fontSize: '13px', fontWeight: 600, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', transition: 'all 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(224,0,0,0.4)')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    >Chakna Singh ↗</a>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </section>

        {/* ═══════════════ SKILLS ═══════════════ */}
        <section id="skills" style={{ padding: '100px 24px', background: 'var(--black-soft)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }} className="reveal">
              <div className="section-label" style={{ textAlign: 'center' }}>What I Do</div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>
                Core <span className="text-gradient">Skills</span>
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }} className="skills-grid reveal">
              {[
                { icon: '📱', skill: 'Social Media Strategy' },
                { icon: '📅', skill: 'Content Planning' },
                { icon: '🗓️', skill: 'Content Calendar Mgmt' },
                { icon: '✍️', skill: 'Caption Writing' },
                { icon: '🏷️', skill: 'Brand Communication' },
                { icon: '🚀', skill: 'Campaign Execution' },
                { icon: '🤝', skill: 'Influencer Collaboration' },
                { icon: '🏆', skill: 'Contest Strategy' },
                { icon: '📊', skill: 'Reporting & Research' },
                { icon: '💡', skill: 'Creative Ideation' },
                { icon: '📈', skill: 'Trend Analysis' },
                { icon: '👥', skill: 'Team Coordination' },
              ].map((item) => (
                <div key={item.skill} className="skill-tag">
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <span style={{ fontSize: '13px', fontWeight: 500 }}>{item.skill}</span>
                </div>
              ))}
            </div>
          </div>


        </section>

        {/* ═══════════════ CASE STUDIES ═══════════════ */}
        <section id="work" style={{ padding: '100px 24px', background: 'var(--black)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }} className="reveal">
              <div className="section-label" style={{ textAlign: 'center' }}>Case Studies</div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>
                Work <span className="text-gradient">Highlights</span>
              </h2>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', marginTop: '12px' }}>Real campaigns. Real results.</p>
            </div>

            {/* Case Study 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', marginBottom: '80px' }} className="reveal case-grid">
              <div style={{ borderRadius: '8px', overflow: 'hidden', aspectRatio: '4/3', position: 'relative' }} className="img-overlay">
                <img src="/charmis-contest.webp" alt="Charmis Contest Post" width="800" height="600" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'var(--red)', padding: '6px 14px', borderRadius: '3px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Case Study 01</div>
              </div>
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  {['Schbang', 'ITC Charmis', 'Organic Growth'].map(t => <span key={t} style={{ padding: '4px 10px', fontSize: '11px', fontWeight: 600, background: 'rgba(224,0,0,0.1)', border: '1px solid rgba(224,0,0,0.2)', borderRadius: '3px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}>{t}</span>)}
                </div>
                <h3 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '16px', lineHeight: 1.2 }}>Charmis Organic<br /><span className="text-gradient">Engagement Boost</span></h3>
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>Problem</p>
                  <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>Organic brand with zero ad support and very low average engagement of 10–15 likes per post.</p>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>Solution</p>
                  <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>Designed and executed a contest-based content strategy to drive user participation and amplify reach organically.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ background: 'rgba(224,0,0,0.08)', border: '1px solid rgba(224,0,0,0.2)', borderRadius: '6px', padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--red)' }}>250+</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>Peak Likes</div>
                  </div>
                  <div style={{ background: 'rgba(224,0,0,0.08)', border: '1px solid rgba(224,0,0,0.2)', borderRadius: '6px', padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--red)' }}>200+</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>Peak Comments</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', marginBottom: '80px' }} className="reveal case-grid case-reverse">
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  {['The Sleep Company', 'Product Launch', 'Celebrity Shoot'].map(t => <span key={t} style={{ padding: '4px 10px', fontSize: '11px', fontWeight: 600, background: 'rgba(224,0,0,0.1)', border: '1px solid rgba(224,0,0,0.2)', borderRadius: '3px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}>{t}</span>)}
                </div>
                <h3 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '16px', lineHeight: 1.2 }}>The Sleep Company<br /><span className="text-gradient">Campaign & Launches</span></h3>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '20px' }}>
                  Supported 2 premium product launches — Smart Ortho Relief Pillow and Smart Neck Comfort Pillow — with campaign planning, content, and execution. Contributed to the historic MS Dhoni brand shoot and anthem creation.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  {['2 Product\nLaunches', 'MS Dhoni\nShoot', 'Brand\nAnthem'].map(s => (
                    <div key={s} style={{ background: 'rgba(224,0,0,0.08)', border: '1px solid rgba(224,0,0,0.2)', borderRadius: '6px', padding: '14px', textAlign: 'center' }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'white', whiteSpace: 'pre-line', lineHeight: 1.4 }}>{s}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {['/dhoni-shoot-1.webp', '/dhoni-shoot-2.webp', '/ortho-pillow-launch.webp', '/neck-pillow-launch.webp'].map((src, i) => (
                  <div key={i} style={{ borderRadius: '6px', overflow: 'hidden', aspectRatio: '1/1', position: 'relative' }} className="img-overlay">
                    <img src={src} alt="The Sleep Company" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {i === 0 && <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'var(--red)', padding: '4px 10px', borderRadius: '3px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Case Study 02</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Case Study 3 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }} className="reveal case-grid">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {['/drgluten-barter-1.webp', '/drgluten-barter-2.webp', '/drgluten-contest.webp'].map((src, i) => (
                  <div key={i} style={{ borderRadius: '6px', overflow: 'hidden', aspectRatio: i === 2 ? '2/1' : '1/1', gridColumn: i === 2 ? 'span 2' : 'span 1', position: 'relative' }} className="img-overlay">
                    <img src={src} alt="Dr Gluten" width="500" height="500" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {i === 0 && <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'var(--red)', padding: '4px 10px', borderRadius: '3px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Case Study 03</div>}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  {['Dr Gluten', 'Barter Collab', 'Contest Strategy'].map(t => <span key={t} style={{ padding: '4px 10px', fontSize: '11px', fontWeight: 600, background: 'rgba(224,0,0,0.1)', border: '1px solid rgba(224,0,0,0.2)', borderRadius: '3px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}>{t}</span>)}
                </div>
                <h3 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '16px', lineHeight: 1.2 }}>Dr Gluten<br /><span className="text-gradient">Social Growth</span></h3>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '20px' }}>
                  Managed brand content, barter collaborations, and contest activations that drove substantial visibility improvements — proving that smart strategy beats paid reach.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {[
                    { label: 'From', val: '1.2K–1.5K', sub: 'Baseline Views' },
                    { label: 'To', val: '3K–12K', sub: 'Peak Views' },
                    { label: 'Contest Likes', val: '70+', sub: 'Peak Performance' },
                    { label: 'Contest Comments', val: '70+', sub: 'Peak Performance' },
                  ].map(s => (
                    <div key={s.label} style={{ background: 'rgba(224,0,0,0.08)', border: '1px solid rgba(224,0,0,0.2)', borderRadius: '6px', padding: '16px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{s.label}</div>
                      <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--red)' }}>{s.val}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{s.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>


        </section>

        {/* ═══════════════ SERVICES ═══════════════ */}
        <section style={{ padding: '100px 24px', background: 'var(--black-soft)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }} className="reveal">
              <div className="section-label" style={{ textAlign: 'center' }}>What I Offer</div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>
                Services
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="services-grid reveal">
              {[
                { icon: '📱', title: 'Social Media Management', desc: 'Strategy, scheduling, engagement, and growth across platforms.' },
                { icon: '📐', title: 'Content Strategy', desc: 'Data-driven content planning aligned with brand voice and goals.' },
                { icon: '🎯', title: 'Campaign Planning', desc: 'End-to-end planning and execution of marketing campaigns.' },
                { icon: '🏷️', title: 'Brand Communication', desc: 'Crafting messages that resonate with your target audience.' },
                { icon: '✍️', title: 'Copywriting', desc: 'Compelling captions, post copy, and ad text that converts.' },
                { icon: '💡', title: 'Creative Concepts', desc: 'Fresh ideas and creative direction for brand activations.' },
                { icon: '🤝', title: 'Influencer Support', desc: 'Barter and paid collaboration strategy and coordination.' },
                { icon: '📊', title: 'Performance Tracking', desc: 'Reporting, analytics, and insight-driven optimization.' },
              ].map((s) => (
                <div key={s.title} style={{ background: 'var(--black-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '24px', transition: 'all 0.3s ease' }} className="card-hover service-card">
                  <div style={{ fontSize: '28px', marginBottom: '14px' }}>{s.icon}</div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '10px', lineHeight: 1.3 }}>{s.title}</h4>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>


        </section>

        {/* ═══════════════ GALLERY ═══════════════ */}
        <section id="gallery" style={{ padding: '100px 24px', background: 'var(--black)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }} className="reveal">
              <div className="section-label" style={{ textAlign: 'center' }}>Portfolio</div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>
                Campaign <span className="text-gradient">Gallery</span>
              </h2>
            </div>

            <div style={{ columns: '3', columnGap: '12px' }} className="gallery-cols reveal">
              {[
                { src: '/charmis-contest.webp', label: 'Charmis Contest — Schbang' },
                { src: '/dhoni-shoot-1.webp', label: 'MS Dhoni Shoot — The Sleep Co.' },
                { src: '/neck-pillow-launch.webp', label: 'Neck Comfort Pillow Launch' },
                { src: '/drgluten-barter-1.webp', label: 'Barter Collab — Dr Gluten' },
                { src: '/dhoni-shoot-2.webp', label: 'MS Dhoni BTS — The Sleep Co.' },
                { src: '/ortho-pillow-launch.webp', label: 'Ortho Relief Pillow Launch' },
                { src: '/drgluten-barter-2.webp', label: 'Barter Collab 2 — Dr Gluten' },
                { src: '/drgluten-contest.webp', label: 'Contest Post — Dr Gluten' },
              ].map((item) => (
                <div key={item.src} style={{ marginBottom: '12px', breakInside: 'avoid', borderRadius: '6px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }} className="gallery-item img-overlay card-hover">
                  <img src={item.src} alt={item.label} loading="lazy" decoding="async" style={{ width: '100%', display: 'block' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 14px 14px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', opacity: 0, transition: 'opacity 0.3s ease' }} className="gallery-label">
                    <p style={{ fontSize: '12px', fontWeight: 600, color: 'white' }}>{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </section>

        {/* ═══════════════ TESTIMONIALS ═══════════════ */}
        <section style={{ padding: '100px 24px', background: 'var(--black-soft)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(224,0,0,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }} className="reveal">
              <div className="section-label" style={{ textAlign: 'center' }}>Credibility</div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>
                What They <span className="text-gradient">Say</span>
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="testimonials-grid reveal">
              {[
                { quote: 'Creative thinker with strong execution skills. Pujan brings ideas to life with clarity and precision.', attr: 'Brand Manager', org: 'Schbang' },
                { quote: 'Understands brand tone and audience engagement better than most. Consistent, reliable, and creative.', attr: 'Creative Lead', org: 'Campaign Team' },
                { quote: 'Can manage content planning with consistency and clarity. A reliable marketing professional with sharp instincts.', attr: 'Marketing Head', org: 'Digital Agency' },
              ].map((t, i) => (
                <div key={i} style={{ background: 'var(--black-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '28px', position: 'relative' }} className="card-hover">
                  <div style={{ fontSize: '48px', color: 'var(--red)', lineHeight: 1, fontWeight: 900, marginBottom: '16px', fontFamily: 'Georgia, serif' }}>"</div>
                  <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '20px', fontStyle: 'italic' }}>{t.quote}</p>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'white' }}>{t.attr}</div>
                    <div style={{ fontSize: '12px', color: 'var(--red)', marginTop: '2px' }}>{t.org}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </section>

        {/* ═══════════════ BRANDS I'VE WORKED WITH ═══════════════ */}
        <section style={{ padding: '60px 24px', background: 'var(--black)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '32px' }}>Brands I've Managed</p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
              {[
                { name: 'ITC Vivel', url: 'https://www.instagram.com/vivelbyitc?igsh=MXdxbnk3Nnc0ZnQ5MA==' },
                { name: 'ITC Dermafique', url: 'https://www.instagram.com/dermafique?igsh=ejRvbmRyZWNwaG9y' },
                { name: 'ITC Charmis', url: 'https://www.instagram.com/charmisbyitc?igsh=ODdwb2htZmp0cjdh' },
                { name: 'ITC Fiama', url: null },
                { name: 'Engage', url: null },
                { name: 'Kotak', url: null },
                { name: 'Dr Gluten', url: 'https://www.instagram.com/dr_gluten?igsh=dzN2bnlka254OTF5' },
                { name: 'Chakna Singh', url: 'https://www.instagram.com/chakna_singh?igsh=ZGw4d3l6cmkxYnl1' },
                { name: 'The Sleep Company', url: null },
              ].map((brand) => (
                brand.url ? (
                  <a key={brand.name} href={brand.url} target="_blank" rel="noopener noreferrer"
                    style={{ padding: '10px 20px', borderRadius: '4px', fontSize: '13px', fontWeight: 600, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'all 0.2s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(224,0,0,0.5)'; e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                  >{brand.name} ↗</a>
                ) : (
                  <span key={brand.name} style={{ padding: '10px 20px', borderRadius: '4px', fontSize: '13px', fontWeight: 600, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>{brand.name}</span>
                )
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ CONTACT ═══════════════ */}
        <section id="contact" style={{ padding: '100px 24px', background: 'var(--black-soft)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div className="reveal">
              <div className="section-label" style={{ textAlign: 'center' }}>Get In Touch</div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, marginBottom: '16px' }}>
                Let's <span className="text-gradient">Connect</span>
              </h2>
              <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.6)', marginBottom: '48px', lineHeight: 1.7 }}>
                Open to full-time roles, freelance projects, and exciting brand collaborations. Let's build something great together.
              </p>
            </div>

            {/* Contact cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '40px' }} className="contact-grid reveal">
              {[
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                  ),
                  label: 'Email',
                  value: 'shahpujanpujan@gmail.com',
                  href: 'mailto:shahpujanpujan@gmail.com',
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  ),
                  label: 'WhatsApp',
                  value: '+91 88660 16120',
                  href: 'https://wa.me/918866016120',
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  ),
                  label: 'LinkedIn',
                  value: 'linkedin.com/in/pujanshahh',
                  href: 'https://www.linkedin.com/in/pujanshahh/',
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                  ),
                  label: 'Instagram',
                  value: '@pujan.shahh',
                  href: 'https://www.instagram.com/pujan.shahh/?hl=en',
                },
              ].map((contact) => (
                <a key={contact.label} href={contact.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 24px', background: 'var(--black-card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.3s ease', color: 'white' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(224,0,0,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: 'rgba(224,0,0,0.1)', border: '1px solid rgba(224,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--red)' }}>
                    {contact.icon}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>{contact.label}</div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>{contact.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <a href="https://wa.me/918866016120" target="_blank" rel="noopener noreferrer" className="btn-red" style={{ fontSize: '15px', padding: '16px 36px' }}>
                Connect on WhatsApp
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
              <a href="mailto:shahpujanpujan@gmail.com" className="btn-outline" style={{ fontSize: '15px', padding: '16px 36px' }}>
                Send Email
              </a>
            </div>
          </div>

        </section>
      </main>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer style={{ background: 'var(--black)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '40px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{ width: '28px', height: '28px', background: 'var(--red)', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '11px', color: 'white' }}>PS</div>
              <span style={{ fontWeight: 700, fontSize: '15px' }}>Pujan Shah</span>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Marketing & Advertising Portfolio</p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>BAMMC Graduate · Mumbai University · 1 Year Experience</p>
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {[
              { href: 'https://www.linkedin.com/in/pujanshahh/', label: 'LI' },
              { href: 'https://www.instagram.com/pujan.shahh/?hl=en', label: 'IG' },
              { href: 'https://wa.me/918866016120', label: 'WA' },
              { href: 'mailto:shahpujanpujan@gmail.com', label: 'EM' },
            ].map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ width: '36px', height: '36px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'all 0.2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(224,0,0,0.15)'; e.currentTarget.style.borderColor = 'rgba(224,0,0,0.4)'; e.currentTarget.style.color = 'var(--red)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
              >{s.label}</a>
            ))}
          </div>

          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>© 2025 Pujan Shah. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
