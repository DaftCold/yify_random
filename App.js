import React from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

export default function App() {

  const [isLoading, setLoading] = useState(true);
  const [movieCount, setMovieCount] = useState(0);
  const [randomMovie, setRandomMovie] = useState([]);

  useEffect(() => {
    if(movieCount == 0){
      fetch('https://yts.mx/api/v2/list_movies.json')
        .then((response) => response.json())
        .then((json) => {
          setMovieCount(json.data.movie_count);
          console.log(movieCount);
        })
        .then(getRandomMovie())
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, []);

  const getRandomMovie = () => {
    if(movieCount !=0){
      var id = Math.floor(Math.random() * movieCount);
      var url = ("https://yts.mx/api/v2/movie_details.json?movie_id=" + id + "&with_images=true")
      console.log(url);
      fetch(url)
      .then((response) => response.json())
      .then((json) =>{
        setRandomMovie(json.data.movie)
        console.log(randomMovie) 
      })
      .catch((error) => {
        console.error(error)
        //getRandomMovie();
      })
      .finally(() => setLoading(false));
    }
  } 

  return (
    <View style={styles.container}>
       {isLoading ? <Text>Loading...</Text> :

      (<View> 
        <Image source={randomMovie.medium_cover_image}></Image>
        <Text>titre : {randomMovie.title}</Text>       
        
        { <TouchableOpacity style={styles.button}
              onPress={() => {
                getRandomMovie();
              }}>
                <Text style={styles.textButton}><FontAwesomeIcon icon={faFilm} size={40} color={"black"} /></Text>
          </TouchableOpacity>}
        </View>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button : {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#68FF00",

    borderRadius:100,
    height: 75,
    width: 75
  },
});
