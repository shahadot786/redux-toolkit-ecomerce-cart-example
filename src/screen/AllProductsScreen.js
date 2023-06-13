import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {useProductsQuery} from '../services/productsApi';

const AllProductsScreen = ({navigation}) => {
  const {data, error, isLoading, isError, isFetching, isSuccess} =
    useProductsQuery();
  // console.log({data});

  //handle on Press
  const handelOnPressItem = itemData => {
    // console.log({id});
    navigation.navigate('ProductsDetails', {itemData: itemData});
  };

  const Item = ({itemData, title, thumbnail, price, rating, category}) => (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.item}
      onPress={() => handelOnPressItem(itemData)}>
      <Image
        source={{uri: `${thumbnail}`}}
        style={{
          width: 140,
          height: 120,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          resizeMode: 'contain',
        }}
      />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text>{`$ ${price}`}</Text>
        <Text>{`★ ${rating}`}</Text>
        <Text
          style={{textTransform: 'capitalize'}}>{`Category: ${category}`}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#10101d" />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data?.products}
          renderItem={({item}) => (
            <Item
              itemData={item}
              title={item?.title}
              thumbnail={item?.thumbnail}
              price={item?.price}
              rating={item?.rating}
              category={item?.category}
            />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default AllProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10101d',
  },
  item: {
    backgroundColor: '#9fa1a0',
    // paddingVertical: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    flexDirection: 'row',
    gap: 15,
  },
  title: {
    fontSize: 16,
    textTransform: 'capitalize',
    fontWeight: '600',
    marginVertical: 8,
  },
});
