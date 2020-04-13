import axios from 'axios'

export const SET_MOVIES = 'SET_MOVIES';
export const SET_MODAL_FORM = 'SET_MODAL_FORM'; //insert movies/serie form
export const SET_UPDATE_FORM = 'SET_UPDATE_FORM';
export const SET_UPDATE_SERIE_FORM = 'SET_UPDATE_SERIE_FORM'


export const getMovies = () => {
    return (dispatch) => {
        axios
            .get('')
            .then(({ data }) => {
                console.log(data)
                dispatch(setMovies(data))
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const setMovies = (data) => {
    return {
        type: SET_MOVIES,
        payload: data
    }
}

export const setModalForm = (status) => {
    return {
        type: SET_MODAL_FORM,
        payload: status
    }
}

export const setUpdateForm = (data) => {
    return {
        type: SET_UPDATE_FORM,
        payload: data
    }
}

export const setUpdateTvForm = (serie) => {
    return {
        type: SET_UPDATE_SERIE_FORM,
        payload: serie
    }
}

export const setUpdateFormStatus = (status) => {
    return {
        type: 'SET_UPDATE_FORM_STATUS',
        payload: status
    }
}