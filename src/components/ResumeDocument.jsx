import React, { useEffect, useRef, useState } from 'react';

// A4 dimensions
const A4_HEIGHT_MM = 297;
// 1mm at 96dpi ≈ 3.7795px (CSS px)
const MM_TO_PX = 3.7795;

// ResumeDocument renders the actual resume in a printable A4 layout.
// `template` controls visual style: 'classic' | 'modern' | 'compact'
// `onPageCount` is called whenever the rendered height changes.

function ResumeDocument({ resume, template, t, onPageCount }) {
  const docRef = useRef(null);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    if (!docRef.current) return;
    const el = docRef.current;
    const a4PxFromMM = A4_HEIGHT_MM * MM_TO_PX;

    const measure = () => {
      const h = el.scrollHeight;
      const n = Math.max(1, Math.ceil((h - 1) / a4PxFromMM));
      setPages(n);
      onPageCount?.(n);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [resume, template, onPageCount]);

  const skillList = (resume.skills || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="resume-doc-wrapper">
      <article
        ref={docRef}
        className={`resume-doc resume-${template}`}
        aria-label="Resume preview"
      >
        {/* Header */}
        <header className="resume-header">
          <h1 className="resume-name">{resume.personal.name || ' '}</h1>
          {resume.personal.headline && (
            <p className="resume-headline">{resume.personal.headline}</p>
          )}
          <ul className="resume-contact">
            {resume.personal.email && <li>{resume.personal.email}</li>}
            {resume.personal.phone && <li>{resume.personal.phone}</li>}
            {resume.personal.location && <li>{resume.personal.location}</li>}
            {resume.personal.website && <li>{resume.personal.website}</li>}
            {resume.personal.linkedin && <li>{resume.personal.linkedin}</li>}
          </ul>
        </header>

        {/* Summary */}
        {resume.summary && (
          <section className="resume-section">
            <h2>{t('preview.summary')}</h2>
            <p className="resume-summary">{resume.summary}</p>
          </section>
        )}

        {/* Experience */}
        {resume.experiences && resume.experiences.length > 0 && (
          <section className="resume-section">
            <h2>{t('preview.experience')}</h2>
            {resume.experiences.map((exp, i) => (
              <div className="resume-entry" key={i}>
                <div className="resume-entry-row">
                  <div>
                    <h3 className="resume-entry-title">{exp.role}</h3>
                    <p className="resume-entry-meta">
                      {[exp.company, exp.location].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                  <p className="resume-entry-dates">
                    {[exp.start, exp.end].filter(Boolean).join(' — ')}
                  </p>
                </div>
                {exp.bullets && (
                  <ul className="resume-bullets">
                    {exp.bullets.split('\n').filter(Boolean).map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {resume.educations && resume.educations.length > 0 && (
          <section className="resume-section">
            <h2>{t('preview.education')}</h2>
            {resume.educations.map((edu, i) => (
              <div className="resume-entry" key={i}>
                <div className="resume-entry-row">
                  <div>
                    <h3 className="resume-entry-title">{edu.degree}</h3>
                    <p className="resume-entry-meta">
                      {[edu.school, edu.location].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                  <p className="resume-entry-dates">
                    {[edu.start, edu.end].filter(Boolean).join(' — ')}
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skillList.length > 0 && (
          <section className="resume-section">
            <h2>{t('preview.skills')}</h2>
            <p className="resume-skills">{skillList.join(' · ')}</p>
          </section>
        )}

        {/* Languages */}
        {resume.languages && resume.languages.length > 0 && (
          <section className="resume-section">
            <h2>{t('preview.languages')}</h2>
            <ul className="resume-languages">
              {resume.languages.map((lang, i) => (
                <li key={i}>
                  <strong>{lang.name}</strong>
                  {lang.level && <span> — {lang.level}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      {/* Page break visualizer — one dashed line per A4 boundary when content overflows */}
      {pages > 1 &&
        Array.from({ length: pages - 1 }, (_, i) => (
          <div
            key={i}
            className="resume-page-break-line"
            style={{ top: `${A4_HEIGHT_MM * (i + 1)}mm` }}
            aria-hidden="true"
          >
            <span className="page-break-label">Page {i + 2}</span>
          </div>
        ))}
    </div>
  );
}

export default ResumeDocument;
