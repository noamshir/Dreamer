import { connect } from 'react-redux'

function _HeroPopularCategory({ categories }) {
    var popularCategories = categories.slice(0, 4);

    popularCategories = popularCategories.map(category => {
        return `${category.charAt(0).toUpperCase()}${category.slice(1)}`
    })
    return (
        <ul className="clean-list hero-popular-category">
            {popularCategories.map(category => {
                <li>{category}</li>
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