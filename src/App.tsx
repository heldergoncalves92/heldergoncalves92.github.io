import { cv } from './data/cv';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Profile } from './components/Profile';
import { WorkExperience } from './components/WorkExperience';
import { Internships } from './components/Internships';
import { Education } from './components/Education';
import { SideProjects } from './components/SideProjects';
import { Languages } from './components/Languages';
import { Certifications } from './components/Certifications';
import { LeadershipAwards } from './components/LeadershipAwards';

export default function App() {
  return (
    <>
      <Nav />
      <Hero profile={cv.profile} />

      <main>
        <Profile profile={cv.profile} />
        <WorkExperience data={cv.work} />
        <Internships items={cv.internships} />
        <SideProjects items={cv.sideProjects} />
        <Education data={cv.education} />
        <Languages items={cv.languages} />
        <Certifications items={cv.certifications} />
        <LeadershipAwards items={cv.awards} />
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            © {new Date().getFullYear()} {cv.profile.name} ·{' '}
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
    </>
  );
}
