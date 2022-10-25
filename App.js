import React from 'react';
import Home from './screens/Home';
import Detail from './screens/Detail';
import Search from './screens/Search';
/* import Navbar from './components/Navbar'; */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
            headerTransparent: true,
            /* header: ({navigation}) => (
              <Navbar navigation={navigation} main={true} />
            ), */
          }}
          component={Home}
        />
        <Stack.Screen
          name="Detail"
          options={{
            headerTransparent: true,
            /* header: ({navigation}) => <Navbar navigation={navigation} />, */
            headerShown: false,
          }}
          component={Detail}
        />
        <Stack.Screen
          name="Search"
          options={{
            headerTransparent: true,
            /* header: ({navigation}) => <Navbar navigation={navigation} />, */
            headerShown: false,
          }}
          component={Search}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
