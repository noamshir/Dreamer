

export function AppHeader() {

    return <section className="main-header sticky">
        <div className="Header">
            <header className="header-package dreamer-header header-transparent logged-out-homepage-header">
                <div className="header-row-wrapper">
                    <div className="header-row max-width-container equal-padding row-main flex">
                        <button className="btn-nav">Nav</button>
                        <a href="" className="dreamer-logo"></a>
                        <div className="dreamer-header-search-animated"> </div>
                        <nav className="dreamer-nav dreamer-nav-right flex">
                            <ul className="flex">
                                <li className="display-from-size"><a href="">1</a></li>
                                <li className="display-from-size"><a href="">2</a></li>
                                <li className="display-from-size"><a href="">3</a></li>
                                <li className="display-from-size"><a href="">4</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

        </div>
    </section>

}