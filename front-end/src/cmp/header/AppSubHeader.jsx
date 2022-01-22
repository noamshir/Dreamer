
import { connect } from 'react-redux'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { gigService } from '../../services/gig.service.js';
function _AppSubHeader({ isHome, isSearchBar }) {
    let sticky = "";
    let current = 0;
    let display = "block"
    if (isHome) {
        display = "none";
        sticky = "sticky"
        if (isSearchBar) {
            display = "block"
        }
    }
    const categories = gigService.getCategories();

    return <header className={`sub-header ${sticky} ${display}`}>
        <nav className={`sub-header-content max-width-container equal-padding flex`}>
            <ul className="categories flex clean-list">
                {categories && categories.map((categorie, idx) => {
                    var className;
                    if (idx >= 0 && idx < 5) className = `medium`;
                    else if (idx >= 5 && idx < 7) className = 'large';
                    return <li key={idx} className={className}><a className="clean-link categorie-nav" href="">{categorie}</a></li>
                })}
            </ul>
        </nav>
    </header>
}

function mapStateToProps({ scssModule }) {
    return {
        isHome: scssModule.isHome,
        isExplore: scssModule.isExplore,
        isSearchBar: scssModule.isSearchBar
    }
}

export const AppSubHeader = connect(mapStateToProps)(_AppSubHeader);