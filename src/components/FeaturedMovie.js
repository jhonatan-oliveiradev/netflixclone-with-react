import React from 'react';
import './FeaturedMovie.css';

export default ({item}) => {
    console.log(item);

    let firstDate = new Date(item.first_air_date);
    let genres = [];
    for(let i in item.genres){
        genres.push(item.genres[i].name);
    }

    let description = item.overview;
    if(description.length > 200){
        description = description.substr(0, 200) + '...';
    }

    return (
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className='featured--vertical'>
                <div className='featured--horizontal'>
                    <div className='featured--name'>{item.original_name}</div>
                    <div className='featured--info'>
                        <div className='featured--rating'>{item.vote_average}</div>
                        <div className='featured--year'>{item.first_air_date.substr(0, 4)}</div>
                        <div className='featured--seasons'>{item.number_of_seasons} temporada{item.number_of_seasons != 1 ? 's' : ''}</div>
                    </div>
                    <div className='featured--description'>{item.overview}</div>

                    <div className='featured--buttons'>
                        <a className='watch' href={`/watch/${item.id}`}>► Assistir</a>
                        <a className='add' href={`/list/add${item.id}`}>+ Minha Lista</a>
                    </div>
                    <div className='featured--genres'>{genres.join(', ')}</div>

                </div> 
            </div>
            
        </section>
    );
}