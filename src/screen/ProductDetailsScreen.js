import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useProductQuery} from '../services/productsApi';

const ProductDetailsScreen = ({route, navigation}) => {
  const {itemData} = route.params;

  const {data, isLoading} = useProductQuery(itemData?.id);
  //   console.log(data);
  return isLoading ? (
    <ActivityIndicator size="large" color="#10101d" />
  ) : (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={{fontSize: 40, color: '#dede'}}>☚</Text>
      </Pressable>
      <Image
        source={{uri: `${data?.thumbnail}`}}
        style={{width: '100%', height: 280, resizeMode: 'cover'}}
      />
      <Text style={{fontSize: 28, color: '#ddd'}}>{data?.title}</Text>
      <Text style={{color: '#dfdf', textAlign: 'center'}}>
        {data?.description}
      </Text>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10101d',
    alignItems: 'center',
    paddingTop: 0,
    flexDirection: 'column',
    gap: 15,
  },
});
