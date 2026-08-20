import { Icon } from './Icon';
import { ThemeToggle } from './ThemeToggle';

const LINKS = [
  { href: '#profile', label: 'Profile' },
  { href: '#experience', label: 'Experience' },
  { href: '#side-projects', label: 'Side Projects' },
  { href: '#education', label: 'Education' },
  { href: '#awards', label: 'Awards' },
];

const CV_HREF = '/helder-goncalves-cv.pdf';
const CV_DOWNLOAD = 'helder-goncalves-cv.pdf';

export function Nav() {
  return (
    <nav className="nav" aria-label="Section navigation">
      <div className="container nav__inner">
        <a href="#top" className="nav__brand">HG.</a>
        <div className="nav__links">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <a
          className="nav__cv"
          href={CV_HREF}
          download={CV_DOWNLOAD}
          aria-label="Download CV (PDF)"
        >
          <Icon name="download" />
          <span>
            <span className="nav__cv-verb">Download </span>CV
          </span>
        </a>
        <ThemeToggle />
      </div>
    </nav>
  );
}
