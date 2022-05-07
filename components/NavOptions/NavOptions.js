import { FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin} from '../../redux/slices/navSlice';

const data = [
    {
        id: 123,
        title: "Viaggia",
        image: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Black_v1.png",
        screen: "MapScreen",
    },
    {
        id: 456,
        title: "Cibo",
        image: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/italian.png",
        screen: "EatsScreen", // change in future
    },
]

const NavOptions = () => {

    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);

    return (
        <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
            <TouchableOpacity style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40 rounded-2`} onPress={() => navigation.navigate(item.screen)} disabled={!origin}>
                <View style={tw`${!origin ? `opacity-20`: null}`}>
                    <Image
                        style={{ width: 120, height: 120, resizeMode: "contain" }}
                        source= {{
                            uri: item.image
                        }}
                    />
                    <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                    <Icon style={tw`p-1 bg-black rounded-full w-8 mt-4`} type="antdesign" name="arrowright" color="white" />
                </View>
            </TouchableOpacity>
        )} />
    )
}

export default NavOptions

const styles = StyleSheet.create({})