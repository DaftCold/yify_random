import React from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

export default function App() {

  const [isLoading, setLoading] = useState(true);
  const [movieCount, setMovieCount] = useState([]);
  const [randomMovie, setRandomMovie] = useState([]);

  useEffect(() => {
    fetch('https://yts.mx/api/v2/list_movies.json')
      .then((response) => response.json())
      .then((json) => {
        setMovieCount(json.data.movie_count);
        getRandomMovie();
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const getRandomMovie = () => {
    var id = Math.floor(Math.random() * movieCount);
                fetch("https://yts.mx/api/v2/movie_details.json?movie_id=" + id + "&with_images=true")
                .then((response) => response.json())
                .then((json) =>{
                  setRandomMovie(json.data.movie)
                  console.log(randomMovie.medium_cover_image) 
                })
                .catch((error) => {
                  console.error(error)
                  //getRandomMovie();
                })
                .finally(() => setLoading(false));
  } 

  return (
    <View style={styles.container}>
       {isLoading ? <Text>Loading...</Text> :

      (<View> 
        <Text>titre : {randomMovie.title}</Text>       
        
        {/* <TouchableOpacity style={styles.button}
              onPress={() => {
                getRandomMovie();
              }}>
                <Text style={styles.textButton}><FontAwesomeIcon icon={faFilm} size={40} color={"black"} /></Text>
          </TouchableOpacity>  */}
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
