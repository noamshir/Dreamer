import { connect } from 'react-redux'
import { gigService } from '../services/gig.service'


function _HeroPopularCategory() {
    var popularCategories = gigService.getPopularCategories(4);
    return (
        <ul className="clean-list hero-popular-category">
            Popular:
            {popularCategories.map((category, idx) => {
                return (
                    <li key={idx}>
                        <button className="btn-popular-category">{category}</button>
                    </li>
                )
            })}
        </ul>
    )
}

function mapStateToProps(state) {
    return {
        categories: state.gigModule.categories
    }
}

const mapDispatchToProps = {}

export const HeroPopularCategory = connect(mapStateToProps, mapDispatchToProps)(_HeroPopularCategory)