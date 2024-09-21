import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function StartPage() {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size={'large'} color="gray"></ActivityIndicator>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    paddingTop:40,
    backgroundColor:'pink',
    paddingLeft:10,
  },
  textTop:{

  },
})