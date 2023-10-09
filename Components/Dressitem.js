import { StyleSheet, Text, View,Pressable,Image } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart,decrementQuantityCart, incrementQuantity } from '../CartReducer';
import { decrementQuantityProduct, incrementQty } from '../ProductReducer';
const Dressitem = ({item}) => {
    const currency = String.fromCharCode(0x09F3);
    const disPatch = useDispatch();
    const cart = useSelector((state)=>state.cart.cart)
    const addItemToCart=()=>{
      disPatch(addToCart(item));//add to cart
      disPatch(incrementQty(item))// product
    };

    const decrease = ()=>{
      disPatch(decrementQuantityProduct(item))//product
      disPatch(decrementQuantityCart(item))//cart
    }

    const increment = ()=>{
      disPatch(incrementQuantity(item))//cart
      disPatch(incrementQty(item))//product
    }
  return (
    <View>
      <Pressable style={{backgroundColor:'#f8f8f8',borderRadius:8,padding:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between',margin:14}}>
      <View>
        <Image style={{width:70,height:70}} source={{uri:item.image}}/>
      </View>
      <View >
        <Text style={{fontSize:17,textTransform:'capitalize',width:80,marginBottom:7}}>{item.name}</Text>
        <Text style={{fontWeight:"bold",fontSize:16,width:60,color:'gray'}}>{item.price}{currency}</Text>
      </View>
      {cart.some((c) => c.id === item.id) ? (
          <Pressable
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <Pressable
              onPress={decrease}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#088F8F",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                -
              </Text>
            </Pressable>

            <Pressable>
              <Text
                style={{
                  fontSize: 19,
                  color: "#088F8F",
                  paddingHorizontal: 8,
                  fontWeight: "600",
                }}
              >
                {item.quantity}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                disPatch(incrementQuantity(item)); // cart
                disPatch(incrementQty(item)); //product
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#088F8F",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                +
              </Text>
            </Pressable>
          </Pressable>
        ) : (
          <Pressable onPress={addItemToCart} style={{ width: 80 }}>
            <Text
              style={{
                borderColor: "gray",
                borderRadius: 4,
                borderWidth: 0.8,
                marginVertical: 10,
                color: "#088F8F",
                textAlign: "center",
                padding: 5,
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Add
            </Text>
          </Pressable>
        )}
      
      </Pressable>
    </View>
  )
}

export default Dressitem

const styles = StyleSheet.create({})