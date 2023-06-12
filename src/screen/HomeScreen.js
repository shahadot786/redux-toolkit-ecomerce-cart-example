import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addProductToCart} from '../store/slice/CartSlice';
import {increaseQty} from '../store/slice/ProductSlice';

const HomeScreen = ({navigation}) => {
  const products = useSelector(state => state.product);
  const cartItem = useSelector(state => state.cart);
  //   console.log({cartItem});
  const dispatch = useDispatch();
  //get total
  const getTotal = () => {
    let total = 0;
    console.log({cartItem});
    cartItem.map(item => {
      total = total + item.qty * item.price;
    });
    return total;
  };
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Redux Toolkit Demo</Text>
      </View>
      {/* list */}
      <View>
        {products.map((item, index) => {
          return (
            <View style={styles.listCard} key={index}>
              <View>
                <Image source={{uri: `${item?.image}`}} style={styles.image} />
              </View>
              <View>
                <Text style={{fontSize: 17, color: '#000', fontWeight: '600'}}>
                  {item?.name}
                </Text>
                <Text style={{fontSize: 15}}>{item?.brand}</Text>
                <Text
                  style={{color: '#15c55d', fontWeight: '700', fontSize: 16}}>
                  {`৳ ${item?.price}`}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  {console.log({item})}
                  {item.qty == 0 ? (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(addProductToCart(item));
                          dispatch(increaseQty(item));
                        }}
                        activeOpacity={0.6}
                        style={{
                          backgroundColor: '#055e2a',
                          width: 100,
                          paddingHorizontal: 5,
                          borderRadius: 5,
                          paddingVertical: 2,
                          alignItems: 'center',
                          marginVertical: 5,
                        }}>
                        <Text style={{color: '#fff'}}>Add To Cart</Text>
                      </TouchableOpacity>
                    </>
                  ) : null}
                  {item.qty == 0 ? null : (
                    <>
                      <TouchableOpacity style={styles.gBtn}>
                        <Text style={{color: '#fff', fontWeight: 'bold'}}>
                          -
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 5,
                          color: '#000',
                          fontWeight: 'bold',
                        }}>
                        {item.qty}
                      </Text>
                      <TouchableOpacity style={styles.gBtn}>
                        <Text style={{color: '#fff', fontWeight: 'bold'}}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </View>
      {cartItem.length > 0 && (
        <>
          <View
            style={{
              width: '100%',
              height: 60,
              backgroundColor: '#fff',
              position: 'absolute',
              bottom: 0,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <View>
              <Text style={{color: '#000'}}>
                Added Items({cartItem.length})
              </Text>
              <Text style={{color: '#000'}}>Total: {getTotal()}</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Products')}
              activeOpacity={0.6}
              style={{
                backgroundColor: '#055e2a',
                width: 100,
                paddingHorizontal: 5,
                borderRadius: 5,
                paddingVertical: 2,
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <Text style={{color: '#fff'}}>View Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#daddd9',
  },
  header: {
    height: 65,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  listCard: {
    paddingVertical: 15,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    gap: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  gBtn: {
    width: 20,
    height: 20,
    backgroundColor: '#055e2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});
