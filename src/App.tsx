import './scss/app.scss';

import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const NotFound = lazy(
    () => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'),
);
const PizzaInfo = lazy(
    () => import(/* webpackChunkName: "PizzaInfo" */ './pages/PizzaInfo'),
);

function App() {
    return (
        <div className='App'>
            <Suspense fallback={<div>Идёт загрузка...</div>}>
                <Routes>
                    <Route
                        path='/'
                        element={<MainLayout />}>
                        <Route
                            path=''
                            element={<Home />}
                        />
                        <Route
                            path='pizza/:id'
                            element={<PizzaInfo />}
                        />
                        <Route
                            path='cart'
                            element={<Cart />}
                        />
                        <Route
                            path='*'
                            element={<NotFound />}
                        />
                    </Route>
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
