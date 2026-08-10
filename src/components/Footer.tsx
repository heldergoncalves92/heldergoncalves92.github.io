import { cv } from '../data/cv';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          © {new Date().getFullYear()}{' '}
          <a href="/">{cv.profile.name}</a> ·{' '}
          <a href="https://github.com/helderjgoncalves" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>{' '}
          ·{' '}
          <a href="https://linkedin.com/in/helderjgoncalves" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </p>
      </div>
    </footer>
  );
}
