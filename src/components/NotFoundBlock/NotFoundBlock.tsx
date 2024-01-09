import styles from './NotFoundBlock.module.scss';

const NotFound = () => {
    return (
        <div className={styles.root}>
            <h1>Ничего не найдено.</h1>
            <p className={styles.description}>
                К сожалению данная страница отсутствует в нашем магазине.
            </p>
        </div>
    );
};

export default NotFound;
