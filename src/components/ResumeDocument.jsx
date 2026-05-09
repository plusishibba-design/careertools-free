import React from 'react';

// ResumeDocument renders the actual resume in a printable A4 layout.
// `template` controls visual style: 'classic' | 'modern' | 'compact'

function ResumeDocument({ resume, template, t }) {
  const skillList = (resume.skills || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <article className={`resume-doc resume-${template}`} aria-label="Resume preview">
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
  );
}

export default ResumeDocument;
