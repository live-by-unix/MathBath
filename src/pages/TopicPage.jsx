import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp, Lightbulb, Eye, EyeOff, BookOpen, ArrowRight } from 'lucide-react';
import { TOPICS } from '../data/topics';

const GRADE_COLORS = {
  tk2: { bg: '#A8E6CF', text: '#1a6045' },
  '35': { bg: '#4FC3F7', text: '#0d4f6e' },
  '68': { bg: '#FFD166', text: '#7a4f00' },
  '912': { bg: '#FF6B6B', text: '#7a0000' },
};

const SUBJECT_COLORS = {
  arithmetic: '#FF6B6B', algebra: '#4FC3F7', geometry: '#A8E6CF',
  fractions: '#FFD166', statistics: '#C3A8E6', trigonometry: '#FF9A9E',
  calculus: '#4FC3F7', precalculus: '#A8E6CF',
};

const STEP_COLORS = ['#FF6B6B', '#4FC3F7', '#A8E6CF', '#FFD166', '#C3A8E6', '#FF9A9E'];

function ExerciseCard({ exercise, index }) {
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div
      className="rounded-3xl p-6 transition-all duration-300"
      style={{
        background: 'var(--mb-surface)',
        border: '1px solid var(--mb-border)',
        boxShadow: 'var(--clay-shadow-sm)',
      }}
    >
      {/* Question */}
      <div className="flex items-start gap-3 mb-4">
        <span
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD166 100%)' }}
        >
          {index + 1}
        </span>
        <p className="font-semibold text-base leading-relaxed pt-1" style={{ color: 'var(--mb-text)' }}>
          {exercise.question}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2 ml-11">
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold pill-btn focus-visible-clay transition-all"
          style={{
            background: showHint ? 'rgba(255,209,102,0.2)' : 'rgba(255,209,102,0.1)',
            color: '#c9962a',
            border: '1.5px solid rgba(255,209,102,0.4)',
          }}
        >
          <Lightbulb size={12} />
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold pill-btn focus-visible-clay transition-all"
          style={{
            background: showAnswer ? 'rgba(168,230,207,0.25)' : 'rgba(168,230,207,0.1)',
            color: '#1a6045',
            border: '1.5px solid rgba(168,230,207,0.5)',
          }}
        >
          {showAnswer ? <EyeOff size={12} /> : <Eye size={12} />}
          {showAnswer ? 'Hide Answer' : 'Reveal Answer'}
        </button>
      </div>

      {/* Hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="overflow-hidden ml-11 mt-3"
          >
            <div
              className="rounded-2xl px-4 py-3"
              style={{
                background: 'rgba(255,209,102,0.12)',
                border: '1px solid rgba(255,209,102,0.3)',
              }}
            >
              <p className="text-xs font-bold mb-1" style={{ color: '#c9962a' }}>💡 Hint</p>
              <p className="text-sm" style={{ color: 'var(--mb-text)' }}>{exercise.hint}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Answer */}
      <AnimatePresence>
        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            className="overflow-hidden ml-11 mt-3"
          >
            <div
              className="rounded-2xl px-4 py-3"
              style={{
                background: 'rgba(168,230,207,0.15)',
                border: '1.5px solid rgba(168,230,207,0.5)',
              }}
            >
              <p className="text-xs font-bold mb-1" style={{ color: '#1a6045' }}>✅ Answer</p>
              <p className="text-base font-bold" style={{ color: 'var(--mb-text)' }}>{exercise.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TopicPage() {
  const { topicId } = useParams();
  const topic = TOPICS.find(t => t.id === topicId);
  const [expandedStep, setExpandedStep] = useState(null);

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--mb-bg)' }}>
        <div className="clay-card text-center p-12 max-w-md">
          <div className="text-5xl mb-4">🤔</div>
          <h2 className="text-2xl font-black mb-3" style={{ color: 'var(--mb-text)' }}>Topic not found</h2>
          <p className="mb-6" style={{ color: 'var(--mb-text-muted)' }}>We don't have that one yet!</p>
          <Link to="/browse" className="px-6 py-3 rounded-full text-white font-bold pill-btn"
            style={{ background: 'linear-gradient(135deg, #FF6B6B, #FFD166)' }}>
            Browse All Topics
          </Link>
        </div>
      </div>
    );
  }

  const gradeStyle = GRADE_COLORS[topic.grade] || GRADE_COLORS['68'];
  const accentColor = SUBJECT_COLORS[topic.subject] || '#4FC3F7';
  const relatedTopics = TOPICS
    .filter(t => t.id !== topic.id && (t.subject === topic.subject || t.grade === topic.grade))
    .slice(0, 3);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6" style={{ background: 'var(--mb-bg)' }}>
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8 pill-btn focus-visible-clay"
          style={{
            background: 'var(--mb-surface)',
            color: 'var(--mb-text-muted)',
            border: '1px solid var(--mb-border)',
          }}
        >
          <ArrowLeft size={14} /> Back to Browse
        </Link>

        {/* Header card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: [0.34, 1.56, 0.64, 1] }}
          className="clay-card p-8 mb-8"
        >
          <div className="flex flex-wrap gap-2 mb-5">
            <span
              className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold"
              style={{ background: gradeStyle.bg, color: gradeStyle.text }}
            >
              Grade {topic.gradeLabel}
            </span>
            <span
              className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold capitalize"
              style={{ background: `${accentColor}22`, color: accentColor }}
            >
              {topic.subject}
            </span>
          </div>

          <h1 className="font-black mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--mb-text)', lineHeight: 1.1 }}>
            {topic.title}
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--mb-text-muted)' }}>
            {topic.intro}
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 mt-6 pt-6" style={{ borderTop: '1px solid var(--mb-border)' }}>
            <div className="flex items-center gap-2">
              <span className="step-badge" style={{ background: accentColor }}>
                {topic.steps.length} Steps
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: 'rgba(168,230,207,0.2)', color: '#1a6045' }}
              >
                {topic.exercises.length} Exercises
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── GLASSY FOCAL CARD — Step-by-Step ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
          className="glass-focal p-8 mb-8"
        >
          {/* Section heading */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD166 100%)',
                boxShadow: '0 4px 16px rgba(255,107,107,0.35)',
              }}
            >
              <BookOpen size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black" style={{ color: 'var(--mb-text)' }}>How to Solve It</h2>
              <p className="text-xs" style={{ color: 'var(--mb-text-muted)' }}>Follow each step carefully</p>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {topic.steps.map((step, i) => {
              const stepColor = STEP_COLORS[i % STEP_COLORS.length];
              const isOpen = expandedStep === i;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <button
                    onClick={() => setExpandedStep(isOpen ? null : i)}
                    className="w-full text-left rounded-3xl p-5 transition-all duration-300 focus-visible-clay group"
                    style={{
                      background: isOpen ? `${stepColor}15` : 'rgba(255,255,255,0.65)',
                      border: `1.5px solid ${isOpen ? stepColor + '55' : 'rgba(200,200,240,0.35)'}`,
                      boxShadow: isOpen
                        ? `0 8px 28px ${stepColor}25, inset 0 1.5px 0 rgba(255,255,255,0.9)`
                        : 'inset 0 1.5px 0 rgba(255,255,255,0.9), 0 2px 8px rgba(80,80,160,0.08)',
                    }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Step number badge */}
                      <div
                        className="flex-shrink-0 flex items-center justify-center rounded-2xl text-white font-black transition-all duration-300"
                        style={{
                          width: '2.75rem',
                          height: '2.75rem',
                          background: `linear-gradient(145deg, ${stepColor} 0%, ${stepColor}cc 100%)`,
                          boxShadow: `0 6px 18px ${stepColor}55, inset 0 1.5px 0 rgba(255,255,255,0.4)`,
                          fontSize: '0.75rem',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-base" style={{ color: 'var(--mb-text)' }}>{step.title}</p>
                      </div>

                      <div
                        className="flex-shrink-0 transition-transform duration-300"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: stepColor }}
                      >
                        <ChevronDown size={18} />
                      </div>
                    </div>

                    {/* Expanded body */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                          className="overflow-hidden"
                        >
                          <p
                            className="mt-3 ml-14 text-base leading-relaxed font-body"
                            style={{ color: 'var(--mb-text)' }}
                          >
                            {step.body}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Tap instruction */}
          <p className="text-center text-xs mt-6" style={{ color: 'var(--mb-text-muted)' }}>
            Tap each step to expand the full explanation
          </p>
        </motion.div>

        {/* ── Explanation ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          className="clay-card p-8 mb-8"
        >
          <h2 className="text-xl font-black mb-4 flex items-center gap-2" style={{ color: 'var(--mb-text)' }}>
            <span className="text-xl">💡</span> Why It Works
          </h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--mb-text)' }}>
            {topic.explanation}
          </p>
        </motion.div>

        {/* ── Practice Exercises ────────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-12"
        >
          <h2 className="text-2xl font-black mb-2 flex items-center gap-2" style={{ color: 'var(--mb-text)' }}>
            ✏️ Practice Exercises
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--mb-text-muted)' }}>
            Try each problem yourself, then reveal hints or the answer when you're ready.
          </p>
          <div className="space-y-4">
            {topic.exercises.map((ex, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <ExerciseCard exercise={ex} index={i} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Related Topics ────────────────────────────────────────────────── */}
        {relatedTopics.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl font-black mb-5 flex items-center gap-2" style={{ color: 'var(--mb-text)' }}>
              📚 Related Topics
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedTopics.map(rt => (
                <Link
                  key={rt.id}
                  to={`/topic/${rt.id}`}
                  className="clay-card clay-card-press p-5 group focus-visible-clay"
                  style={{ textDecoration: 'none' }}
                >
                  <p className="font-bold text-sm mb-1 group-hover:text-[#FF6B6B] transition-colors" style={{ color: 'var(--mb-text)' }}>
                    {rt.title}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--mb-text-muted)' }}>
                    Grade {rt.gradeLabel}
                  </p>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}