import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screen/HomeScreen';
import ProductsScreen from '../screen/ProductsScreen';
import {useDispatch} from 'react-redux';
import {Data} from '../Data';
import {addProducts} from '../store/slice/ProductSlice';
import AllProductsScreen from '../screen/AllProductsScreen';
import ProductDetailsScreen from '../screen/ProductDetailsScreen';

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
        initialRouteName="AllProducts"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="AllProducts" component={AllProductsScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Products" component={ProductsScreen} />
        <Stack.Screen name="ProductsDetails" component={ProductDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
