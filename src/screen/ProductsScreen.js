import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addProductToCart, removeProductToCart} from '../store/slice/CartSlice';

const ProductsScreen = () => {
  const cartItem = useSelector(state => state.cart);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>View Cart</Text>
      </View>
      {/* list */}
      <View>
        {cartItem.map((item, index) => {
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
                  {item.qty !== 0 && (
                    <>
                      <TouchableOpacity
                        style={styles.gBtn}
                        onPress={() => {
                          dispatch(removeProductToCart(item));
                        }}>
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
                      <TouchableOpacity
                        style={styles.gBtn}
                        onPress={() => {
                          dispatch(addProductToCart(item));
                        }}>
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
    </View>
  );
};

export default ProductsScreen;

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
