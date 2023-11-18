import { useContext, useEffect, useState } from 'react';

import Categories from '../components/CategoriesBlock';
import Sort from '../components/SortBlock';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import PaginationBlock from '../components/PaginationBlock';

import { SearchContext } from '../App';

export default function Home() {
  const [pizzasDB, setPizzasDB] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categotyId, setCategotyId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: 'популярности (DESC)',
    sortProperty: 'rating',
    sortType: 'desc',
  });
  const {searchValue} = useContext(SearchContext);

  const preloadData = [...new Array(4)].map((_, index) => (
    <PizzaSkeleton key={index} />
  ));

  const pizzaData = pizzasDB.map((pizza) => (
    <PizzaBlock
      key={pizza.id}
      {...pizza}
    />
  ));

  useEffect(() => {
    setIsLoading(true);

    const searchCategory = categotyId > 0 ? `&category=${categotyId}` : '';
    const searchName = searchValue ? `&search=${searchValue}` : '';

    fetch(
      'https://65564cc384b36e3a431f897e.mockapi.io/pizzaDB?' +
        `page=${currentPage}&limit=4` +
        `&sortBy=${sortType.sortBy}` +
        `&order=${sortType.sortOrder}` +
        searchCategory +
        searchName,
    )
      .then((res) => res.json())
      .then((res) => {
        setPizzasDB(res);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categotyId, sortType, searchValue, currentPage]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          value={categotyId}
          categotyIdHandler={setCategotyId}
        />
        <Sort
          value={sortType}
          sortTypeHandler={setSortType}
        />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading ? preloadData : pizzaData}
      </div>
      <PaginationBlock setCurrentPage={setCurrentPage} />
    </div>
  );
}
