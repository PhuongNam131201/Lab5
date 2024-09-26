import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';
export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {login} = useAuth();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const handleLogin = async()=>{
    if(!emailRef.current||!passwordRef.current){
      Alert.alert('Đăng nhập', "Xin hãy nhập đầy đủ thông tin");
      return;
    }
    setLoading(true);
    const response = await login(emailRef.current,passwordRef.current);
    setLoading(false);
    console.log('Quá trình đăng nhập: ',response);
    if(!response.success){
      Alert.alert('Đăng nhập',response.msg)
    }
    //đăng nhập thành công

  }
  return (
    <CustomKeyboardView>
      <StatusBar barStyle="dark-content" />
      <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
        <View style={{ alignItems: 'center' }}>
          <Image style={{ height: hp(50), width: hp(50) }} source={require('../assets/images/logout.png')} />
        </View>
        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: hp(4), fontWeight: 'bold', letterSpacing: 0.5, textAlign: 'center', color: '#1F2937' }}>
            Đăng Nhập
          </Text>
          {/* Input */}
          <View className="gap-4">
            <View style={{ height: hp(7), flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 25, paddingHorizontal: 10 }}>
              <Octicons name='mail' size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={value=> emailRef.current=value}
                style={{ flex: 1, fontSize: hp(2), fontWeight: '600', color: '#4B5563', marginLeft: 8 }}
                placeholder='Địa chỉ Email'
                placeholderTextColor={'gray'}
              />
            </View>
          </View>
          
          <View className="gap-3">
            <View style={{ height: hp(7), flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 25, paddingHorizontal: 10 }}>
              <Octicons name='lock' size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={value=> passwordRef.current=value}
                style={{ flex: 1, fontSize: hp(2), fontWeight: '600', color: '#4B5563', marginLeft: 8 }}
                placeholder='Mật khẩu'
                secureTextEntry
                placeholderTextColor={'gray'}
              />
            </View>
            <Text style={{fontSize:hp(1.8)}} className="font-semibold text-right text-neutral-500">Quên mật khẩu ?</Text>
          </View>
          {/*nut xac nhan */}
          <View>
            {
              loading?(
                <View className="flex-row justify-center">
                  <Loading size={hp(10)}>

                  </Loading>
                </View>
              ):(
                <TouchableOpacity 
                    onPress={handleLogin}
                    style={{height:hp(6.5)}} className="bg-indigo-500 justify-center items-center rounded-xl">
                    <Text style={{fontSize:hp(2.7)}} className="text-white font-bold tracking-wider"> 
                      Đăng nhập
                    </Text>
              </TouchableOpacity>
              )
            }
          </View>
          
          {/* đăng ký */}
          <View className="flex-row justify-center ">
            <Text style={{fontSize: hp(1.8)}} className="font-semibold text-neutral-500 ">Bạn không có tài khoản?</Text>
            <Pressable onPress={()=> router.push('signUp')}>
              <Text style={{fontSize: hp(1.8)}} className="font-semibold text-indigo-500 "> Đăng ký </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
