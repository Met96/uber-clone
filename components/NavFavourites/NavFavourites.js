import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrigin, setDestination } from '../../redux/slices/navSlice';
import { useNavigation } from '@react-navigation/native';

const data = [
    {
        id: 123,
        icon: "home",
        description: "Casa",
        destination: "Via Giuseppe Stefani 79, 44124 Ferrara",
        location: {
            lat: 44.8176665,
            lng: 11.6069663
        }
    },
    {
        id: 456,
        icon: "briefcase",
        description: "Lavoro",
        destination: "Via Sile 18, 20159 Milano",
        location: {
            lat: 45.4397448,
            lng: 9.2191855
        }
    },
]

const NavFavourites = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);

    const goToDestination = async (idItem) => {
        const itemSelected = data.filter(item => item.id === idItem);
        await dispatch(setDestination({
            location: itemSelected[0]?.location,
            description: itemSelected[0]?.destination
        }));
        navigation.navigate("MapScreen");
    }

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
                <View style={[tw`bg-gray-200`, {height: 0.5}]} />
            )}
            renderItem={({item: {id, description, destination, icon}}) => (
                <TouchableOpacity style={tw`flex-row items-center py-5 ${!origin ? `opacity-30`: null}`} disabled={!origin} onPress={() => goToDestination(id)}>
                    <Icon
                        style={tw`mr-2 p-3`}
                        name={icon}
                        type="ionicon"
                        color="#666666"
                        size={20}
                    />
                    <View>
                        <Text style={tw`font-semibold text-lg`}>{description}</Text>
                        <Text style={tw`text-gray-500`}>{destination}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default NavFavourites

const styles = StyleSheet.create({})