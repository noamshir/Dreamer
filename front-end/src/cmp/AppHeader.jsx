

import MenuIcon from '@mui/icons-material/Menu';
import { SearchBar } from './SearchBar.jsx';
export function AppHeader() {

    return <section className="main-header sticky">
        <div id="Header">
            <header className="header-package dreamer-header header-transparent logged-out-homepage-header">
                <div className="header-row-wrapper">
                    <div className="header-row max-width-container equal-padding row-main flex">
                        <button className="btn-nav"><MenuIcon></MenuIcon></button>
                        <a href="" className="dreamer-logo clean-link">Dreamer</a>
                        <div className="dreamer-header-search-animated">
                            <SearchBar />
                        </div>
                        <nav className="dreamer-nav dreamer-nav-right flex">
                            <ul className="flex">
                                <li className="display-from-size-medium"><a href="" className="clean-link">Explore</a></li>
                                <li className="display-from-size-large"><a href="" className="clean-link">Become a Seller</a></li>
                                <li className="display-from-size-small"><a href="" className="clean-link">Sign in</a></li>
                                <li className="display-from-size-small"><a href="" className="clean-link join-a">Join</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

        </div>
    </section>

}