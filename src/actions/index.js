import streams from '../apis/stream';
import { SIGN_OUT, SIGN_IN, CREATE_STREAM, EDIT_STREAM, FETCH_STREAM, FETCH_STREAMS, DELETE_STREAM } from './types';
export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
}
export const createStream = (formValues) => async (dispath, getState) => {
    const { userId } = getState().auth;

    const response = await streams.post('/streams', { ...formValues, userId: userId });
    dispath({ type: CREATE_STREAM, payload: response.data })
}

export const fetchStreams = () => async dispath => {
    const response = await streams.get('/streams');
    dispath({ type: FETCH_STREAMS, payload: response.data })
}

export const fetchStream = (id) => async dispath => {
    const response = await streams.get(`/streams/${id}`);
    dispath({ type: FETCH_STREAM, payload: response.data })
}
export const editStream = (id) => async dispath => {
    const response = await streams.put(`/streams/${id}`);
    dispath({ type: EDIT_STREAM, payload: response.data })
}

export const deleteStream = (id) => async dispath => {
    await streams.delete(`/streams/${id}`);
    dispath({ type: DELETE_STREAM, payload: id })
}