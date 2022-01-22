import { connect } from 'react-redux'
import { setExplore, setHome, setDetails } from '../store/scss.action';
import { useEffect } from 'react'

import { AppHero } from '../cmp/AppHero'
import { HomeCategory } from '../cmp/HomeCategory'
import { HomePageInfo } from '../cmp/HomePageInfo'

function _Home({ isHome, setExplore, setHome }) {

  useEffect(() => {
    onSetHome();
    return () => {
    }
  }, [])
  const onSetHome = () => {
    if (isHome) return;
    setExplore(false);
    setHome(true);
    setDetails(false);
  }

  return (
    <section className="home-page-container">
      <div className="sidebar"></div>
      <div className="homepage">
        <AppHero />
        <HomeCategory />
        <HomePageInfo />
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
  setHome,
  setDetails
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);