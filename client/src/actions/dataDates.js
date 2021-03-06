import request from './connect';

//add data
export const addDatadateSuccess = (data) => ({
    type: 'ADD_DATA_DATE_SUCCESS',
    data
})

export const addDatadateFailure = (id) => ({
    type: 'ADD_DATA_DATE_FAILURE',
    id
})

export const addDatadateView = (id,letter, frequency) => ({
    type: 'ADD_DATA_DATE',
    id,letter, frequency
})
export const addDatadateExists = (letter) => ({
    type: 'ADD_DATA_DATE_EXISTS',
    letter
})

export const addDatadate = (letter, frequency) => {
    let id = Date.now()
    return dispatch => {
        request.post('/api/dataDate', {
            letter
        }).then(response => {
            if (response.data) {
                dispatch(addDatadateExists(letter));
            } else {
                dispatch(addDatadateView(id,letter, frequency))
                return request.post('/api/dataDate', {
                    id,letter, frequency
                }).then(response => {
                    dispatch(addDatadateSuccess(response.data.data))
                }).catch(function (error) {
                    console.log(error);
                    dispatch(addDatadateFailure(id))
                })
            }
        }).catch(function (error) {
            console.log(error);
            dispatch(addDatadateView(letter, frequency))
            dispatch(addDatadateFailure(id))
        })
    }
}
//end add data

//load data 
export const loadDatadateSuccess = (data) => ({
    type: 'LOAD_DATA_DATE_SUCCESS',
    data
})

export const loadDatadateFailure = () => ({
    type: 'LOAD_DATA_DATE_FAILURE'
})

export const loadDatadate = () => {
    return dispatch => {
        return request.get('/api/dataDate')
            .then(response => {
                dispatch(loadDatadateSuccess(response.data))
            }).catch(function (error) {
                console.log(error);
                dispatch(loadDatadateFailure())
            })
    }
}
//end load data


//edit data 
export const updateDatadateSuccess = (data) => ({
    type: 'UPDATE_DATA_DATE_SUCCESS',
    data
})

export const updateDatadateFailure = (id) => ({
    type: 'UPDATE_DATA_DATE_FAILURE',
    id
})

export const updateDatadateView = (_id,letter, frequency) => ({
    type: 'UPDATE_DATA_DATE',
    _id, letter, frequency
})

export const updateDatadate = (_id, letter, frequency) => {
    return dispatch => {
        dispatch(updateDatadateView(_id, letter, frequency))
        return request.put(`/api/dataDate/${_id}`, {
            _id, letter, frequency
        }).then(response => {
            dispatch(updateDatadateSuccess(response.data.data))
        }).catch(function (error) {
            console.log(error);
            dispatch(updateDatadateFailure(_id))
        })
    }
}
//end edit data

//delete data 
export const deleteDatadateSuccess = (data) => ({
    type: 'DELETE_DATA_DATE_SUCCESS',
    data
})

export const deleteDatadateFailure = () => ({
    type: 'DELETE_DATA_DATE_FAILURE'
})

export const deleteDatadateView = (id) => ({
    type: 'DELETE_DATA_DATE',
    id
})

export const deleteDatadate = (_id) => {
    return dispatch => {
        dispatch(deleteDatadateView(_id))
        return request.delete(`/api/dataDate/${_id}`)
            .then(response => {
                dispatch(deleteDatadateSuccess(response.data.data))
            }).catch(function (error) {
                dispatch(deleteDatadateFailure())
            })
    }
}
//end delete data

//start resend data
export const resendDatadate = (id,letter, frequency) => {
    return dispatch => {
        return request.post('/api/dataDate', {id,letter, frequency })
            .then(function (response) {
                dispatch(addDatadateSuccess(response.data))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(addDatadateFailure())
            });
    }
}
//end resend data