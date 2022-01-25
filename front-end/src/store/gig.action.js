import { gigService } from "../services/gig.service.js";




export function loadGigs(filterBy, sortBy = '') {
    return async (dispatch) => {
        const gigs = await gigService.query({ ...filterBy, sortBy })
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
        const action = { type: 'SET_FILTERBY_FIELD', field, value: filterBy[field] }
        dispatch(action)
        return Promise.resolve();
    }
}

export function setSort(value) {
    return (dispatch) => {
        const action = { type: 'SET_SORT', value }
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
        const savedGig = await gigService.toggleLike(gig._id, user)
        dispatch({ type: 'UPDATE_GIG', gig: savedGig })
    }
}
