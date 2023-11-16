import { useState } from 'react';

export default function Categories() {
  const [active, setActive] = useState(0);

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  const activeCategoryHandler = (index) => {
    setActive(index);
  };

  return (
    <div className='categories'>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => activeCategoryHandler(index)}
            className={active === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
