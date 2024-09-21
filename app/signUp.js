import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';
export default function SignUp() {
  const router = useRouter();
  const{register} = useAuth();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current) {
      Alert.alert('Đăng ký', "Xin hãy nhập đầy đủ thông tin");
      return;
    }
    setLoading(true);
    let response = await register(emailRef.current,passwordRef.current,usernameRef.current,profileRef.current)
   setLoading(false);
   console.log('Kết quả: ',response);
   if(!response.success){
    Alert.alert('Đăng ký',response.msg);
   }
    // Xử lý đăng ký thành công ở đây
  };

  return (
    <CustomKeyboardView>
      <StatusBar barStyle="dark-content" />
      <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
        <View style={{ alignItems: 'center' }}>
          <Image style={{ height: hp(30), width: hp(50) }} source={require('../assets/images/avatar.png')} />
        </View>
        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: hp(4), fontWeight: 'bold', letterSpacing: 0.5, textAlign: 'center', color: '#1F2937' }}>
            Đăng Ký
          </Text>
          {/* Input */}
          <View className="gap-4">
            <View style={{ height: hp(7), flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 25, paddingHorizontal: 10 }}>
              <Feather name='user' size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={value => usernameRef.current = value}
                style={{ flex: 1, fontSize: hp(2), fontWeight: '600', color: '#4B5563', marginLeft: 8 }}
                placeholder='Họ và tên'
                placeholderTextColor={'gray'}
              />
            </View>
            <View style={{ height: hp(7), flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 25, paddingHorizontal: 10 }}>
              <Octicons name='mail' size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={value => emailRef.current = value}
                style={{ flex: 1, fontSize: hp(2), fontWeight: '600', color: '#4B5563', marginLeft: 8 }}
                placeholder='Địa chỉ Email'
                placeholderTextColor={'gray'}
              />
            </View>
          </View>

          <View style={{ height: hp(7), flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 25, paddingHorizontal: 10 }}>
            <Octicons name='lock' size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={value => passwordRef.current = value}
              style={{ flex: 1, fontSize: hp(2), fontWeight: '600', color: '#4B5563', marginLeft: 8 }}
              placeholder='Mật khẩu'
              secureTextEntry
              placeholderTextColor={'gray'}
            />
          </View>
          <View style={{ height: hp(7), flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 25, paddingHorizontal: 10 }}>
            <Feather name='image' size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={value => profileRef.current = value}
              style={{ flex: 1, fontSize: hp(2), fontWeight: '600', color: '#4B5563', marginLeft: 8 }}
              placeholder='Đường dẫn hình ảnh'
              placeholderTextColor={'gray'}
            />
          </View>
          {/* Nút xác nhận */}
          <View>
            {
              loading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(10)} />
                </View>
              ) : (
                <TouchableOpacity 
                  onPress={handleRegister}
                  style={{ height: hp(6.5) }} className="bg-indigo-500 justify-center items-center rounded-xl">
                  <Text style={{ fontSize: hp(2.7) }} className="text-white font-bold tracking-wider"> 
                    Đăng ký
                  </Text>
                </TouchableOpacity>
              )
            }
          </View>
          
          {/* Đăng nhập */}
          <View className="flex-row justify-center ">
            <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500 ">Bạn đã có tài khoản?</Text>
            <Pressable onPress={() => router.push('signIn')}>
              <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-indigo-500 "> Đăng nhập </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
