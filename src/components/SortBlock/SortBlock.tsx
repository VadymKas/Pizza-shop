import { useState, memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSort, sortSelector } from '../../redux/slices/filterSlice';
import { useRef } from 'react';

export const list: Sort[] = [
    { name: 'популярности (DESC)', sortBy: 'rating', sortOrder: 'desc' },
    { name: 'популярности (ASC)', sortBy: 'rating', sortOrder: 'asc' },
    { name: 'цене (DESC)', sortBy: 'price', sortOrder: 'desc' },
    { name: 'цене (ASC)', sortBy: 'price', sortOrder: 'asc' },
    { name: 'алфавиту (DESC)', sortBy: 'title', sortOrder: 'desc' },
    { name: 'алфавиту (ASC)', sortBy: 'title', sortOrder: 'asc' },
];

const Sort: React.FC = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const sort = useSelector(sortSelector);
    const sortRef = useRef<HTMLDivElement>(null);

    const sortModalVisability = () => {
        setOpen((prev) => !prev);
    };

    const selectedSortHandler = (obj: Sort) => {
        dispatch(setSort(obj));
        sortModalVisability();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sortRef.current &&
                !event.composedPath().includes(sortRef.current)
            ) {
                setOpen(false);
            }
        };

        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div
            className='sort'
            ref={sortRef}>
            <div className='sort__label'>
                <svg
                    width='10'
                    height='6'
                    viewBox='0 0 10 6'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                        d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
                        fill='#2C2C2C'
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={sortModalVisability}>{sort.name}</span>
            </div>
            {open && (
                <div className='sort__popup'>
                    <ul>
                        {list.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => selectedSortHandler(item)}
                                className={
                                    sort.sortBy === item.sortBy &&
                                    sort.sortOrder === item.sortOrder
                                        ? 'active'
                                        : ''
                                }>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default memo(Sort);
