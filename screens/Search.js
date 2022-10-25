import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BackIcon from 'react-native-vector-icons/Feather';
import {searchMovieTv} from '../services/services';
import Card from '../components/Card';
import Error from '../components/Error';

const Search = ({navigation}) => {
  const [text, onChangeText] = useState();
  const [searchResults, setSearchResults] = useState();
  const [error, setError] = useState(false);

  const onsubmit = query => {
    //console.log(query);
    //Forma recomendada de traer los datos
    Promise.all([searchMovieTv(query, 'movie'), searchMovieTv(query, 'tv')])
      .then(([movies, tv]) => {
        const data = [...movies, ...tv];
        setSearchResults(data);
      })
      .catch(() => {
        setError(true);
      });

    //Otra forma de traer los datos(No recomendada)
    /* searchMovieTv(query, 'movie')
      .then(data => {
        setSearchResults(data);
      })
      .catch(() => {
        setError(true);
      }); */
  };
  return (
    <React.Fragment>
      <SafeAreaView>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <BackIcon name={'chevron-left'} size={30} color={'gray'} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              /* value={number} */
              placeholder="Search Movie or TV Show"
              keyboardType="ascii-capable"
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              onsubmit(text);
            }}>
            <Icon name={'search-outline'} size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchItems}>
          {/* Searched items results */}
          {searchResults && searchResults.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResults}
              /* horizontal={true} */
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} />
              )}
              KeyExtractor={item => item.id}
            />
          )}

          {/* When searched but no results */}
          {searchResults && searchResults.length == 0 && (
            <View style={[styles.empty, {paddingTop: 20}]}>
              <Text>No results matching your criteria.</Text>
              <Text>Try different keywords.</Text>
            </View>
          )}

          {/* When nothing is searched */}
          {!searchResults && (
            <View style={styles.empty}>
              <Text>Type something to start searching</Text>
            </View>
          )}

          {/* Error */}
          {error && <Error />}
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 15,
    borderWidth: 1,
    height: 50,
    padding: 8,
  },
  container: {
    padding: 10,
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
  },
  searchItems: {
    padding: 5,
  },

  /* noResults: {
    paddingTop: 20,
  }, */
});

export default Search;
