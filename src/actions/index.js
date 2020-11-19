import streams from '../apis/streams';
import axios from '../apis/streams';
import {
    SIGN_OUT, SIGN_IN, CREATE_STREAM, FETCH_STREAM, FETCH_STREAMS, DELETE_STREAM,
    EDIT_STREAM
} from './types';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

/// using arrow function syntax
// export default createStream = formValues => async dispatch=>{ streams.post('/streams', formValues)}
export const createStream = (formValues) => {
    return async (dispatch, getState) => {
        const { userId } = getState().auth;
        const res = await streams.post('/streams', { ...formValues, userId });

        dispatch({ type: CREATE_STREAM, payload: res.data })
    }
}

export const fetchStreams = () => async dispatch => {
    const res = await streams.get('/streams');

    dispatch({ type: FETCH_STREAMS, payload: res.data });
}

export const fetchStream = (streamId) => async dispatch => {
    const res = await streams.get(`/streams/${streamId}`);

    dispatch({ type: FETCH_STREAM, payload: res.data });
}

export const editStream = (streamId, formValues) => async dispatch => {
    const res = await streams.put(`/streams/${streamId}`, formValues);

    dispatch({ type: EDIT_STREAM, payload: res.data });
}

export const deleteStream = (streamId) => async dispatch => {
    await streams.delete(`/streams/${streamId}`);

    dispatch({ type: DELETE_STREAM, payload: streamId });
}