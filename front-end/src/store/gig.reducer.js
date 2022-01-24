const initialState = {
    gigs: null,
    filterBy: {
        txt: '',
        category: '',
        username: '',
    }
}

export function gigReducer(state = initialState, action) {

    let newState = state;

    switch (action.type) {
        case 'SET_GIGS':
            newState = { ...state, gigs: [...action.gigs] }
            break;
        case 'ADD_GIG':
            newState = { ...state, gigs: [...state.gigs, action.gig] }
            break;
        case 'UPDATE_GIG':
            newState = {
                ...state, gigs: state.gigs.map(gig => gig._id === action.gig._id ? action.gig : gig)
            }
            break;
        case 'REMOVE_GIG':
            newState = { ...state, gigs: state.gigs.filter(gig => gig._id !== action.gigId) }
            break;
        case 'SET_FILTERBY':
            newState = { ...state, filterBy: { ...action.filterBy } }
            break;
        case 'SET_FILTERBY_FIELD':
            newState = { ...state, filterBy: { ...state.filterBy, [action.filterBy.field]: action.filterBy.value } }
            break;
        default:
    }
    return newState;
}
