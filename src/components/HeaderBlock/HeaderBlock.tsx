import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Logo from '../../assets/img/pizza-logo.svg';
import Cart from '../../assets/img/cart.svg';

import SearchBlock from '../SearchBlock/SearchBlock';
import { cartSelector } from '../../redux/slices/cartSlice';

const Header: React.FC = () => {
    const { totalPrice, totalCount } = useSelector(cartSelector);
    const { pathname } = useLocation();

    return (
        <div className='header'>
            <div className='container'>
                <Link to='/'>
                    <div className='header__logo'>
                        <img
                            width='38'
                            src={Logo}
                            alt='Pizza logo'
                        />
                        <div>
                            <h1>React Pizza</h1>
                            <p>самая вкусная пицца во вселенной</p>
                        </div>
                    </div>
                </Link>
                <SearchBlock />
                <div className='header__cart'>
                    {pathname !== '/cart' && (
                        <Link
                            to='/cart'
                            className='button button--cart'>
                            <span>{totalPrice} грн.</span>
                            <div className='button__delimiter'></div>
                            <img
                                width='18'
                                src={Cart}
                                alt='Pizza logo'
                            />
                            <span>{totalCount}</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
