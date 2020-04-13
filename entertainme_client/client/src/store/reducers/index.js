import {
    SET_MOVIES,
    SET_MODAL_FORM,
    SET_UPDATE_FORM,
    SET_UPDATE_SERIE_FORM
} from '../actions'


const initialState = {
    movies: [],
    modalStatus: false,
    data: {},
    serie: {},
    updateStatus: false
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
        case SET_UPDATE_FORM:
            return {
                ...state,
                data: payload
            }
        case SET_UPDATE_SERIE_FORM:
            return {
                ...state,
                serie: payload
            }
        case 'SET_UPDATE_FORM_STATUS':
            return {
                ...state,
                updateStatus: payload
            }
        default:
            return state;
    }
}