import { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';

export default function Home() {
  const [pizzasDB, setPizzasDB] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const preloadData = [...new Array(12)].map((_, index) => (
    <PizzaSkeleton key={index} />
  ));

  const pizzaData = pizzasDB.map((pizza) => (
    <PizzaBlock
      key={pizza.id}
      {...pizza}
    />
  ));

  useEffect(() => {
    fetch('https://65564cc384b36e3a431f897e.mockapi.io/pizzaDB')
      .then((res) => res.json())
      .then((res) => {
        setPizzasDB(res);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading ? preloadData : pizzaData}
      </div>
    </div>
  );
}
