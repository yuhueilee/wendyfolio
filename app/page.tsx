import About from '../components/about'
import Contact from '../components/contact'
import Experience from '../components/experience'
import Header from '../components/header'
import Hero from '../components/hero'
import Work from '../components/work'
import { getSiteProfile } from '../lib/site-profile'

export default function Home() {
  const profile = getSiteProfile()

  return (
    <div className="min-h-screen overflow-x-hidden bg-mist font-sans text-ink">
      <Header wordmark={profile.preferredName} resumeHref={profile.resumeHref} />
      <Hero
        name={profile.name}
        introduction={profile.heroIntroduction}
        resumeHref={profile.resumeHref}
      />
      <About
        name={profile.name}
        introduction={profile.aboutIntroduction}
        profileImage={profile.profileImage}
      />
      <Experience jobs={profile.jobs} />
      <Work projects={profile.projects} />
      <Contact
        email={profile.email}
        githubHref={profile.githubHref}
        linkedinHref={profile.linkedinHref}
        name={profile.name}
        year={profile.year}
      />
    </div>
  )
}
