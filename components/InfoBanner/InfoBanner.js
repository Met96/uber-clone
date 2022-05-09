import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';

const InfoBanner = () => {

    const navigation = useNavigation();

    return (
        <View style={tw`w-full h-40 bg-gray-800 rounded-3 mb-5 flex flex-row justify-between`}>
            <View style={tw`h-full w-60% flex flex-row flex-wrap content-center p-3`}>
                <Text style={tw`text-white text-lg font-semibold`}>Una corsa in grande stile</Text>
                <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
                    <Text style={tw`text-white text-sm font-semibold`}>User Black 
                        <Icon
                        name="arrow-forward-outline"
                        type="ionicon"
                        color={'white'}
                        size={13}
                        style={tw`mt-1.2 ml-1`}
                        />
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={tw`h-full w-40%`}>
                <ImageBackground
                    source={{
                        uri: `https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_3360,h_1416/v1613521692/assets/d9/ce6c00-32b0-4b93-9f0d-6f927d93da08/original/Rider_Home_bg_desktop2x.png`
                    }}
                    resizeMode="cover"
                    imageStyle={{ borderRadius: 10}}
                    style={tw`w-full h-full`}
                />
            </View>
        </View>
    )
}

export default InfoBanner;

const styles = StyleSheet.create({})