import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import TopicCard from '../components/TopicCard';
import { TOPICS, SUBJECTS, GRADE_BANDS } from '../data/topics';
import { ArrowRight, Sparkles, BookOpen, Zap } from 'lucide-react';

const FEATURED_IDS = ['quadratic-formula', 'pythagorean-theorem', 'fractions-intro', 'derivatives-intro', 'linear-equations', 'mean-median-mode'];
const featuredTopics = FEATURED_IDS.map(id => TOPICS.find(t => t.id === id)).filter(Boolean);

const SUBJECT_EMOJIS = {
  arithmetic: '🔢', algebra: '✏️', geometry: '📐', fractions: '🍕',
  statistics: '📊', trigonometry: '📏', calculus: '∫', precalculus: '🔭',
};

const SUBJECT_ACCENTS = {
  arithmetic: '#FF6B6B', algebra: '#4FC3F7', geometry: '#A8E6CF',
  fractions: '#FFD166', statistics: '#C3A8E6', trigonometry: '#FF9A9E',
  calculus: '#4FC3F7', precalculus: '#A8E6CF',
};

function FloatingBlob({ style, color }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none select-none"
      style={{
        background: `radial-gradient(circle, ${color}33 0%, transparent 70%)`,
        filter: 'blur(40px)',
        ...style,
      }}
    />
  );
}

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--mb-bg)' }}>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-28 px-4 sm:px-6"
        style={{
          background: 'linear-gradient(165deg, #F0EEFF 0%, #E8F7FF 45%, #EEFFF8 100%)',
        }}
      >
        {/* Ambient blobs — more vivid */}
        <FloatingBlob color="#FF6B6B" style={{ width: 600, height: 600, top: -200, right: -150, opacity: 0.7 }} />
        <FloatingBlob color="#4FC3F7" style={{ width: 500, height: 500, bottom: -150, left: -120, opacity: 0.65 }} />
        <FloatingBlob color="#FFD166" style={{ width: 350, height: 350, top: '20%', left: '55%', opacity: 0.55 }} />
        <FloatingBlob color="#A8E6CF" style={{ width: 250, height: 250, top: '60%', right: '25%', opacity: 0.5 }} />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold mb-8"
            style={{
              background: 'rgba(255,255,255,0.85)',
              color: '#FF6B6B',
              boxShadow: '0 4px 20px rgba(255,107,107,0.2), inset 0 1.5px 0 rgba(255,255,255,1)',
              border: '1.5px solid rgba(255,107,107,0.25)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Sparkles size={14} />
            Free · No Ads · No Data Collection · COPPA Compliant
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
            className="font-display font-black mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              lineHeight: 1.1,
              color: 'var(--mb-text)',
            }}
          >
            Math made{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD166 60%, #4FC3F7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              crystal clear.
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-12 mx-auto max-w-2xl leading-relaxed"
            style={{ color: 'var(--mb-text-muted)' }}
          >
            Step-by-step solving methods, clear explanations, and hands-on practice exercises for every math topic from TK through 12th grade.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <SearchBar large />
          </motion.div>

          {/* Quick tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 flex flex-wrap justify-center gap-2"
          >
            {[
              { label: 'quadratic formula', color: '#FF6B6B' },
              { label: 'fractions', color: '#FFD166' },
              { label: 'pythagorean theorem', color: '#A8E6CF' },
              { label: 'derivatives', color: '#4FC3F7' },
              { label: 'slope', color: '#C3A8E6' },
              { label: 'percentages', color: '#FF9A9E' },
            ].map(({ label, color }) => (
              <Link
                key={label}
                to={`/browse?q=${encodeURIComponent(label)}`}
                className="px-4 py-1.5 rounded-full text-xs font-bold transition-all hover:-translate-y-1 focus-visible-clay"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  color: color,
                  border: `1.5px solid ${color}44`,
                  boxShadow: `0 2px 10px ${color}22, inset 0 1px 0 rgba(255,255,255,0.8)`,
                  backdropFilter: 'blur(8px)',
                }}
              >
                {label}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Grade Bands ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black mb-3" style={{ color: 'var(--mb-text)' }}>Browse by Grade</h2>
          <p className="text-base" style={{ color: 'var(--mb-text-muted)' }}>Find exactly what you need at the right level.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {GRADE_BANDS.map((band, i) => (
            <motion.div
              key={band.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <Link
                to={`/browse?grade=${band.id}`}
                className="clay-card clay-card-press flex flex-col items-center text-center p-7 focus-visible-clay group relative overflow-hidden"
                style={{ textDecoration: 'none', minHeight: '170px' }}
              >
                {/* Background tint */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `linear-gradient(135deg, ${band.color}15 0%, transparent 70%)` }}
                />
                <div
                  className="w-16 h-16 rounded-3xl flex items-center justify-center font-black mb-4 relative z-10"
                  style={{
                    background: `linear-gradient(145deg, ${band.color} 0%, ${band.color}cc 100%)`,
                    boxShadow: `0 10px 30px ${band.color}55, inset 0 2px 0 rgba(255,255,255,0.45)`,
                    color: 'white',
                    fontSize: '1rem',
                    letterSpacing: '0.02em',
                  }}
                >
                  {band.label}
                </div>
                <p className="font-extrabold text-base mb-1 relative z-10" style={{ color: 'var(--mb-text)' }}>{band.range}</p>
                <p className="text-xs leading-relaxed relative z-10" style={{ color: 'var(--mb-text-muted)' }}>{band.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Featured Topics ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black mb-2" style={{ color: 'var(--mb-text)' }}>Popular Topics</h2>
            <p className="text-base" style={{ color: 'var(--mb-text-muted)' }}>The most-searched methods, beautifully explained.</p>
          </div>
          <Link
            to="/browse"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold pill-btn focus-visible-clay"
            style={{
              background: 'linear-gradient(135deg, #4FC3F7 0%, #A8E6CF 100%)',
              color: 'white',
              boxShadow: '0 4px 14px rgba(79,195,247,0.35)',
            }}
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredTopics.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <TopicCard topic={topic} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Subjects ─────────────────────────────────────────────────────────── */}
      <section
        className="py-20 px-4 sm:px-6"
        style={{ background: 'linear-gradient(180deg, rgba(240,238,255,0.4) 0%, rgba(232,247,255,0.4) 100%)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black mb-3" style={{ color: 'var(--mb-text)' }}>Explore by Subject</h2>
            <p className="text-base" style={{ color: 'var(--mb-text-muted)' }}>From basic arithmetic to advanced calculus.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SUBJECTS.map((subj, i) => (
              <motion.div
                key={subj.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <Link
                  to={`/browse?subject=${subj.id}`}
                  className="clay-card clay-card-press flex flex-col gap-2 p-5 focus-visible-clay group relative overflow-hidden"
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-[2.5rem] opacity-70 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(90deg, ${subj.color} 0%, ${subj.color}88 100%)` }}
                  />
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl mt-1"
                    style={{ background: `${subj.color}18`, boxShadow: `0 4px 12px ${subj.color}25` }}
                  >
                    {subj.emoji}
                  </div>
                  <p className="font-extrabold text-sm" style={{ color: 'var(--mb-text)' }}>{subj.label}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--mb-text-muted)' }}>{subj.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Value props ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Zap, title: 'Step-by-Step Methods', body: 'Every topic leads with a clear, numbered solving method — not just the answer, but the entire thought process.', color: '#FF6B6B' },
            { icon: BookOpen, title: 'Guided Explanations', body: 'After the steps, a deeper explanation puts the concept in context — why it works, not just how.', color: '#4FC3F7' },
            { icon: Sparkles, title: 'Practice & Verify', body: 'Each topic includes curated exercises with hidden hints and solutions you can reveal when ready.', color: '#A8E6CF' },
          ].map(({ icon: Icon, title, body, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              className="clay-card p-7 relative overflow-hidden group"
            >
              <div
                className="absolute bottom-0 left-0 right-0 h-1 rounded-b-[2.5rem] opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, ${color}, ${color}66)` }}
              />
              <div
                className="w-14 h-14 rounded-3xl flex items-center justify-center mb-5"
                style={{
                  background: `linear-gradient(145deg, ${color}30 0%, ${color}15 100%)`,
                  boxShadow: `0 8px 24px ${color}25, inset 0 1.5px 0 rgba(255,255,255,0.8)`,
                }}
              >
                <Icon size={24} style={{ color }} />
              </div>
              <h3 className="font-extrabold text-lg mb-2" style={{ color: 'var(--mb-text)' }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--mb-text-muted)' }}>{body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 text-center">
        <div
          className="max-w-3xl mx-auto rounded-[3rem] p-12 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,107,107,0.12) 0%, rgba(79,195,247,0.12) 100%)',
            border: '1px solid var(--mb-border)',
            boxShadow: 'var(--clay-shadow-md)',
          }}
        >
          <FloatingBlob color="#FF6B6B" style={{ width: 200, height: 200, top: -60, right: -40, zIndex: 0 }} />
          <FloatingBlob color="#4FC3F7" style={{ width: 200, height: 200, bottom: -60, left: -40, zIndex: 0 }} />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: 'var(--mb-text)' }}>
              Ready to master math?
            </h2>
            <p className="text-lg mb-8" style={{ color: 'var(--mb-text-muted)' }}>
              No signup. No tracking. Just pure, clear math.
            </p>
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white text-lg font-bold pill-btn focus-visible-clay"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD166 100%)',
                boxShadow: '0 8px 28px rgba(255,107,107,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
              }}
            >
              Browse All Topics <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer
        className="py-8 px-4 sm:px-6 text-center text-sm"
        style={{ borderTop: '1px solid var(--mb-border)', color: 'var(--mb-text-muted)' }}
      >
        <p className="font-semibold mb-1">
          <span style={{ color: '#FF6B6B' }}>Math</span>Bath
        </p>
        <p className="text-xs">
          Free forever · No data collected · No cookies · COPPA compliant
        </p>
      </footer>
    </div>
  );
}