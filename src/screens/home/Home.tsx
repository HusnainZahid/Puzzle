 import React, { useState, useEffect } from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   View,
   TouchableOpacity
 } from 'react-native';
 import {
    widthPercentageToDP as w,
    heightPercentageToDP as h,
  } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import CheckBox from 'react-native-check-box';
import AsyncStorage from '@react-native-community/async-storage';

import {LogBox} from "react-native";

LogBox.ignoreLogs([
"exported from 'deprecated-react-native-prop-types'.",
])

 const Home = ({navigation}) => {
     const[data,setData] = useState([])
     const [isChecked,setisChecked] = useState(1)

     useEffect(() => {
        // AsyncStorage.removeItem('AddTask', (error, Data) => {})
        // alert('Done')
        const willFocusSubscription = navigation.addListener('focus', () => {
            GetData()
        });
      return willFocusSubscription;
      }, []);
    
      const GetData = () => {
        AsyncStorage.getItem('AddTask', (error, Data) => {
          if (!error && Data !== null) {
            console.log('Data', Data);
            const incomingData = JSON.parse(Data)
            console.log('incomingData', incomingData);
            // data.push(incomingData)
            setData(incomingData)
            console.log('data', data);
            let check = isChecked;
            setisChecked(check+1)
            } 
        });
      };
    
   return (
         <View
           style={{
               flex:1,
               backgroundColor:'#fff'
           }}>
               <SafeAreaView/>
               <View style={{
                   height:h('8%'),
                   width:'100%',
                //    backgroundColor:'#ada',
                   flexDirection:'row',
                   borderBottomWidth:h('.1%'),
                   borderColor:'#0003'
               }}>
                   <View style={{
                       height:h('8%'),
                       width:'70%',
                    //    backgroundColor:'#ada',
                       justifyContent:'center'
                   }}>
                       <Text style={{color:'#000',fontSize:h('2.7%'),paddingLeft:h('3%'),fontWeight:'bold'}}>To-Do App</Text>
                   </View>
                   <View style={{
                       height:h('8%'),
                       width:'9%',
                    //    backgroundColor:'#ada',
                       justifyContent:'center',
                       alignItems:'center',
                   }}>
                       <Icon name={'search-outline'} color={'#000'} size={h('2.2%')} />
                   </View>
                   <View style={{
                       height:h('8%'),
                       width:'9%',
                    //    backgroundColor:'#ada',
                       justifyContent:'center',
                       alignItems:'center',
                   }}>
                       <Icon name={'notifications-outline'} color={'#000'} size={h('2.2%')} />
                   </View>
                   <View style={{
                       height:h('8%'),
                       width:'9%',
                    //    backgroundColor:'#ada',
                       justifyContent:'center',
                       alignItems:'center',
                   }}>
                       <Icon name={'menu-outline'} color={'#000'} size={h('2.2%')} />
                   </View>
               </View>
               <ScrollView>
               {data.length > 0 ? (
               <View>
                <View style={{
                    height:h('8%'),
                    width:'100%',
                    // backgroundColor:'#aad',
                    justifyContent:'center'
                }}>
                    <Text style={{color:'#000',fontSize:h('2.2%'),fontWeight:'bold',paddingLeft:h('3%')}}>Completed tasks</Text>
                </View>
               {data.map((item,index) => {
                   return(
                       <View key={item.id}>
                        {item.check === true ? (
                       <View style={{
                           height:h('7%'),
                           width:'100%',
                        //    backgroundColor:'#ada',
                           flexDirection:'row',
                           alignItems:'center'
                       }}>
                        <CheckBox
                            style={{paddingLeft:h('3%')}}
                            onClick={()=>{
                                data[index].check = false
                                AsyncStorage.setItem('AddTask', JSON.stringify(data), () => {});                        
                                let check = isChecked;
                                setisChecked(check+1)
                            }}
                            isChecked={item.check}
                            checkBoxColor={'red'}
                        />

                            <Text style={{color:'#000',fontSize:h('2.2%'),paddingLeft:h('1%')}}>{item.title}</Text>
                       </View>                       
                       ):null}
                       </View>                       
                   )
               })}
                <View style={{
                    height:h('8%'),
                    width:'100%',
                    // backgroundColor:'#aad',
                    justifyContent:'center'
                }}>
                    <Text style={{color:'#000',fontSize:h('2%'),fontWeight:'bold',paddingLeft:h('3%')}}>Pending tasks</Text>
                </View>
               {data.map((item,index) => {
                   return(
                       <View key={item.id}>
                        {item.check === false ? (
                       <View style={{
                           height:h('7%'),
                           width:'100%',
                        //    backgroundColor:'#ada',
                           flexDirection:'row',
                           alignItems:'center'
                       }}>
                        <CheckBox
                            style={{paddingLeft:h('3%')}}
                            onClick={()=>{
                                data[index].check = true
                                AsyncStorage.setItem('AddTask', JSON.stringify(data), () => {});
                                let check = isChecked;
                                setisChecked(check+1)
                            }}
                            isChecked={item.check}
                            checkBoxColor={'red'}
                        />

                            <Text style={{color:'#000',fontSize:h('2%'),paddingLeft:h('1%')}}>{item.title}</Text>
                       </View>                       
                       ):null}
                       </View>                       
                   )
               })}
               </View>
               ):null}
                </ScrollView>
               <TouchableOpacity 
               onPress={() => {navigation.navigate('AddTask')}}
               style={{
                   height:h('6%'),
                   width:'88%',
                   backgroundColor:'green',
                   alignSelf:'center',
                   marginBottom:h('2%'),
                   alignItems:'center',
                   justifyContent:'center',
                   borderRadius:h('1.5%')
               }}>
                   <Text style={{color:'#fff'}}>Add a Task</Text>
               </TouchableOpacity>
         </View>
   );
 };
  export default Home;
 