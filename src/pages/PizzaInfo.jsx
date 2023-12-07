import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function PizzaInfo() {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios(`https://65564cc384b36e3a431f897e.mockapi.io/pizzaDB/${id}`)
      .then(({ data }) => setPizza(data))
      .catch((error) => {
        alert('Error during getting pizza data');
        navigate('/');
      });
  }, [id]);

  if (!pizza) {
    return <div className='loading'>'Загрузка...'</div>;
  }

  return (
    <div className='pizza'>
      <img
        src={pizza.imageUrl}
        alt='pizza'
      />
      <h2>{pizza.title}</h2>
      <p>Цена {pizza.price} грн.</p>
    </div>
  );
}
