import { AppHero } from '../cmp/AppHero.jsx'
import { connect } from 'react-redux'
import { setExplore, setHome } from '../store/scss.action.js';
import { useEffect } from 'react'
function _Home({ isHome,setExplore,setHome }) {

  useEffect(() => {
    onSetHome();
    return () => {
    }
  }, [])
  const onSetHome = () => {
    if (isHome) return;
    setExplore(false);
    setHome(true);
  }

  return (
    <section className="home-page-container">
      <div className="sidebar"></div>
      <div className="homepage">
        <AppHero />
      </div>
    </section>
  )
}

function mapStateToProps({ scssModule }) {
  return {
    isHome: scssModule.isHome,
    isExplore: scssModule.isExplore
  }
}

const mapDispatchToProps = {
  setExplore,
  setHome
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);