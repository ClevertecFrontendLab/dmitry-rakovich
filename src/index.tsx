import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from "redux-first-history/rr6";
import { history, store } from '@redux/configure-store';
import 'antd/dist/antd.css';
import 'antd/lib/icon/style/index.css';
import 'normalize.css';
import { AppRoutes } from './routes/routes';
import './styles/index.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>
                <AppRoutes />
            </Router>
        </Provider>
    </React.StrictMode>,
);
