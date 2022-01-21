
import { connect } from 'react-redux'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { gigService } from '../../services/gig.service.js';
function _AppSubHeader({ isHome }) {
    let sticky = "";
    let current = 0;
    let display = "block"
    if (isHome) {
        display = "none";
        sticky = "sticky"
    }
    // let displayRight = "none-right"
    const categories = gigService.getCategories();
    // const onRightClick = () => {
    //     console.log("clicked Right!");
    //     var length = categories.length;
    // }
    // const onLeftClick = () => {
    //     console.log("clicked Left!");
    // }
    return <header className={`sub-header ${sticky} ${display}`}>
        <nav className={`sub-header-content max-width-container equal-padding flex`}>
            {/* <button onClick={onLeftClick} className="btn-left"><ArrowBackIosIcon /></button>
            <button onClick={onRightClick} className={`btn-right ${displayRight} `}><ArrowForwardIosIcon /> </button> */}
            <ul className="categories flex clean-list">
                {categories && categories.map((categorie, idx) => {
                    var className;
                    if (idx >= 0 && idx < 5) className = `medium`;
                    else if (idx >= 5 && idx < 8) className = 'large';
                    return <li key={idx} className={className}><a className="clean-link categorie-nav" href="">{categorie}</a></li>
                })}
            </ul>
        </nav>
    </header>
}

function mapStateToProps({ scssModule }) {
    return {
        isHome: scssModule.isHome,
        isExplore: scssModule.isExplore
    }
}

export const AppSubHeader = connect(mapStateToProps)(_AppSubHeader);