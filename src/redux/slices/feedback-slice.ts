import { createSlice } from '@reduxjs/toolkit';
import { IFeedback } from '../../types/index';

type InitialState = {
    feedbacks: IFeedback[];
}

const initialState: InitialState = {
    feedbacks: []
};

export const feedback = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        getAllFeedbacks: (state, action) => {
            state.feedbacks = action.payload.sort(compareDates)
        }
    }
});

function compareDates(a: IFeedback, b: IFeedback) {
    return new Date(b.createdAt) - new Date(a.createdAt);
}

export const { getAllFeedbacks } = feedback.actions;
export default feedback.reducer;

