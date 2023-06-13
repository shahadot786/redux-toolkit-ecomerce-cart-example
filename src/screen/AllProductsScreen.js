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
  TextInput,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useProductsQuery,
  useSearchQuery,
  useUpdateProductMutation,
} from '../services/productsApi';

const AllProductsScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newData, setNewData] = useState();
  // const {data, isLoading} = useProductsQuery();
  const {data, isLoading} = useSearchQuery(searchQuery);

  // console.log({data});

  //handle on Press
  const handelOnPressItem = itemData => {
    // console.log({id});
    navigation.navigate('ProductsDetails', {itemData: itemData});
    setSearchQuery('');
  };

  //handle search
  useEffect(() => {}, [searchQuery, newData]);

  //add product
  const product = {
    id: '40',
    title: 'Macbook Pro',
    description: 'This is a test macbook pro. This is for only developer.',
    price: 1499,
    rating: 4.88,
    category: 'laptops',
    thumbnail:
      'https://imageio.forbes.com/specials-images/imageserve/640e043c5321270f2db50057/2020-Apple-MacBook-Pro/0x0.jpg',
  };
  //update product
  const updateProducts = {
    id: '40',
    title: 'Macbook Air',
    description: 'This is a test macbook air. This is for only developer.',
    price: 999,
    rating: 4.22,
    category: 'laptops',
    thumbnail:
      'https://www.digitaltrends.com/wp-content/uploads/2020/12/macbook-air-m1.jpg',
  };
  //rtk mutation
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  //press handler
  //add product
  const onAddPressHandler = async () => {
    const response = await addProduct(product);
    const data = response?.data;
    setNewData(data);
    // console.log(data?.title);
  };
  //update product
  const onUpdatePressHandler = async () => {
    const response = await updateProduct(updateProducts);
    const data = response?.data;
    setNewData(data);
  };
  //delete product
  const onDeletePressHandler = async () => {
    const response = await deleteProduct(product.id);
    setNewData(null);
  };
  //render item
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
        <ActivityIndicator size="large" color="#dddddd" />
      ) : (
        <>
          <View>
            <TextInput
              style={{
                borderColor: '#ddd',
                borderWidth: 1,
                margin: 10,
                borderRadius: 5,
                paddingHorizontal: 10,
                color: '#ddd',
              }}
              onChangeText={query => setSearchQuery(query)}
              value={searchQuery}
              placeholder="Search products.."
              placeholderTextColor={'#ddd'}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20,
              }}>
              <Button
                color="#444444"
                title="Add"
                onPress={() => onAddPressHandler()}
              />
              <Button
                color="#726161"
                title="Update"
                onPress={() => onUpdatePressHandler()}
              />
              <Button
                color="#240a0a"
                title="Delete"
                onPress={() => onDeletePressHandler()}
              />
            </View>
          </View>
          {newData ? (
            <Item
              itemData={newData}
              title={newData?.title}
              thumbnail={newData?.thumbnail}
              price={newData?.price}
              rating={newData?.rating}
              category={newData?.category}
            />
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
        </>
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
