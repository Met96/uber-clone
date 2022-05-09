import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import tw from 'twrnc';

const data = [
    {
        id: 123,
        icon: "home",
        location: "Casa",
        destination: "Via Giuseppe Stefani 79, 44124 Ferrara",
    },
    {
        id: 456,
        icon: "briefcase",
        location: "Lavoro",
        destination: "Via Sile 18, 20159 Milano",
    },
]

const NavFavourites = () => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
                <View style={[tw`bg-gray-200`, {height: 0.5}]} />
            )}
            renderItem={({item: {location, destination, icon}}) => (
                <TouchableOpacity style={tw`flex-row items-center py-5`}>
                    <Icon
                        style={tw`mr-2 p-3`}
                        name={icon}
                        type="ionicon"
                        color="#666666"
                        size={20}
                    />
                    <View>
                        <Text style={tw`font-semibold text-lg`}>{location}</Text>
                        <Text style={tw`text-gray-500`}>{destination}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default NavFavourites

const styles = StyleSheet.create({})