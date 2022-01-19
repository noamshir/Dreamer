const initialState = {
    gigs: [],
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
                ...state, gigs: state.gigs.map(gig => {
                    return gig._id === action.gig._id ? action.gig : gig
                })
            }
            break;
        case 'REMOVE_GIG':
            newState = { ...state, gigs: state.gigs.filter(gig => gig._id !== action.gigId) }
            break;
        default:
    }
    return newState;
}
