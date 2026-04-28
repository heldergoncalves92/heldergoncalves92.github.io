import type { EducationEntry } from '../types';
import { Section } from './Section';

interface EducationProps {
  data: EducationEntry;
}

export function Education({ data }: EducationProps) {
  return (
    <Section id="education" title="Education" icon="graduationCap">
      <div className="timeline">
        <div className="timeline__item">
          <div className="entry">
            <div className="entry__head">
              <div>
                <div className="entry__title">{data.degree}</div>
                <div className="entry__org">{data.institution}</div>
              </div>
              <div className="entry__period">{data.period}</div>
            </div>
            <p className="entry__paragraph">
              <strong>Relevant coursework:</strong> {data.coursework}
            </p>
            {data.thesis && (
              <p className="entry__paragraph">
                <strong>MSc thesis:</strong> &ldquo;{data.thesis.title}&rdquo;
                {data.thesis.advisors && ` (advisors: ${data.thesis.advisors})`}
              </p>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
