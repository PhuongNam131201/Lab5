import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'

export default function Home() {
  const {logout,user} = useAuth();
  const handleLogout = async () => {
    await logout();
  }
  console.log('Tài khoản: ',user);
  return (
    <View className="flew-1 bg-white">
      
      
    </View>
  )
}