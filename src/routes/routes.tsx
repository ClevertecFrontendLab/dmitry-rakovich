import { ROUTES } from "@constants/routes"
import { AuthPage } from "@pages/auth-page"
import { ChangePassword } from "@pages/change-password"
import { MainPage } from "@pages/main-page"
import { RegisterPage } from "@pages/register-page"
import { ConfirmEmail } from "@pages/result/confirm-email"
import { ErrorChangePassword } from "@pages/result/error-change-password"
import { ErrorCheckEmail } from "@pages/result/error-check-email"
import { ErrorCheckEmailNoExist } from "@pages/result/error-check-email-no-exist"
import { ErrorLogin } from "@pages/result/error-login"
import { ErrorOther } from "@pages/result/error-other"
import { ErrorUserExist } from "@pages/result/error-user-exist"
import { RegisterSuccess } from "@pages/result/success"
import { SuccessChangePassword } from "@pages/result/success-change-password"
import { Navigate, Route, Routes } from "react-router-dom"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Navigate to={ROUTES.main} />} />
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
    )
}