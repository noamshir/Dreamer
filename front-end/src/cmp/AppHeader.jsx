

import MenuIcon from '@mui/icons-material/Menu';

export function AppHeader() {

    return <section className="main-header sticky">
        <div id="Header">
            <header className="header-package dreamer-header header-transparent logged-out-homepage-header">
                <div className="header-row-wrapper">
                    <div className="header-row max-width-container equal-padding row-main flex">
                        <button className="btn-nav"><MenuIcon></MenuIcon></button>
                        <a href="" className="dreamer-logo clean-link">Dreamer</a>
                        <div className="dreamer-header-search-animated"> </div>
                        <nav className="dreamer-nav dreamer-nav-right flex">
                            <ul className="flex">
                                <li className="display-from-size"><a href="" className="clean-link">1</a></li>
                                <li className="display-from-size"><a href="" className="clean-link">2</a></li>
                                <li className="display-from-size"><a href="" className="clean-link">3</a></li>
                                <li className="display-from-size"><a href="" className="clean-link">4</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

        </div>
    </section>

}