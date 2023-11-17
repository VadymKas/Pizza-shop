export default function Categories({ value, categotyIdHandler}) {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  const activeCategoryHandler = (index) => {
    categotyIdHandler(index);
  };

  return (
    <div className='categories'>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => activeCategoryHandler(index)}
            className={value === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
