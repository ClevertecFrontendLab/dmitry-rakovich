import { useEffect, useState } from 'react';
import { Main } from '@components/Main';
import './main-page.scss';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { push } from 'redux-first-history';
import { ROUTES } from '@constants/routes';
import { Loader } from '@components/Loader/Loader';
import { userSelector } from '@redux/selectors';

export const MainPage: React.FC = () => {

    const [isLoading, setIsLoading] = useState(true)
    const user = useAppSelector(userSelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!user) dispatch(push(ROUTES.auth.main))
        setIsLoading(false)
    }, [user])
    return (
        <>
            <Loader className={isLoading ? 'visible' : ''} />
            <Main />
        </>
    );
};
