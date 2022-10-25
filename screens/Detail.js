import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  Text,
  View,
  Modal,
  Pressable,
} from 'react-native';
//import StarRating from 'react-native-star-rating';
import {getMovie} from '../services/services';
import {AirbnbRating} from 'react-native-ratings';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';
import {WebView} from 'react-native-webview';
import BackIcon from 'react-native-vector-icons/Feather';

const placeholderImage = require('../assets/images/placeholder.png');

const height = Dimensions.get('screen').height;

const Detail = ({route, navigation}) => {
  //Obtenemos el id de la película a la que hemos dado click
  const movieId = route.params.movieId;

  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function navigate() {
    navigation.navigate('Home');
  }

  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setMovieDetail(movieData);
      //console.log(movieData);
      setLoaded(true);
    });
  }, [movieId]);
  const videoShown = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500/' +
                        movieDetail.poster_path,
                    }
                  : placeholderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={videoShown} />
              </View>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genre => {
                    return (
                      <Text style={styles.genre} key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })}
                  <Text></Text>
                </View>
              )}
              <AirbnbRating
                isDisabled={true}
                count={5}
                defaultRating={movieDetail.vote_average / 2}
                size={25}
                showRating={false}
              />
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.release}>
                {'Release date: ' +
                  dateFormat(movieDetail.release_date, 'mmmm dS, yyyy')}
              </Text>
            </View>
          </ScrollView>
          <Modal
            supportedOrientations={['portrait', 'landscape']}
            animationType="slide"
            visible={modalVisible}>
            <View style={styles.videoModal}>
              <BackIcon
                onPress={videoShown}
                /* style={styles.Icon} */
                name={'chevron-left'}
                size={30}
                color={'#E33463'}
              />
              <WebView
                source={{
                  uri: 'https://vjs.zencdn.net/v/oceans.mp4',
                }}
                style={styles.video}
                allowsFullscreenVideo={true}
                /* onNavigationStateChange={() => videoShown()} */

                /* navigator={navigation} */
                /* setDisplayZoomControls={true} */
              />
            </View>
          </Modal>
        </View>
      )}
      {!loaded && <ActivityIndicator size="large" />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: height / 1.5,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#000',
  },
  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  genre: {
    marginRight: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  overview: {
    padding: 15,
    color: '#000',
  },
  release: {
    fontWeight: 'bold',
    color: '#000',
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
  videoModal: {
    backgroundColor: '#000',
    flex: 1,
    /* justifyContent: 'center',
    alignItems: 'center', */
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default Detail;
