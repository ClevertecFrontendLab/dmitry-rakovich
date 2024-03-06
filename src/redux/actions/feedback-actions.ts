
import { api } from '@constants/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../axios';
import { AppDispatch } from '@redux/configure-store';
import { getAllFeedbacks } from '@redux/slices/feedback-slice';
import { IFeedback } from '../../types/index';
import { signOut } from '@redux/slices/user-slice';
import { ROUTES } from '@constants/routes';
import { push } from 'redux-first-history';

type TFeedback = { message: string, rating: number, setIsError: React.Dispatch<React.SetStateAction<boolean>>, setIsSuccess: React.Dispatch<React.SetStateAction<boolean>> }


export const fetchFeedbacks = createAsyncThunk(
    'feedback/fetchFeedbacks',
    async (setError: React.Dispatch<React.SetStateAction<boolean>>, thunkAPI) => {
        const dispatch = thunkAPI.dispatch as AppDispatch
        try {
            const response = await $api.get<IFeedback[]>(api.feedback)
            dispatch(getAllFeedbacks(response.data))
        } catch (error) {
            if (error.response.status === 403) {
                signOut()
                dispatch(push(ROUTES.auth.main))
            } else setError(true)
        }
    }
);

export const sendFeedback = createAsyncThunk(
    'feedback/sendFeedback',
    async ({ message, rating, setIsError, setIsSuccess }: TFeedback, thunkAPI) => {
        const dispatch = thunkAPI.dispatch as AppDispatch
        try {
            const response = await $api.post(api.feedback, {
                rating, message
            })
            setIsSuccess(true)
            dispatch(getAllFeedbacks(response.data))
        } catch (error) {
            setIsError(true)
            return thunkAPI.rejectWithValue(error)
        }
    }
);
