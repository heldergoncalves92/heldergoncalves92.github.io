import type { Award } from '../types';
import { Section } from './Section';

interface LeadershipAwardsProps {
  items: Award[];
}

export function LeadershipAwards({ items }: LeadershipAwardsProps) {
  return (
    <Section id="awards" title="Leadership & Awards" icon="star">
      <ul className="awards">
        {items.map((award) => (
          <li key={`${award.title}-${award.year}`} className="awards__item">
            <div className="awards__title">
              {award.title} <em>· {award.context}</em>
            </div>
            <div className="awards__year">{award.year}</div>
            {award.description && <div className="awards__desc">{award.description}</div>}
          </li>
        ))}
      </ul>
    </Section>
  );
}
