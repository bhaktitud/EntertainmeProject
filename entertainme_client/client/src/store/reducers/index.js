import {
    SET_MOVIES,
    SET_MODAL_FORM
} from '../actions'


const initialState = {
    movies: [],
    modalStatus: false
}

export const reducers = (state = initialState, action) => {
    const { payload, type } = action
    switch (type) {
        case SET_MOVIES:
            return {
                ...state,
                movies: payload
            }
        case SET_MODAL_FORM:
            return {
                ...state,
                modalStatus: payload
            }
        default:
            return state;
    }
}