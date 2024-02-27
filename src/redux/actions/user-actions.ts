
import { api } from '@constants/api';
import { ROUTES } from '@constants/routes';
import { STATUS } from '@constants/status';
import { setData, signIn } from '@redux/slices/user-slice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { push } from 'redux-first-history';
import $api from '../../axios';
import { AppDispatch, RootState } from '@redux/configure-store';

type TLogin = { email: string, password: string, remember: boolean }
type TPassword = { password: string, confirmPassword: string }
type TRegister = { email: string, password: string }
type TVerify = {
    code: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    setError: React.Dispatch<React.SetStateAction<boolean>>
}

export const login = createAsyncThunk(
    'user/login',

    async ({ email, password, remember }: TLogin, thunkAPI) => {
        const dispatch = thunkAPI.dispatch as AppDispatch
        try {
            const response = await $api.post(api.auth.login, {
                email,
                password,
            })
            if (response.status === STATUS.OK) {
                dispatch(signIn({ user: true }))
                if (remember) {
                    localStorage.setItem('cleverfit-token', JSON.stringify(response.data.accessToken))
                }
                dispatch(push(ROUTES.main));
            }
        } catch (error) {
            dispatch(push(ROUTES.result.error.login, {
                from: ROUTES.auth.main
            }));
        }
    }
);

export const restorePassword = createAsyncThunk(
    'user/restorePassword',
    async (email: string, thunkAPI) => {
        const state = thunkAPI.getState() as RootState
        const dispatch = thunkAPI.dispatch as AppDispatch
        try {
            const response = await $api.post(api.auth.check_email, {
                email: state.user.authData.email || email
            })
            if (response) {
                dispatch(setData(email))
                dispatch(push(ROUTES.auth.confirm_email, {
                    from: ROUTES.auth.main
                }))
                return
            }
        } catch (error) {
            if (error.response.status === STATUS.NOT_FOUND) {
                if (error.response.data.message === 'Email не найден') {
                    dispatch(push(ROUTES.result.error.check_email_no_exist, {
                        from: ROUTES.auth.main
                    }));
                    return
                } else {
                    dispatch(
                        setData({
                            email: state.user.authData.email || email
                        })
                    )
                    dispatch(
                        push(ROUTES.result.error.check_email, {
                            from: '/auth'
                        })
                    )
                    return
                }
            } else {
                dispatch(
                    setData({
                        email: state.user.authData.email || email
                    })
                )
                dispatch(
                    push(ROUTES.result.error.check_email, {
                        from: '/auth'
                    })
                )
            }
        }
    }
);

export const changePassword = createAsyncThunk(
    'user/changePassword',
    async ({ password, confirmPassword }: TPassword, thunkAPI) => {
        const state = thunkAPI.getState() as RootState
        const dispatch = thunkAPI.dispatch as AppDispatch
        try {
            const response = await $api.post(ROUTES.auth.change_password, {
                password: state.user.authData.password || password,
                confirmPassword: state.user.authData.confirmPassword || confirmPassword
            })
            if (response.status === STATUS.CREATE) {
                dispatch(push(ROUTES.result.success_change_password, {
                    from: ROUTES.auth.change_password
                }))
            }
        } catch (error) {
            dispatch(setData({
                password: state.user.authData.password || password,
                confirmPassword: state.user.authData.confirmPassword || confirmPassword
            }))
            dispatch(push(ROUTES.result.error.change_password, {
                from: ROUTES.auth.change_password
            }))
        }
    }
);

export const register = createAsyncThunk(
    'user/register',
    async ({ email, password }: TRegister, thunkAPI) => {
        const state = thunkAPI.getState() as RootState
        const dispatch = thunkAPI.dispatch as AppDispatch
        try {
            const response = await $api.post(api.auth.registration, {
                email: state.user.authData.email || email,
                password: state.user.authData.password || password
            })
            if (response.status === STATUS.CREATE) {
                dispatch(push(ROUTES.result.success, {
                    from: ROUTES.auth.registration
                }));
            }
        } catch (error) {
            if (error.response.status === STATUS.IS_EXIST) {
                dispatch(push(ROUTES.result.error.user_exist, {
                    from: ROUTES.auth.registration
                }));
                return
            }
            dispatch(setData({
                email: state.user.authData.email || email,
                password: state.user.authData.password || password
            }))
            dispatch(push(ROUTES.result.error.other, {
                from: ROUTES.auth.registration
            }))
        }
    }
);

export const verifyEmail = createAsyncThunk(
    'user/verifyEmail',
    async ({ code, setValue, setError }: TVerify, thunkAPI) => {
        const state = thunkAPI.getState() as RootState
        const dispatch = thunkAPI.dispatch as AppDispatch
        try {
            const response = await $api.post(ROUTES.auth.confirm_email, {
                email: state.user.authData.email,
                code
            })
            if (response) {
                dispatch(push(ROUTES.auth.change_password, {
                    from: ROUTES.auth.confirm_email
                }))
            }
        } catch (error) {
            setValue('')
            setError(true)
        }
    }
);

