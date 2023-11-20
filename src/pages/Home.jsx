import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Categories from '../components/CategoriesBlock';
import Sort from '../components/SortBlock';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import PaginationBlock from '../components/PaginationBlock';
import { SearchContext } from '../App';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

export default function Home() {
  const [pizzasDB, setPizzasDB] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { searchValue } = useContext(SearchContext);

  const dispatch = useDispatch();
  const { categoryId, currentPage, sort } = useSelector((state) => state.filter);

  const preloadData = [...new Array(4)].map((_, index) => (
    <PizzaSkeleton key={index} />
  ));

  const pizzaData = pizzasDB.map((pizza) => (
    <PizzaBlock
      key={pizza.id}
      {...pizza}
    />
  ));

  const onChangeCategory = (id) => dispatch(setCategoryId(id));
  const onChangePage = (num) => dispatch(setCurrentPage(num));

  useEffect(() => {
    setIsLoading(true);

    const searchCategory = categoryId > 0 ? `&category=${categoryId}` : '';
    const searchName = searchValue ? `&search=${searchValue}` : '';

    axios(
      'https://65564cc384b36e3a431f897e.mockapi.io/pizzaDB?' +
        `page=${currentPage}&limit=4` +
        `&sortBy=${sort.sortBy}` +
        `&order=${sort.sortOrder}` +
        searchCategory +
        searchName,
    ).then((res) => {
      setPizzasDB(res.data);
      setIsLoading(false);
    });

    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage]);

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
      <div className='content__items'>
        {isLoading ? preloadData : pizzaData}
      </div>
      <PaginationBlock currentPage={currentPage} setCurrentPage={onChangePage} />
    </div>
  );
}
