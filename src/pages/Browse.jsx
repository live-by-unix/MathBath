import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import TopicCard from '../components/TopicCard';
import SearchBar from '../components/SearchBar';
import { TOPICS, SUBJECTS, GRADE_BANDS } from '../data/topics';

function fuzzyScore(text, query) {
  const t = text.toLowerCase();
  const q = query.toLowerCase().trim();
  if (!q) return 100;
  if (t.includes(q)) return 100;
  const words = t.split(/\s+/);
  if (words.some(w => w.startsWith(q))) return 80;
  let score = 0;
  for (let i = 0, j = 0; i < t.length && j < q.length; i++) {
    if (t[i] === q[j]) { score += 5; j++; }
  }
  return score;
}

const GRADE_COLORS = { tk2: '#A8E6CF', '35': '#4FC3F7', '68': '#FFD166', '912': '#FF6B6B' };
const SUBJECT_COLORS = {
  arithmetic: '#FF6B6B', algebra: '#4FC3F7', geometry: '#A8E6CF',
  fractions: '#FFD166', statistics: '#C3A8E6', trigonometry: '#FF9A9E',
  calculus: '#4FC3F7', precalculus: '#A8E6CF',
};

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [gradeFilter, setGradeFilter] = useState(searchParams.get('grade') || '');
  const [subjectFilter, setSubjectFilter] = useState(searchParams.get('subject') || '');
  const [query, setQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    setGradeFilter(searchParams.get('grade') || '');
    setSubjectFilter(searchParams.get('subject') || '');
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const filtered = useMemo(() => {
    return TOPICS
      .map(topic => {
        const titleScore = fuzzyScore(topic.title, query) * 2;
        const tagScore = topic.tags.reduce((best, tag) => Math.max(best, fuzzyScore(tag, query)), 0);
        const subjectScore = fuzzyScore(topic.subject, query);
        const summaryScore = fuzzyScore(topic.summary, query) * 0.5;
        const total = query ? titleScore + tagScore + subjectScore + summaryScore : 100;
        return { ...topic, _score: total };
      })
      .filter(t => {
        if (query && t._score < 20) return false;
        if (gradeFilter && t.grade !== gradeFilter) return false;
        if (subjectFilter && t.subject !== subjectFilter) return false;
        return true;
      })
      .sort((a, b) => b._score - a._score);
  }, [query, gradeFilter, subjectFilter]);

  function clearAll() {
    setQuery('');
    setGradeFilter('');
    setSubjectFilter('');
    setSearchParams({});
  }

  const hasFilters = query || gradeFilter || subjectFilter;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6" style={{ background: 'var(--mb-bg)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black mb-3" style={{ color: 'var(--mb-text)' }}>
            Browse Topics
          </h1>
          <p className="text-lg mb-8" style={{ color: 'var(--mb-text-muted)' }}>
            {filtered.length} topic{filtered.length !== 1 ? 's' : ''} — filter by grade, subject, or search
          </p>
          <SearchBar large />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {/* Grade filter pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--mb-text-muted)' }}>Grade:</span>
            {GRADE_BANDS.map(band => (
              <button
                key={band.id}
                onClick={() => setGradeFilter(gradeFilter === band.id ? '' : band.id)}
                className="px-4 py-1.5 rounded-full text-xs font-bold transition-all pill-btn focus-visible-clay"
                style={{
                  background: gradeFilter === band.id ? band.color : 'var(--mb-surface)',
                  color: gradeFilter === band.id ? '#fff' : 'var(--mb-text-muted)',
                  border: `1.5px solid ${gradeFilter === band.id ? band.color : 'var(--mb-border)'}`,
                }}
              >
                {band.label}
              </button>
            ))}
          </div>

          {/* Subject filter pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--mb-text-muted)' }}>Subject:</span>
            {SUBJECTS.map(subj => (
              <button
                key={subj.id}
                onClick={() => setSubjectFilter(subjectFilter === subj.id ? '' : subj.id)}
                className="px-4 py-1.5 rounded-full text-xs font-bold transition-all pill-btn focus-visible-clay capitalize"
                style={{
                  background: subjectFilter === subj.id ? SUBJECT_COLORS[subj.id] || subj.color : 'var(--mb-surface)',
                  color: subjectFilter === subj.id ? '#fff' : 'var(--mb-text-muted)',
                  border: `1.5px solid ${subjectFilter === subj.id ? (SUBJECT_COLORS[subj.id] || subj.color) : 'var(--mb-border)'}`,
                }}
              >
                {subj.emoji} {subj.label}
              </button>
            ))}
          </div>

          {/* Clear all */}
          {hasFilters && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all pill-btn focus-visible-clay"
              style={{
                background: 'rgba(255,107,107,0.12)',
                color: '#FF6B6B',
                border: '1.5px solid rgba(255,107,107,0.3)',
              }}
            >
              <X size={12} /> Clear all
            </button>
          )}
        </div>

        {/* Results grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((topic, i) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.4), ease: [0.34, 1.56, 0.64, 1] }}
              >
                <TopicCard topic={topic} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div
            className="clay-card text-center py-16 px-8"
          >
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--mb-text)' }}>No topics match your filters</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--mb-text-muted)' }}>
              Try adjusting the grade or subject filters, or clear your search.
            </p>
            <button
              onClick={clearAll}
              className="px-6 py-3 rounded-full text-sm font-bold text-white pill-btn focus-visible-clay"
              style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD166 100%)' }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}