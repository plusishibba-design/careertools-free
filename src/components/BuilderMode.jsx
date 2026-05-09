import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../LanguageContext';
import ResumeDocument from './ResumeDocument';

const STORAGE_KEY = 'resumetools-data-v1';
const TEMPLATE_KEY = 'resumetools-template-v1';

const SAMPLE_RESUME = {
  personal: {
    name: 'Mai Nguyen',
    headline: 'Senior Product Designer',
    email: 'mai@example.com',
    phone: '+84 90 123 4567',
    location: 'Ho Chi Minh City',
    website: 'mainguyen.design',
    linkedin: 'linkedin.com/in/mainguyen',
  },
  summary:
    'Product designer with 8 years of experience leading end-to-end design for B2B SaaS and consumer fintech. Strong systems thinker who pairs editorial craft with rigorous UX research.',
  experiences: [
    {
      role: 'Senior Product Designer',
      company: 'Atlas Studio',
      location: 'Ho Chi Minh City',
      start: 'Jan 2022',
      end: 'Present',
      bullets:
        'Led the redesign of the core dashboard, reducing time-to-first-action by 38%.\nManaged a team of 3 designers and partnered with 12 engineers across 4 squads.\nDefined the design system that now serves 14 products across the company.',
    },
    {
      role: 'Product Designer',
      company: 'Lotus Bank',
      location: 'Ho Chi Minh City',
      start: 'Mar 2019',
      end: 'Dec 2021',
      bullets:
        'Designed the mobile onboarding flow that lifted activation by 22%.\nShipped the first Vietnamese-language banking app meeting WCAG AA contrast.\nResearched and documented 40+ user interviews across small-business owners.',
    },
    {
      role: 'UX Designer',
      company: 'Coral Agency',
      location: 'Hanoi',
      start: 'Jul 2017',
      end: 'Feb 2019',
      bullets:
        'Designed websites for 18 clients across hospitality, retail, and education.\nIntroduced a component-driven workflow that cut delivery time by 30%.',
    },
  ],
  educations: [
    {
      degree: 'B.A. Visual Communication',
      school: 'Hanoi University of Industrial Fine Arts',
      location: 'Hanoi',
      start: '2013',
      end: '2017',
    },
  ],
  skills:
    'Product Design, UX Research, Figma, Design Systems, Prototyping, Accessibility, Vietnamese, English',
  languages: [
    { name: 'Vietnamese', level: 'Native' },
    { name: 'English', level: 'Fluent' },
    { name: 'Japanese', level: 'B1' },
  ],
};

function loadResume() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return SAMPLE_RESUME;
}

function loadTemplate() {
  try {
    const t = localStorage.getItem(TEMPLATE_KEY);
    if (t === 'classic' || t === 'modern' || t === 'compact') return t;
  } catch {}
  return 'classic';
}

