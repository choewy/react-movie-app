import noImage from '../images/noImage.png'

const Movie = (props) => {
    const { movie } = props;
    const title = movie.title.replace("<b>", "").replace("</b>", "")
    const director = movie.director.replace(/\|$/, '').replace(/\|/g, ', ')
    const actor = movie.actor.replace(/\|$/, '').replace(/\|/g, ', ')

    return (
        <a className="movie" href={movie.link} target="_blank" rel="noreferrer">
            <img alt={movie.subtitle} src={movie.image ? movie.image : noImage} />
            <div className="data">
                <h1>{title}</h1>
                <p><span>개봉일</span> {movie.pubDate}</p>
                <p><span>평  점</span> {movie.userRating} / 10.00</p>
                <p><span>감  독</span> {director}</p>
                <p><span>배  우</span> {actor}</p>
            </div>
        </a>
    )
}

export default Movie;