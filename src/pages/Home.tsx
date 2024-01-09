import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';

import Categories from '../components/CategoriesBlock';
import Sort from '../components/SortBlock';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import PaginationBlock from '../components/PaginationBlock';
import { list } from '../components/SortBlock/SortBlock';

import {
    filterSelector,
    setCategoryId,
    setCurrentPage,
    setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, pizzaSelector } from '../redux/slices/pizzaSlice';

const Home: React.FC = () => {
    const isMounted = useRef(false);

    const dispatch = useDispatch();

    const { searchValue, categoryId, currentPage, sort } =
        useSelector(filterSelector);
    const { items, status } = useSelector(pizzaSelector);

    const navigate = useNavigate();

    const preloadData = [...new Array(4)].map((_, index) => (
        <PizzaSkeleton key={index} />
    ));

    const pizzaData = items.map((pizza: any) => (
        <PizzaBlock
            key={pizza.id}
            {...pizza}
        />
    ));

    const pizzaError = (
        <div className='content__error-info'>
            <h2>Произошла ошибка</h2>
            <p>Не удалось получить пиццы. Попробуйте повторить попытку позже</p>
        </div>
    );

    const onChangeCategory = useCallback(
        (id: number) => dispatch(setCategoryId(id)),
        [],
    );

    const onChangePage = (num: number) => dispatch(setCurrentPage(num));

    const getPizzas = async () => {
        const searchCategory = categoryId > 0 ? `&category=${categoryId}` : '';
        const searchName = searchValue ? `&search=${searchValue}` : '';
        const sortBy = `&sortBy=${sort.sortBy}`;
        const order = `&order=${sort.sortOrder}`;
        const page = `&page=${currentPage}&limit=4`;

        dispatch(
            // @ts-ignore
            fetchPizzas({
                sortBy,
                order,
                searchCategory,
                searchName,
                page,
            }),
        );

        window.scrollTo(0, 0);
    };

    // Если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortBy: sort.sortBy,
                sortOrder: sort.sortOrder,
                categoryId,
                currentPage,
            });

            navigate(`/?${queryString}`);
        }

        getPizzas();
    }, [categoryId, sort, searchValue, currentPage]);

    // Парсим параметры при первом рендере
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = list.find(
                (obj) =>
                    obj.sortBy === params.sortBy &&
                    obj.sortOrder === params.sortOrder,
            );

            dispatch(
                setFilters({
                    ...params,
                    sort,
                }),
            );
        }
        isMounted.current = true;
    }, []);

    return (
        <div className='container'>
            <div className='content__top'>
                <Categories
                    value={categoryId}
                    onChangeCategory={onChangeCategory}
                />
                <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            {status === 'error' ? (
                pizzaError
            ) : status === 'loading' ? (
                <div className='content__items'>{preloadData}</div>
            ) : (
                <div className='content__items'>{pizzaData}</div>
            )}
            <PaginationBlock
                currentPage={currentPage}
                setCurrentPage={onChangePage}
            />
        </div>
    );
};

export default Home;
