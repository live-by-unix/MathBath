import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';

const GRADE_STYLES = {
  tk2:  { bg: 'linear-gradient(135deg, #A8E6CF 0%, #7DD9B5 100%)', text: '#1a5e42', glow: 'rgba(168,230,207,0.5)' },
  '35': { bg: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)', text: '#0d4f6e', glow: 'rgba(79,195,247,0.5)' },
  '68': { bg: 'linear-gradient(135deg, #FFD166 0%, #FFBE3D 100%)', text: '#6b4100', glow: 'rgba(255,209,102,0.5)' },
  '912':{ bg: 'linear-gradient(135deg, #FF6B6B 0%, #FF4D4D 100%)', text: '#6b0000', glow: 'rgba(255,107,107,0.5)' },
};

const SUBJECT_ACCENTS = {
  arithmetic:   '#FF6B6B',
  algebra:      '#4FC3F7',
  geometry:     '#A8E6CF',
  fractions:    '#FFD166',
  statistics:   '#C3A8E6',
  trigonometry: '#FF9A9E',
  calculus:     '#4FC3F7',
  precalculus:  '#A8E6CF',
};

export default function TopicCard({ topic, compact = false }) {
  const gradeStyle = GRADE_STYLES[topic.grade] || GRADE_STYLES['68'];
  const accent = SUBJECT_ACCENTS[topic.subject] || '#4FC3F7';

  return (
    <Link
      to={`/topic/${topic.id}`}
      className="clay-card clay-card-press group focus-visible-clay flex flex-col relative overflow-hidden"
      style={{ padding: compact ? '1.25rem 1.5rem' : '1.75rem 2rem', textDecoration: 'none', minHeight: compact ? 'auto' : '210px' }}
    >
      {/* Subtle accent glow top-right */}
      <div
        className="absolute -top-8 -right-8 w-28 h-28 rounded-full pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)`, filter: 'blur(20px)' }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-4 relative z-10">
        <div className="flex flex-wrap gap-2">
          {/* Grade badge */}
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold"
            style={{
              background: gradeStyle.bg,
              color: gradeStyle.text,
              boxShadow: `0 3px 10px ${gradeStyle.glow}`,
            }}
          >
            Grade {topic.gradeLabel}
          </span>
          {/* Subject badge */}
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize"
            style={{
              background: `${accent}20`,
              color: accent,
              border: `1px solid ${accent}35`,
            }}
          >
            {topic.subject}
          </span>
        </div>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-1"
          style={{ background: `${accent}22`, color: accent }}
        >
          <ArrowRight size={14} />
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-extrabold mb-2 leading-snug transition-colors duration-200 relative z-10"
        style={{ fontSize: compact ? '1rem' : '1.15rem', color: 'var(--mb-text)' }}
      >
        {topic.title}
      </h3>

      {/* Summary */}
      {!compact && (
        <p className="text-sm leading-relaxed mb-4 line-clamp-2 relative z-10 flex-1" style={{ color: 'var(--mb-text-muted)' }}>
          {topic.summary}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center gap-2 mt-auto pt-3 relative z-10" style={{ borderTop: `1px solid ${accent}25` }}>
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${accent}18` }}
        >
          <BookOpen size={11} style={{ color: accent }} />
        </div>
        <span className="text-xs font-bold" style={{ color: accent }}>
          {topic.steps.length} steps · {topic.exercises.length} exercises
        </span>
      </div>
    </Link>
  );
}