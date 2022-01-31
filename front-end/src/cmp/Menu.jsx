import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { toggleJoinModal, toggleSignInModal } from "../store/scss.action";
import { UserProfileImg } from "./profile/UserProfileImg";
import { useState, useEffect } from 'react';
import { gigService } from "../services/gig.service";
import { clearFilters, onSetFilterBy } from "../store/gig.action";

function _Menu({ user, closeMenu, toggleJoinModal, toggleSignInModal, menuOpen, clearFilters, onSetFilterBy, setNotificationMenu }) {
    const [isCategoriesOpen, setAccordion] = useState(false)
    const [categories, setCategories] = useState([])
    useEffect(async () => {
        const val = await gigService.getCategories();
        setCategories(val);
    }, [])
    const openJoin = () => {
        closeMenu();
        toggleJoinModal(true);
    }
    const openSignIn = () => {
        closeMenu();
        toggleSignInModal(true);
    }
    const toggleCategories = () => {
        var temp = isCategoriesOpen;
        setAccordion(!temp);
    }
    const setFilter = (category) => {
        onSetFilterBy({ category }, 'category');
        closeMenu();
        setAccordion(false);
    }
    const classname = (menuOpen) ? "open" : "";
    const categoriesClass = (isCategoriesOpen) ? "open" : "close";
    return <section className={`side-Bar ${classname}`}>
        <div className="side-bar-content">
            <header className="menu-header">
                {!user && <button className="btn" onClick={() => openJoin()} >Join Dimerr</button>}
                {user && <div className="user-content flex">
                    <UserProfileImg closeMenu={() => closeMenu()} user={user} isLink={true} />
                    <h5>{user.username}</h5>
                </div>}
            </header>

            <nav className="menu-nav">
                <ul className="clean-list">
                    {!user && <li onClick={() => openSignIn()} className="menu-item sign">Sign in</li>}
                    <li className="menu-item"><NavLink onClick={() => closeMenu()} className="clean-link" to="/">Home</NavLink></li>
                    <li className="menu-item"><NavLink onClick={() => {
                        closeMenu()
                        clearFilters()
                    }} className="clean-link" to="/explore">Explore</NavLink></li>
                    {!user?.sellerInfo && <li className="menu-item"><NavLink onClick={() => closeMenu()} className="clean-link" to="/becomeSeller">Become a Seller</NavLink></li>}
                    {user && <li className="menu-item notification">
                        <div className="notification-link-wrapper">
                            {user?.notifications?.length && <div className='notification-dot'></div>}
                            <div onClick={() => { closeMenu(); setNotificationMenu(user) }}>Notifications</div>
                        </div>
                    </li>}
                    <li className="menu-item category-item">
                        <article className={`categories-item ${categoriesClass}`}>
                            <div onClick={toggleCategories} className="accordion-title">Categories</div>
                            <div className={`categories-content ${categoriesClass}`}>
                                <ul className="clean-list">
                                    {categories && categories.map((category) => {
                                        return <li key={category}
                                            onClick={() => { setFilter(category) }}>
                                            <NavLink className="clean-link" to={`/explore?category=${category}`}> {category}</NavLink>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </article>
                    </li>
                </ul>
            </nav>
        </div>
    </section>
}


function mapStateToProps({ userModule }) {
    return {
        user: userModule.user
    }
}
const mapDispatchToProps = {
    toggleJoinModal,
    toggleSignInModal,
    onSetFilterBy,
    clearFilters
}

export const Menu = connect(mapStateToProps, mapDispatchToProps)(_Menu)