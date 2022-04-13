import React, { useState,useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import {
   widthPercentageToDP as w,
   heightPercentageToDP as h,
 } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import AsyncStorage from '@react-native-community/async-storage';

import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['']);

const AddTask = ({navigation}) => {
    const[data,setData] = useState([])
    const [isChecked,setisChecked] = useState(1)
    const [title, settitle] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [startTime, setstartTime] = useState('');
    const [EndTime, setEndTime] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
    const [reminder, setreminder] = useState('10 minutes early');
    const [reminderdata, setreminderdata] = useState(
        [
            {
                value: '10 minutes early',
            },
            {
                value: '20 minutes early',
            },
            {
                value: '30 minutes early',
            },
            {
                value: '40 minutes early',
            },
            {
                value: '50 minutes early',
            },
            {
                value: '60 minutes early',
            },
        ]
    );
    const [repeat, setrepeat] = useState('Daily');
    const [repeatdata, setrepeatdata] = useState(
        [
            {
                value: 'Daily',
            },
            {
                value: 'Weekly',
            },
            {
                value: 'Monthly',
            },
        ]
    );

    useEffect(() => {
        var date = new Date().getDate(); //To get the Current Date
        var month = new Date().getMonth() + 1; //To get the Current Month
        var year = new Date().getFullYear();
        var hour = new Date().getHours();
        var minute = new Date().getMinutes();
        const startdate = '1' + '-' + month + '-' + year;
        setDateFrom(startdate);
        if(hour < 12){
            const fullTime = `${hour}:${minute} Am`;            
            console.log('A Time has been pcked: ', fullTime.toString());
            setstartTime(fullTime)
            setEndTime(fullTime);
            setEndTimePickerVisible(false);    
        } else {
            const fullTime = `${hour}:${minute} Pm`;
            console.log('A Time has been pcked: ', fullTime.toString());
            setstartTime(fullTime)
            setEndTime(fullTime);
            setEndTimePickerVisible(false);    
        }
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
        
    const handleConfirmDate = date => {
        const d = new Date(date);
        const dat = d.getDate();
        const month = d.getMonth();
        const year = d.getFullYear();
        const fullDate = `${dat}-${month + 1}-${year}`;
        console.log('A date has been pcked: ', fullDate.toString());
        setDateFrom(fullDate);
        setDatePickerVisibility(false);
      };

    const handleConfirmStartTime = time => {
        const d = new Date(time);
        const hour = d.getHours();
        const minute = d.getMinutes();
        const fullTime = `${hour}:${minute}`;
        if(hour < 12){
            const fullTime = `${hour}:${minute} Am`;            
            console.log('A Time has been pcked: ', fullTime.toString());
            setstartTime(fullTime);
            setStartTimePickerVisible(false);    
        } else {
            const fullTime = `${hour}:${minute} Pm`;
            console.log('A Time has been pcked: ', fullTime.toString());
            setstartTime(fullTime);
            setStartTimePickerVisible(false);    
        }
      };

    const handleConfirmEndTime = time => {
        const d = new Date(time);
        const hour = d.getHours();
        const minute = d.getMinutes();
        const fullTime = `${hour}:${minute}`;
        if(hour < 12){
            const fullTime = `${hour}:${minute} Am`;            
            console.log('A Time has been pcked: ', fullTime.toString());
            setEndTime(fullTime);
            setEndTimePickerVisible(false);    
        } else {
            const fullTime = `${hour}:${minute} Pm`;
            console.log('A Time has been pcked: ', fullTime.toString());
            setEndTime(fullTime);
            setEndTimePickerVisible(false);    
        }
      };
    
      const createTask = () => {
          let data1 = {
              title:title,
              check:false,
              deadline:dateFrom,
              startTime:startTime,
              EndTime:EndTime,
              reminder:reminder,
              repeat:repeat
          }
          console.log('DATA',data)
          data.push(data1)
          AsyncStorage.setItem('AddTask', JSON.stringify(data), () => {
            navigation.replace('Home');
          });
      }

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
                    <TouchableOpacity
                    onPress={() => {navigation.goBack()}}
                     style={{
                       height:h('8%'),
                       width:'15%',
                    //    backgroundColor:'#ada',
                       justifyContent:'center',
                       alignItems:'center',
                   }}>
                       <Icon name={'keyboard-arrow-left'} color={'#0008'} size={h('3%')} />
                   </TouchableOpacity>
                  <View style={{
                      height:h('8%'),
                      width:'70%',
                   //    backgroundColor:'#ada',
                      justifyContent:'center'
                  }}>
                      <Text style={{color:'#000',fontSize:h('2.7%'),fontWeight:'bold'}}>Add task</Text>
                  </View>
              </View>
              <View style={{
                  height:h('3%'),
                  width:'100%',
                //   backgroundColor:'#ada',
                  justifyContent:'center',
                  marginTop:h('2%'),
              }}>
                  <Text style={{paddingLeft:h('3%'),color:'#000',fontSize:h('1.7%'),fontWeight:'bold'}}>Title</Text>
              </View>
              <View style={{
                  height:h('6%'),
                  width:'88%',
                  backgroundColor:'#0001',
                  justifyContent:'center',
                  alignSelf:'center',
                  borderRadius:h('1%'),
              }}>
                  <TextInput
                  style={{paddingLeft:h('2%'),color:'#000'}}
                  onChangeText={(title) => settitle(title)}
                  placeholder={'Enter Title'}
                  placeholderTextColor={'#0008'}/>
              </View>
              <View style={{
                  height:h('3%'),
                  width:'100%',
                //   backgroundColor:'#ada',
                  justifyContent:'center',
                  marginTop:h('2%'),
              }}>
                  <Text style={{paddingLeft:h('3%'),color:'#000',fontSize:h('1.7%'),fontWeight:'bold'}}>Deadline</Text>
              </View>
              <TouchableOpacity
                onPress={() => setDatePickerVisibility(true)}
                style={{
                  height:h('6%'),
                  width:'88%',
                  backgroundColor:'#0001',
                  alignSelf:'center',
                  borderRadius:h('1%'),
                  flexDirection:'row',
                  alignItems:'center',
                  justifyContent:'space-between'
              }}>
                  <Text style={{color:'#0008',paddingLeft:h('2%')}}>{dateFrom}</Text>
                  <Icon name={'keyboard-arrow-down'} color={'#0008'} size={h('3%')} style={{paddingRight:h('2%')}} />
              </TouchableOpacity>
              <View style={{flexDirection:'row'}}>
                  <View style={{
                      width:'50%'
                  }}>
                    <View style={{
                        height:h('3%'),
                        width:'100%',
                        //   backgroundColor:'#ada',
                        justifyContent:'center',
                        marginTop:h('2%'),
                    }}>
                        <Text style={{paddingLeft:h('3%'),color:'#000',fontSize:h('1.7%'),fontWeight:'bold'}}>Start Time</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setStartTimePickerVisible(true)}
                        style={{
                        height:h('5%'),
                        width:'80%',
                        backgroundColor:'#0001',
                        borderRadius:h('1%'),
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between',
                        marginLeft:h('3%')
                    }}>
                        <Text style={{color:'#0008',paddingLeft:h('2%')}}>{startTime}</Text>
                        <Icon name={'access-time'} color={'#0008'} size={h('2%')} style={{paddingRight:h('2%')}} />
                    </TouchableOpacity>
                  </View>
                  <View style={{
                      width:'50%',
                      marginLeft:h('2%')
                  }}>
                    <View style={{
                        height:h('3%'),
                        width:'100%',
                        //   backgroundColor:'#ada',
                        justifyContent:'center',
                        marginTop:h('2%'),
                    }}>
                        <Text style={{color:'#000',fontSize:h('1.7%'),fontWeight:'bold'}}>End Time</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setEndTimePickerVisible(true)}
                        style={{
                        height:h('5%'),
                        width:'80%',
                        backgroundColor:'#0001',
                        borderRadius:h('1%'),
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between',
                    }}>
                        <Text style={{color:'#0008',paddingLeft:h('2%')}}>{EndTime}</Text>
                        <Icon name={'access-time'} color={'#0008'} size={h('2%')} style={{paddingRight:h('2%')}} />
                    </TouchableOpacity>
                  </View>
              </View>

              <View style={{
                  height:h('3%'),
                  width:'100%',
                //   backgroundColor:'#ada',
                  justifyContent:'center',
                  marginTop:h('2%'),
              }}>
                  <Text style={{paddingLeft:h('3%'),color:'#000',fontSize:h('1.7%'),fontWeight:'bold'}}>Remind</Text>
              </View>
              <View
                style={{
                    height:h('6%'),
                    width:'88%',
                    backgroundColor:'#0001',
                    justifyContent:'center',
                    borderRadius:h('1%'),
                    alignSelf:'center'
                }}>
                <Dropdown
                icon='chevron-down'
                iconColor='#0008'
                baseColor={'transparent'}
                  value={reminder}
                  data={reminderdata}
                  onChangeText={(value: React.SetStateAction<string>) => setreminder(value)}
                  containerStyle={{
                    // backgroundColor: '#faf',
                    height:h('5.5%'),
                    width: '94%',
                    marginTop: -h('2.8%'),
                    borderBottomWidth: 0,
                    marginLeft:h('1%')
                  }}
                  selectedItemColor={'#000'}
                  underlineColor='transparent'
                />
              </View>
              <View style={{
                  height:h('3%'),
                  width:'100%',
                //   backgroundColor:'#ada',
                  justifyContent:'center',
                  marginTop:h('2%'),
              }}>
                  <Text style={{paddingLeft:h('3%'),color:'#000',fontSize:h('1.7%'),fontWeight:'bold'}}>Repeat</Text>
              </View>
              <View
                style={{
                    height:h('7%'),
                    width:'88%',
                    backgroundColor:'#0001',
                    justifyContent:'center',
                    borderRadius:h('1%'),
                    alignSelf:'center'
                }}>
                <Dropdown
                icon='chevron-down'
                iconColor='#0008'
                baseColor={'transparent'}
                  value={repeat}
                  data={repeatdata}
                  onChangeText={(value: React.SetStateAction<string>) => setrepeat(value)}
                  containerStyle={{
                    // backgroundColor: '#faf',
                    height:h('5.5%'),
                    width: '94%',
                    marginTop: -h('2.8%'),
                    borderBottomWidth: 0,
                    marginLeft:h('1%')
                  }}
                  selectedItemColor={'#000'}
                  underlineColor='transparent'
                />
              </View>

              <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirmDate}
                    onCancel={() => setDatePickerVisibility(false)}
                    />
              <DateTimePickerModal
                    isVisible={isStartTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirmStartTime}
                    onCancel={() => setStartTimePickerVisible(false)}
                    />
              <DateTimePickerModal
                    isVisible={isEndTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirmEndTime}
                    onCancel={() => setEndTimePickerVisible(false)}
                    />
                <TouchableOpacity 
               onPress={() => {createTask()}}
               style={{
                   height:h('6%'),
                   width:'88%',
                   backgroundColor:'green',
                   alignSelf:'center',
                   alignItems:'center',
                   justifyContent:'center',
                   borderRadius:h('1.5%'),
                   marginTop:h('5%')
               }}>
                   <Text style={{color:'#fff'}}>Create a Task</Text>
               </TouchableOpacity>
        </View>
  );
};
 export default AddTask;