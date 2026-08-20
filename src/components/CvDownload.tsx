import { Icon } from './Icon';

// The filename is part of the saved download URL, so it stays stable across
// revisions of the PDF itself. See AGENTS.md.
const CV_HREF = '/helder-goncalves-cv.pdf';
const CV_FILENAME = 'helder-goncalves-cv.pdf';

// Shared by both navs so the two pages can't drift apart on the href, the
// download filename or the accessible name.
export function CvDownload() {
  return (
    <a
      className="nav__cv"
      href={CV_HREF}
      download={CV_FILENAME}
      aria-label="Download CV (PDF)"
    >
      <Icon name="download" />
      <span>
        <span className="nav__cv-verb">Download </span>CV
      </span>
    </a>
  );
}
