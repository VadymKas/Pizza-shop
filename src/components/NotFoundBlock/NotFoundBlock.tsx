import styles from './NotFoundBlock.module.scss';

const NotFound = () => {
    return (
        <div className={styles.root}>
            <h1>Ничего не найдено.</h1>
            <p className={styles.description}>
                К сожалению данная страница отсутствует в нашем магазине.
                Проcим перейти на главную страницу и выполнить поиск снова.
            </p>
        </div>
    );
};

export default NotFound;
