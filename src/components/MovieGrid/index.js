import MovieCart from '../MovieCard';
import Button from '../Button';
import styles from './moviegrid.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function MovieGrid(props) {
    const movies = props.movies;
    const page = props.page;
    const totalPage = props.totalPage;

    return (
        <div className={cx('movie-grid')}>
            {movies !== null && (
                <div className='row'>
                    {movies.map((movie, index) => (
                        <div className='item col-6 col-sm-4 col-md-3 col-lg-2 ' key={index}>
                            <MovieCart item={movie} />
                        </div>
                    ))}
                </div>
            )}
            {page < totalPage ? (
                <Button btnColor='black' type='rounded' labelColor='white' onClick={props.loadmoreOnClick}>
                    Load more
                </Button>
            ) : null}
        </div>
    );
}

export default MovieGrid;
