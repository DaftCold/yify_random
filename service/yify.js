class Yify{
    constructor(){
        id = 0;
        movieCount = 0;
    }

    getRandomMovie(){
        if(movieCount == 0) {
            this.movieCount = async () => {
                let response = await fetch(
                  'https://yts.mx/api/v2/list_movies.json'
                );
                let json = await response.json();
                console.log(json);
                return json.movie_count;
              
            };
        }
        console.log(movieCount);
    }
}

export default Yify