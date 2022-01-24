import { connect } from 'react-redux'
import { setExplore, setHome, setDetails,setBecomeSeller } from '../store/scss.action';
import { useEffect } from 'react'

import { AppHero } from '../cmp/AppHero'
import { HomeCategory } from '../cmp/HomeCategory'
import { HomePageInfo } from '../cmp/HomePageInfo'
import { HomeReviews } from '../cmp/HomeReviews';

function _Home({ isHome, setExplore, setHome }) {

  useEffect(() => {
    onSetHome();
    return () => {
    }
  })
  const onSetHome = () => {
    if (isHome) return;
    setExplore(false);
    setHome(true);
    setDetails(false);
    setBecomeSeller(false);
  }

  return (
    <section className="home-page-container">
      <div className="homepage">
        <AppHero />
        <HomeCategory />
        <HomePageInfo />
        <HomeReviews />
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
  setDetails,
  setBecomeSeller
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);