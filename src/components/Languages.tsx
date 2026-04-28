import { Section } from './Section';

interface LanguagesProps {
  items: string[];
}

export function Languages({ items }: LanguagesProps) {
  return (
    <Section id="languages" title="Languages" icon="languages">
      <ul className="languages">
        {items.map((language) => (
          <li key={language} className="languages__item">
            {language}
          </li>
        ))}
      </ul>
    </Section>
  );
}
