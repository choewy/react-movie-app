import { useState } from "react"
import axios from 'axios';
import config from '../config.json'
import Movie from './Movie';

const Search = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);

    const searchChange = event => {
        const { target: { value } } = event;
        setSearch(value);
    };

    const onSearch = async event => {
        event.preventDefault();

        if (search !== "") {
            setIsLoading(true);
            try {

                // https://openapi.naver.com/v1/search/movie.json
                const result = await axios.get(
                    "/api/v1/search/movie.json",
                    {
                        params: {
                            query: search,
                            display: 20
                        },
                        headers: {
                            "X-Naver-Client-Id": config.clientID,
                            "X-Naver-Client-Secret": config.clientSecret
                        }
                    }
                );
                setMovies(result.data.items);
                setIsLoading(false);

            }
            catch (error) {
                console.log(error);
            };
        };
    };

    return (
        <>
            {
                isLoading
                    ? <div>불러오는 중...</div>
                    : <div className="container">
                        <div className="search">
                            <form onSubmit={onSearch}>
                                <input type="text" value={search} onChange={searchChange} placeholder="검색어를 입력하세요." />
                            </form>
                        </div>
                        <div className="movies">{
                            movies.map((movie, key) =>
                                <Movie key={key} movie={movie} />
                            )
                        }</div>
                    </div>
            }
        </>
    );
};

export default Search;