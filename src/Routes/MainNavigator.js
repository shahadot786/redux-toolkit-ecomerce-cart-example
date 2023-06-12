import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screen/HomeScreen';
import ProductsScreen from '../screen/ProductsScreen';
import {useDispatch} from 'react-redux';
import {Data} from '../Data';
import {addProducts} from '../store/slice/ProductSlice';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const dispatch = useDispatch();
  //fetch data
  useEffect(() => {
    Data.map(item => {
      dispatch(addProducts(item));
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Products" component={ProductsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
