import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { TOPICS, GRADE_BANDS, SUBJECTS } from '../data/topics';

// Fuzzy search — no external library needed
function fuzzyScore(text, query) {
  const t = text.toLowerCase();
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  if (t.includes(q)) return 100;

  // Check word starts
  const words = t.split(/\s+/);
  if (words.some(w => w.startsWith(q))) return 80;

  // Check tag matches
  let score = 0;
  for (let i = 0, j = 0; i < t.length && j < q.length; i++) {
    if (t[i] === q[j]) { score += 10; j++; }
  }
  return score;
}

function searchTopics(query) {
  if (!query.trim()) return [];

  return TOPICS
    .map(topic => {
      const titleScore = fuzzyScore(topic.title, query) * 2;
      const tagScore = topic.tags.reduce((best, tag) => Math.max(best, fuzzyScore(tag, query)), 0);
      const subjectScore = fuzzyScore(topic.subject, query);
      const summaryScore = fuzzyScore(topic.summary, query) * 0.5;
      const totalScore = titleScore + tagScore + subjectScore + summaryScore;
      return { ...topic, score: totalScore };
    })
    .filter(t => t.score > 20)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

const GRADE_COLORS = { tk2: '#A8E6CF', '35': '#4FC3F7', '68': '#FFD166', '912': '#FF6B6B' };

export default function SearchBar({ large = false }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 0) {
      setResults(searchTopics(query));
      setOpen(true);
    } else {
      setResults([]);
      setOpen(false);
    }
  }, [query]);

  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleSelect(topic) {
    navigate(`/topic/${topic.id}`);
    setQuery('');
    setOpen(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur(); }
  }

  return (
    <div ref={containerRef} className={`relative ${large ? 'w-full max-w-2xl mx-auto' : 'w-full max-w-sm'}`}>
      {/* Search input */}
      <div
        className="search-glow flex items-center gap-3 rounded-full px-5"
        style={{
          background: 'var(--mb-surface)',
          height: large ? '64px' : '48px',
          border: `2px solid ${focused ? '#4FC3F7' : 'var(--mb-border)'}`,
          transition: 'border-color 300ms ease',
        }}
      >
        <Search
          size={large ? 22 : 18}
          style={{ color: focused ? '#4FC3F7' : 'var(--mb-text-muted)', flexShrink: 0, transition: 'color 300ms ease' }}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => { setFocused(true); if (query) setOpen(true); }}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={large ? 'Search any math topic… fractions, quadratics, derivatives…' : 'Search topics…'}
          className="flex-1 bg-transparent border-none outline-none font-body placeholder:opacity-50"
          style={{
            fontSize: large ? '1.1rem' : '0.95rem',
            color: 'var(--mb-text)',
          }}
          aria-label="Search math topics"
          autoComplete="off"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setOpen(false); }}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Results cloud */}
      {open && results.length > 0 && (
        <div
          className="absolute left-0 right-0 mt-3 rounded-3xl overflow-hidden z-50"
          style={{
            background: 'var(--mb-surface)',
            boxShadow: 'var(--clay-shadow-lg)',
            border: '1px solid var(--mb-border)',
          }}
        >
          {results.map((topic, i) => (
            <button
              key={topic.id}
              onClick={() => handleSelect(topic)}
              className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-muted transition-colors group focus-visible-clay"
              style={{ borderBottom: i < results.length - 1 ? '1px solid var(--mb-border)' : 'none' }}
            >
              <div
                className="w-8 h-8 rounded-2xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ background: GRADE_COLORS[topic.grade] || '#4FC3F7' }}
              >
                {topic.gradeLabel.replace('TK–', 'K')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate" style={{ color: 'var(--mb-text)' }}>
                  {topic.title}
                </p>
                <p className="text-xs truncate" style={{ color: 'var(--mb-text-muted)' }}>
                  {topic.summary}
                </p>
              </div>
              <ArrowRight
                size={14}
                className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                style={{ color: '#FF6B6B' }}
              />
            </button>
          ))}
          {/* Browse all link */}
          <button
            onClick={() => { navigate(`/browse?q=${encodeURIComponent(query)}`); setQuery(''); setOpen(false); }}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted"
            style={{ color: '#4FC3F7', borderTop: '1px solid var(--mb-border)' }}
          >
            <Search size={14} />
            See all results for "{query}"
          </button>
        </div>
      )}

      {/* No results */}
      {open && query.length > 1 && results.length === 0 && (
        <div
          className="absolute left-0 right-0 mt-3 rounded-3xl px-5 py-5 text-center z-50"
          style={{ background: 'var(--mb-surface)', boxShadow: 'var(--clay-shadow-md)', border: '1px solid var(--mb-border)' }}
        >
          <p className="text-sm font-semibold" style={{ color: 'var(--mb-text)' }}>No topics found for "{query}"</p>
          <p className="text-xs mt-1" style={{ color: 'var(--mb-text-muted)' }}>Try: "fractions", "quadratic", "slope"</p>
        </div>
      )}
    </div>
  );
}