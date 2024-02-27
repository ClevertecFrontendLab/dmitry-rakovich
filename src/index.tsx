import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { HistoryRouter as Router } from "redux-first-history/rr6";

import { history, store } from '@redux/configure-store';
import { MainPage } from './pages';

import 'normalize.css';
import 'antd/dist/antd.css'
import 'antd/lib/icon/style/index.css'
import './styles/index.scss';
import { AuthPage } from '@pages/auth-page';
import { RegisterPage } from '@pages/register-page';
import { ChangePassword } from '@pages/change-password';
import { ROUTES } from '@constants/routes';
import { RegisterSuccess } from '@pages/result/success';
import { ErrorLogin } from '@pages/result/error-login';
import { ErrorUserExist } from '@pages/result/error-user-exist';
import { ErrorOther } from '@pages/result/error-other';
import { ErrorCheckEmailNoExist } from '@pages/result/error-check-email-no-exist';
import { ErrorCheckEmail } from '@pages/result/error-check-email';
import { ConfirmEmail } from '@pages/result/confirm-email';
import { ErrorChangePassword } from '@pages/result/error-change-password';
import { SuccessChangePassword } from '@pages/result/success-change-password';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>
                <Routes>
                    <Route path={ROUTES.main} element={<MainPage />} />
                    <Route path={ROUTES.auth.main} element={<AuthPage />} />
                    <Route path={ROUTES.auth.registration} element={<RegisterPage />} />
                    <Route path={ROUTES.auth.change_password} element={<ChangePassword />} />
                    <Route path={ROUTES.result.success} element={<RegisterSuccess />} />
                    <Route path={ROUTES.result.error.login} element={<ErrorLogin />} />
                    <Route path={ROUTES.result.error.user_exist} element={<ErrorUserExist />} />
                    <Route path={ROUTES.result.error.other} element={<ErrorOther />} />
                    <Route path={ROUTES.result.error.check_email_no_exist} element={<ErrorCheckEmailNoExist />} />
                    <Route path={ROUTES.result.error.check_email} element={<ErrorCheckEmail />} />
                    <Route path={ROUTES.auth.confirm_email} element={<ConfirmEmail />} />
                    <Route path={ROUTES.result.error.change_password} element={<ErrorChangePassword />} />
                    <Route path={ROUTES.result.success_change_password} element={<SuccessChangePassword />} />
                </Routes>
            </Router>
        </Provider>
    </React.StrictMode>,
);
