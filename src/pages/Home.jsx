import { useEffect, useState } from 'react';

import Categories from '../components/CategoriesBlock';
import Sort from '../components/SortBlock';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';

export default function Home() {
  const [pizzasDB, setPizzasDB] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categotyId, setCategotyId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности (DESC)',
    sortProperty: 'rating',
    sortType: 'desc',
  });

  const preloadData = [...new Array(8)].map((_, index) => (
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

    const id = categotyId > 0 ? `${categotyId}` : '';

    fetch(
      'https://65564cc384b36e3a431f897e.mockapi.io/pizzaDB?category=' +
        id +
        `&sortBy=${sortType.sortBy}&order=${sortType.sortOrder}`,
    )
      .then((res) => res.json())
      .then((res) => {
        setPizzasDB(res);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categotyId, sortType]);

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
    </div>
  );
}
