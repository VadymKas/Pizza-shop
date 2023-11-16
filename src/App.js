import './scss/app.scss';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

function App() {
  const [pizzasDB, setPizzasDB] = useState([]);

  useEffect(() => {
    fetch('https://65564cc384b36e3a431f897e.mockapi.io/pizzaDB')
      .then((res) => res.json())
      .then((res) => setPizzasDB(res))
  }, []);

  return (
    <div className='App'>
      <div className='wrapper'>
        <Header />
        <div className='content'>
          <div className='container'>
            <div className='content__top'>
              <Categories />
              <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
              {pizzasDB.map((pizza) => (
                <PizzaBlock key={pizza.id} {...pizza} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
