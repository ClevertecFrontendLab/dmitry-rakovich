import { createSlice } from '@reduxjs/toolkit';

type AuthData = {
    email?: string,
    password?: string,
    confirmPassword?: string,
    pathname?: string
}

type InitialState = {
    user: boolean;
    authData: AuthData
}

const initialState: InitialState = {
    user: !!localStorage.getItem('cleverfit-token'),
    authData: {}
};

export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signOut: (state) => {
            localStorage.removeItem('cleverfit-token');
            state.user = false
        },
        signIn: (state, action) => {
            state.user = action.payload.user;
        },
        setData: (state, action) => {
            state.authData.email = action.payload.email
            state.authData.password = action.payload.password
            state.authData.confirmPassword = action.payload.confirmPassword
        }
    }
});

export const { signIn, signOut, setData } = user.actions;
export default user.reducer;

