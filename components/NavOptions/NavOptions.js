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


    const renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate(item.screen)} disabled={!origin}>
                <View style={tw`p-2 bg-gray-300 m-2 w-auto rounded-4 ${!origin ? `opacity-20`: null}`}>
                    <Image
                        style={{ width: 80, height: 80, resizeMode: "contain" }}
                        source= {{
                            uri: item.image
                        }}
                    />
                </View>
                <Text style={tw`text-center font-semibold`}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderItem} />
    )
}

export default NavOptions

const styles = StyleSheet.create({})