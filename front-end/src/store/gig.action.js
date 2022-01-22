import { gigService } from "../services/gig.service.js";




export function loadGigs(filterBy) {
    return async (dispatch) => {
        const gigs = await gigService.query(filterBy)
        const action = { type: 'SET_GIGS', gigs };
        dispatch(action)
    }
}

export function add(gig) {
    return async (dispatch) => {
        const savedGig = await gigService.save(gig)
        let action
        if (gig._id) action = { type: 'UPDATE_GIG', gig: savedGig };
        else action = { type: 'ADD_GIG', gig: savedGig }
        dispatch(action)
        return Promise.resolve(savedGig)
    }
}
export function onSetFilterBy(filterBy, field) {
    return (dispatch) => {
        let action
        if (field) action = { type: 'SET_FILTERBY_FIELD', filterBy: { field, filterBy } }
        else action = { type: 'SET_FILTERBY', filterBy }
        dispatch(action)
        return Promise.resolve();
    }
}

export function remove(gigId) {
    return async (dispatch) => {
        await gigService.remove(gigId)
        const action = { type: 'REMOVE_GIG', gigId }
        dispatch(action)
    }
}

export function setLikedGig(gig, user) {
    return async (dispatch) => {
        console.log("got here")
        const savedGig = await gigService.toggleLike(gig._id, user)
        console.log('saved-gig', savedGig);
        dispatch({ type: 'UPDATE_GIG', gig: savedGig })
    }
}
