import React, {useEffect} from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default() => {

    const [movieList, setMovieList] = React.useState([]);
    const [FeaturedData, setFeaturedData] = React.useState(null);
    const [blackHeader, setBlackHeader] = React.useState(false);

    useEffect(()=>{
        const loadAll = async () => {
            // pegando a lista de filmes
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            // pegando o filme em destaque
            let originals = list.filter(i => i.slug === 'originals');
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
            let chosen = originals[0].items.results[randomChosen];
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            setFeaturedData(chosenInfo);
        };

        loadAll();
    }, []);

    useEffect(()=>{
        const scrollListener = () => {
            if(window.scrollY > 10){
                setBlackHeader(true);
            }else{
                setBlackHeader(false);
            }
        }

        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener);
        }

    }, []);

    return (
        <div className='page'>

            <Header black={blackHeader} />

                {FeaturedData && 
                    <FeaturedMovie item={FeaturedData} />
                }

            <section className='lists'>
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items} />
                ))}
            </section>

            <footer>
                Feito com <span role='img' aria-label='coração'>❤️</span> por <a href='https://www.jhonatanoliveira.com'>Jhonatan Oliveira</a><br/>
                Direitos de Imagem para <a href='https://www.netflix.com.br/'>Netflix®</a><br/>
                Dados retirados de <a href='https://www.themoviedb.org/'>The Movie Database</a>
            </footer>

            {movieList.length <= 0 &&
            <div className='loading'>
                <img src='https://c.tenor.com/Rfyx9OkRI38AAAAC/netflix-netflix-startup.gif' alt='Carregando' />
            </div>
}
        </div>
    );
}
