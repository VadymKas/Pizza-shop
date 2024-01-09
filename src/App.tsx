import './scss/app.scss';

import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import PizzaInfo from './pages/PizzaInfo.tsx';
import MainLayout from './layouts/MainLayout';

function App() {
    return (
        <div className='App'>
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
        </div>
    );
}

export default App;
