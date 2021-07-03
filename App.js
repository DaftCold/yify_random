import React from 'react';
import { Linking, ScrollView, Dimensions, Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilm, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

export default function App() {

  const [isLoading, setLoading] = useState(true);
  const [movieCount, setMovieCount] = useState(10000);
  const [randomMovie, setRandomMovie] = useState([]);

  const dimensions = Dimensions.get('window');

  useEffect(() => {
    if(movieCount == 10000){
      fetch('https://yts.mx/api/v2/list_movies.json')
        .then((response) => response.json())
        .then((json) => {
          setMovieCount(json.data.movie_count);
          console.log(movieCount);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setLoading(false);
          getRandomMovie();
        });
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
    <ScrollView contentContainerStyle={styles.container}>
       {isLoading ? <Text>Loading...</Text> :

      (<View style={styles.container}> 
        <Image 
        style={styles.image}
        source={{uri : randomMovie.large_cover_image}}
        />
        <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>{randomMovie.title}</Text>       
          <Text style={styles.description}>{randomMovie.description_full}</Text>
        </ScrollView>
        <TouchableOpacity style={styles.button}
              onPress={() => {
                getRandomMovie();
              }}>
                <Text style={styles.textButton}><FontAwesomeIcon icon={faFilm} size={40} color={"black"} /></Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.button2}
            onPress={() => {
              var torrent = randomMovie.torrents[0];
              console.log(torrent);
              Linking.openURL(torrent.url).catch(err => console.error("Couldn't load page", err));
            }}>
              <Text style={styles.textButton}><FontAwesomeIcon icon={faPlay} size={40} color={"black"} /></Text>
        </TouchableOpacity>
        </View>)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image : {
    height: 390,
    width: 260,
    marginTop : 50
  },
  button : {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6AC045",
    marginTop : 30,
    borderRadius:100,
    height: 75,
    width: 75,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30
  },button2 : {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6AC045",
    marginTop : 30,
    borderRadius:100,
    height: 75,
    width: 75,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 30,
    bottom: 30
  },
  title : {
    color : "#FFFFFF",
    fontSize : 30,
    margin : 10,
    textAlign : 'center'
  },
  description : {
    color : "#739191",
    fontSize : 15,
    margin : 10,
    marginBottom : 120,
    textAlign : 'center'
  },
  scrollView : {
    height: 100,
  }
});
