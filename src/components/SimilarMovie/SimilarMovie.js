import React, { useEffect, useState, memo } from 'react';
import movieApi, { movieType } from '../../api/movieApi';
import MovieCart from '../../components/MovieCard';
import { SIMILAR_TYPE } from '../../constants/MovieType';

const SimilarMovie = (props) => {
    const id = props.id;
    const type = Object.keys(SIMILAR_TYPE).find((key) => SIMILAR_TYPE[key] === props.type);
    const similarType = movieType[type];
    const isSeriesType = similarType === 'sameseries';

    const [movieItems, setMovieItems] = useState([]);
    const [series, setSeries] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const response = await movieApi.getSimilarMovies(id, similarType);
                isSeriesType ? setSeries(response.data) : setMovieItems(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getMovies();
    }, [props]);

    return (
        <>
            {!isSeriesType
                ? movieItems && (
                      <>
                          <div className={'text-hr'}>{props.type}</div>
                          <div className='row'>
                              {movieItems.map((movieItem, index) => (
                                  <div className='item col-6 col-sm-4 col-md-3 col-lg-2 ' key={index}>
                                      <MovieCart item={movieItem} />
                                  </div>
                              ))}
                          </div>
                      </>
                  )
                : series.length !== 0 && (
                      <>
                          <div className={'text-hr'}>{props.type}</div>
                          {series.map((seriesItem, index) => (
                              <div className='row' key={index}>
                                  {seriesItem.movies.map((movieItem, index) => (
                                      <div className='item col-6 col-sm-4 col-md-3 col-lg-2 ' key={index}>
                                          <MovieCart item={movieItem} />
                                      </div>
                                  ))}
                              </div>
                          ))}
                      </>
                  )}
        </>
    );
};

export default memo(SimilarMovie);
