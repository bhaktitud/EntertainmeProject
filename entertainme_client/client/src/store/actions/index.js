import axios from 'axios'

export const SET_MOVIES = 'SET_MOVIES';
export const SET_MODAL_FORM = 'SET_MODAL_FORM'


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