function BuilderMode() {
  const { t } = useLanguage();
  const [resume, setResume] = useState(loadResume);
  const [template, setTemplate] = useState(loadTemplate);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
  }, [resume]);

  useEffect(() => {
    localStorage.setItem(TEMPLATE_KEY, template);
  }, [template]);

  const handlePageCount = useCallback((n) => setPageCount(n), []);

  const updatePersonal = (key, value) => {
    setResume((r) => ({ ...r, personal: { ...r.personal, [key]: value } }));
  };

  const updateField = (key, value) => {
    setResume((r) => ({ ...r, [key]: value }));
  };

  const updateExperience = (i, key, value) => {
    setResume((r) => {
      const list = [...r.experiences];
      list[i] = { ...list[i], [key]: value };
      return { ...r, experiences: list };
    });
  };

  const addExperience = () => {
    setResume((r) => ({
      ...r,
      experiences: [
        ...r.experiences,
        { role: '', company: '', location: '', start: '', end: '', bullets: '' },
      ],
    }));
  };

  const removeExperience = (i) => {
    setResume((r) => ({
      ...r,
      experiences: r.experiences.filter((_, idx) => idx !== i),
    }));
  };

  const updateEducation = (i, key, value) => {
    setResume((r) => {
      const list = [...r.educations];
      list[i] = { ...list[i], [key]: value };
      return { ...r, educations: list };
    });
  };

  const addEducation = () => {
    setResume((r) => ({
      ...r,
      educations: [
        ...r.educations,
        { degree: '', school: '', location: '', start: '', end: '' },
      ],
    }));
  };

  const removeEducation = (i) => {
    setResume((r) => ({
      ...r,
      educations: r.educations.filter((_, idx) => idx !== i),
    }));
  };

  const updateLanguage = (i, key, value) => {
    setResume((r) => {
      const list = [...r.languages];
      list[i] = { ...list[i], [key]: value };
      return { ...r, languages: list };
    });
  };

  const addLanguage = () => {
    setResume((r) => ({
      ...r,
      languages: [...r.languages, { name: '', level: '' }],
    }));
  };

  const removeLanguage = (i) => {
    setResume((r) => ({
      ...r,
      languages: r.languages.filter((_, idx) => idx !== i),
    }));
  };

  const reset = () => {
    if (confirm('Reset to sample? Your current draft will be lost.')) {
      setResume(SAMPLE_RESUME);
    }
  };

  const print = () => {
    window.print();
  };

  return (
    <div className="builder-layout">
      {/* LEFT: form panel */}
      <div className="builder-form no-print" data-reveal>
        {/* Toolbar */}
        <div className="builder-toolbar">
          <div className="builder-template-picker">
            <span className="picker-label">{t('builder.templateLabel')}</span>
            <div className="picker-buttons">
              {['classic', 'modern', 'compact'].map((tmpl) => (
                <button
                  key={tmpl}
                  type="button"
                  className={`picker-btn ${template === tmpl ? 'is-active' : ''}`}
                  onClick={() => setTemplate(tmpl)}
                >
                  {t(`builder.template${tmpl[0].toUpperCase() + tmpl.slice(1)}`)}
                </button>
              ))}
            </div>
          </div>
          <div className="builder-actions">
            <button type="button" className="cta-ghost" onClick={reset}>
              {t('builder.resetBtn')}
            </button>
            <button type="button" className="cta-primary" onClick={print}>
              {t('builder.printBtn')}
            </button>
          </div>
        </div>
        <div className="builder-meta-row">
          <p className="saved-note">{t('builder.savedNote')}</p>
          <p className={`page-count-note ${pageCount > 1 ? 'is-overflow' : ''}`}>
            {pageCount === 1
              ? t('builder.pageCountSingle')
              : t('builder.pageCountMulti').replace('{0}', String(pageCount))}
          </p>
        </div>
        {pageCount > 1 && template !== 'compact' && (
          <p className="overflow-hint">
            {t('builder.overflowHint')}
          </p>
        )}

        {/* Personal */}
        <FieldSet title={t('builder.sectionPersonal')}>
          <div className="grid-2">
            <Field label={t('builder.fieldName')} value={resume.personal.name}
              onChange={(v) => updatePersonal('name', v)} />
            <Field label={t('builder.fieldHeadline')} value={resume.personal.headline}
              onChange={(v) => updatePersonal('headline', v)} />
            <Field label={t('builder.fieldEmail')} value={resume.personal.email}
              onChange={(v) => updatePersonal('email', v)} type="email" />
            <Field label={t('builder.fieldPhone')} value={resume.personal.phone}
              onChange={(v) => updatePersonal('phone', v)} />
            <Field label={t('builder.fieldLocation')} value={resume.personal.location}
              onChange={(v) => updatePersonal('location', v)} />
            <Field label={t('builder.fieldWebsite')} value={resume.personal.website}
              onChange={(v) => updatePersonal('website', v)} />
            <Field label={t('builder.fieldLinkedin')} value={resume.personal.linkedin}
              onChange={(v) => updatePersonal('linkedin', v)} />
          </div>
        </FieldSet>

        {/* Summary */}
        <FieldSet title={t('builder.sectionSummary')}>
          <Field label={t('builder.fieldSummary')} value={resume.summary}
            onChange={(v) => updateField('summary', v)} multiline rows={4} />
        </FieldSet>

        {/* Experience */}
        <FieldSet title={t('builder.sectionExperience')}>
          {resume.experiences.map((exp, i) => (
            <div key={i} className="repeat-block">
              <div className="grid-2">
                <Field label={t('builder.fieldRole')} value={exp.role}
                  onChange={(v) => updateExperience(i, 'role', v)} />
                <Field label={t('builder.fieldCompany')} value={exp.company}
                  onChange={(v) => updateExperience(i, 'company', v)} />
                <Field label={t('builder.fieldExpLocation')} value={exp.location}
                  onChange={(v) => updateExperience(i, 'location', v)} />
                <div />
                <Field label={t('builder.fieldStart')} value={exp.start}
                  onChange={(v) => updateExperience(i, 'start', v)} />
                <Field label={t('builder.fieldEnd')} value={exp.end}
                  onChange={(v) => updateExperience(i, 'end', v)} />
              </div>
              <Field label={t('builder.fieldBullets')} value={exp.bullets}
                onChange={(v) => updateExperience(i, 'bullets', v)} multiline rows={4} />
              <button type="button" className="remove-btn" onClick={() => removeExperience(i)}>
                {t('builder.removeExperience')}
              </button>
            </div>
          ))}
          <button type="button" className="add-btn" onClick={addExperience}>
            {t('builder.addExperience')}
          </button>
        </FieldSet>

        {/* Education */}
        <FieldSet title={t('builder.sectionEducation')}>
          {resume.educations.map((edu, i) => (
            <div key={i} className="repeat-block">
              <div className="grid-2">
                <Field label={t('builder.fieldDegree')} value={edu.degree}
                  onChange={(v) => updateEducation(i, 'degree', v)} />
                <Field label={t('builder.fieldSchool')} value={edu.school}
                  onChange={(v) => updateEducation(i, 'school', v)} />
                <Field label={t('builder.fieldEduLocation')} value={edu.location}
                  onChange={(v) => updateEducation(i, 'location', v)} />
                <div />
                <Field label={t('builder.fieldEduStart')} value={edu.start}
                  onChange={(v) => updateEducation(i, 'start', v)} />
                <Field label={t('builder.fieldEduEnd')} value={edu.end}
                  onChange={(v) => updateEducation(i, 'end', v)} />
              </div>
              <button type="button" className="remove-btn" onClick={() => removeEducation(i)}>
                {t('builder.removeExperience')}
              </button>
            </div>
          ))}
          <button type="button" className="add-btn" onClick={addEducation}>
            {t('builder.addEducation')}
          </button>
        </FieldSet>

        {/* Skills */}
        <FieldSet title={t('builder.sectionSkills')}>
          <Field label={t('builder.fieldSkills')} value={resume.skills}
            onChange={(v) => updateField('skills', v)} multiline rows={2} />
        </FieldSet>

        {/* Languages */}
        <FieldSet title={t('builder.sectionLanguages')}>
          {resume.languages.map((lang, i) => (
            <div key={i} className="repeat-block">
              <div className="grid-2">
                <Field label={t('builder.fieldLangName')} value={lang.name}
                  onChange={(v) => updateLanguage(i, 'name', v)} />
                <Field label={t('builder.fieldLangLevel')} value={lang.level}
                  onChange={(v) => updateLanguage(i, 'level', v)} />
              </div>
              <button type="button" className="remove-btn" onClick={() => removeLanguage(i)}>
                {t('builder.removeExperience')}
              </button>
            </div>
          ))}
          <button type="button" className="add-btn" onClick={addLanguage}>
            {t('builder.addLanguage')}
          </button>
        </FieldSet>
      </div>

      {/* RIGHT: live preview */}
      <div className="builder-preview-wrap">
        <div className="builder-preview-inner" data-page-count={pageCount}>
          <ResumeDocument
            resume={resume}
            template={template}
            t={t}
            onPageCount={handlePageCount}
          />
        </div>
      </div>
    </div>
  );
}

function FieldSet({ title, children }) {
  return (
    <fieldset className="builder-fieldset">
      <legend>{title}</legend>
      {children}
    </fieldset>
  );
}

function Field({ label, value, onChange, multiline, rows = 2, type = 'text' }) {
  return (
    <div className="builder-field">
      <label>{label}</label>
      {multiline ? (
        <textarea
          value={value}
          rows={rows}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

export default BuilderMode;
