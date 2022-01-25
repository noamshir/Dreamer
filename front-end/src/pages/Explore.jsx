import React from "react";
import { connect } from 'react-redux'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { loadGigs, setSort, onSetFilterBy } from '../store/gig.action'
import { setHome, setExplore, setDetails, setBecomeSeller, setProfile } from '../store/scss.action.js';
import { GigList } from "../cmp/GigList";
import { Loader } from '../cmp/utils/Loader';


const theme = createTheme({
    components: {
        MuiSelect: {
            styleOverrides: {
                select: {
                    padding: ('8px 15px'),
                    borderRadius: '0px'
                },
            },
        },
    },
});


class _Explore extends React.Component {

    state = {
        isBudgetOpen: false,
        min: 0,
        max: Infinity
    }

    componentDidMount() {
        if (!this.props.location.search) {
            this.props.loadGigs({})
        }
        else {
            this.getFilteredGigs()
        }
        this.onSetExplore()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.filterBy !== this.props.filterBy || prevProps.location.search !== this.props.location.search) {
            this.getFilteredGigs()
        }
    }

    getFilteredGigs = () => {
        const { filterBy, sortBy } = this.props
        this.props.loadGigs(filterBy, sortBy)
    }

    toggleBudget = () => {
        var { isBudgetOpen } = this.state;
        isBudgetOpen = !isBudgetOpen;
        this.setState({ isBudgetOpen });
    }

    onSetExplore = () => {
        if (this.props.isExplore) return;
        this.props.setHome(false);
        this.props.setBecomeSeller(false);
        this.props.setDetails(false);
        this.props.setProfile(false);
        this.props.setExplore(true);
    }


    handleBudget = ({ target }) => {
        const field = target.name;
        const value = +target.value
        this.setState({ [field]: value })
    }

    onApplayBudget = () => {
        const { min, max } = this.state;
        const price = {
            min,
            max
        }
        const { filterBy } = this.props
        filterBy.price = price;
        this.props.onSetFilterBy({ ['price']: price }, 'price');
    }

    handleChange = ({ target }) => {
        const { filterBy } = this.props
        const value = target.value
        this.props.setSort(value)
        this.props.loadGigs(filterBy, value)
    }
    handleFilter = ({ target }) => {
        const field = target.name
        const value = target.value
        this.props.onSetFilterBy({ [field]: value }, field)
    }

    onGoToDetails = (gigId) => {
        this.props.history.push(`/explore/${gigId}`)
    }

    render() {
        const { gigs, filterBy, sortBy } = this.props
        if (!gigs) return <Loader />
        var budgetClass = (this.state.isBudgetOpen) ? "open" : "";
        return (
            <React.Fragment>
                {!gigs.length ? 'No Services Found For Your Search' :
                    <section className='explore'>
                        <section className="explore-main  max-width-container equal-padding">
                            {filterBy.category === 'all' ? <h1>All Categories</h1> : <h1>{filterBy.category}</h1>}
                            <div className="filter-container">
                                <div className="select-wrapper">
                                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                                        <ThemeProvider theme={theme}>
                                            <div className="filters-div flex">
                                                <Select
                                                    value={filterBy.deliveryTime}
                                                    name='deliveryTime'
                                                    onChange={this.handleFilter}
                                                    displayEmpty
                                                    className='delivery select'
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                >
                                                    <MenuItem value=''>
                                                        <em>Delivery Time</em>
                                                    </MenuItem>
                                                    <MenuItem value={1}>Express 24H</MenuItem>
                                                    <MenuItem value={3}>Up to 3 days</MenuItem>
                                                    <MenuItem value={7}>Up to 7 days</MenuItem>
                                                </Select>
                                                <div className="budget-div">
                                                    <div onClick={() => this.toggleBudget()} className="budget-select">
                                                        Budget <span className={budgetClass}>^</span>
                                                    </div>
                                                    <div className={`budget-content ${budgetClass}`}>
                                                        <div className="budget-filter">
                                                            <div className="price-filter flex">
                                                                <div className="input-wrapper flex column">
                                                                    <label htmlFor="min">Min:
                                                                    </label>
                                                                    <input type="text" name="min" onChange={this.handleBudget} placeholder="Any" />
                                                                </div>
                                                                <div className="input-wrapper flex column">
                                                                    <label htmlFor="max">Max.
                                                                    </label>
                                                                    <input type="text" name="max" onChange={this.handleBudget} placeholder="Any" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="budget-btns flex">
                                                            <button className="close-btn" onClick={() => this.toggleBudget()}>close</button>
                                                            <button className="btn" onClick={this.onApplayBudget}>Apply</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </ThemeProvider>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="inner-container">
                                <div className="services-count">{gigs.length} services available</div>
                                <div className="container">
                                    <span className='sort-label'>
                                        Sort by
                                    </span>
                                    <div className="select-wrapper">
                                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                                            <Select
                                                value={sortBy}
                                                name='sortBy'
                                                onChange={this.handleChange}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value="best selling">
                                                    <em>Best Selling</em>
                                                </MenuItem>
                                                <MenuItem value={'title'}>Title</MenuItem>
                                                <MenuItem value={'price'}>Price</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <GigList gigs={gigs} onGoToDetails={this.onGoToDetails} />
                        </section>
                    </section >
                }
            </React.Fragment>
        )
    }
}



function mapStateToProps(state) {
    return {
        gigs: state.gigModule.gigs,
        user: state.userModule.user,
        isHome: state.scssModule.isHome,
        isExplore: state.scssModule.isExplore,
        filterBy: state.gigModule.filterBy,
        sortBy: state.gigModule.sortBy
    }
}

const mapDispatchToProps = {
    loadGigs,
    setExplore,
    setHome,
    setDetails,
    setBecomeSeller,
    setProfile,
    onSetFilterBy,
    setSort
};


export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore)