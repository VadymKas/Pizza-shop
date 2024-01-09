import ReactPaginate from 'react-paginate';

import styles from './PaginationBlock.module.scss';

type PaginationProps = {
    currentPage: number;
    setCurrentPage: (page: number) => void;
};

const PaginationBlock: React.FC<PaginationProps> = ({
    currentPage,
    setCurrentPage,
}) => {
    const currentPageHandler = (event: any) => {
        setCurrentPage(event.selected + 1);
    };

    return (
        <ReactPaginate
            className={styles.root}
            breakLabel='...'
            nextLabel='>'
            onPageChange={currentPageHandler}
            pageRangeDisplayed={8}
            pageCount={3}
            forcePage={currentPage - 1}
            previousLabel='<'
            renderOnZeroPageCount={null}
        />
    );
};

export default PaginationBlock;
