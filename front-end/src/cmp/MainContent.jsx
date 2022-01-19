import { AppHero } from '../cmp/AppHero.jsx'

export function MainContent() {
     return <section className="main-content">

          <div className="sidebar"></div>
          <div className="homepage">
               <AppHero />
          </div>
     </section>
}