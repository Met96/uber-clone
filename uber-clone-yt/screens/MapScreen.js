import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';

const MapScreen = () => {
    return (
        <SafeAreaView>
            <Text>MapScreen</Text>
            <View style={tw`h-1/2`}></View>
            <View style={tw`h-1/2`}></View>
        </SafeAreaView>
    )
}

export default MapScreen

const styles = StyleSheet.create({})