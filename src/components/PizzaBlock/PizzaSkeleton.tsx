import ContentLoader from 'react-content-loader';

const MyLoader: React.FC = (props) => (
    <ContentLoader
        className='pizza-block'
        speed={2}
        width={280}
        height={466}
        viewBox='0 0 280 466'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
        {...props}>
        <circle
            cx='134'
            cy='125'
            r='120'
        />
        <rect
            x='0'
            y='265'
            rx='10'
            ry='10'
            width='268'
            height='27'
        />
        <rect
            x='0'
            y='312'
            rx='10'
            ry='10'
            width='280'
            height='76'
        />
        <rect
            x='1'
            y='420'
            rx='10'
            ry='10'
            width='113'
            height='27'
        />
        <rect
            x='118'
            y='416'
            rx='10'
            ry='10'
            width='151'
            height='34'
        />
    </ContentLoader>
);

export default MyLoader;
