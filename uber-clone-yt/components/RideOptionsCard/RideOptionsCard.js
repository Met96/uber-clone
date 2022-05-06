import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selecTravelTimeInformation } from '../../redux/slices/navSlice';


const uberData = [
    {
        id: "Uber-X-123",
        title: "UberX",
        multiplier: 1,
        image: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Black_v1.png"
    },
    {
        id: "Uber-X-456",
        title: "Uber XL",
        multiplier: 1.2,
        image: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberXL_Black_v2.png"
    },
    {
        id: "Uber-X-789",
        title: "Uber LUX",
        multiplier: 1.75,
        image: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Black_Premium_Driver_Red_Carpet.png"
    }
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {

    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selecTravelTimeInformation);

    return (
        <SafeAreaView style={tw`flex-grow bg-white`}>
            <View>
                <TouchableOpacity style={tw`absolute top-3 left-5 p-3 rounded-full z-2`}
                    onPress={() => navigation.navigate("NavigateCard")}>
                    <Icon
                        name="chevron-left"
                        type='fontawesome'
                    />
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>Scegli un corsa - {travelTimeInformation?.distance?.text}</Text>
            </View>

            <FlatList
                data={uberData}
                keyExtractor={(item) => item.id}
                renderItem= {({item: {id, title, multiplier, image}, item}) => (
                    <TouchableOpacity
                        style={tw`flex-row justify-between items-center px-10 ${id === selected?.id ? 'bg-gray-200' : null}`}
                        onPress={() => setSelected(item)}
                    >
                        <Image
                            style={{
                                width: 80,
                                height: 80,
                                resizeMode: "contain",
                                marginLeft: -30
                            }}
                            source={{
                                uri: image
                            }}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-base font-semibold`}>{title}</Text>
                            <Text style={tw`text-xs`}>{travelTimeInformation?.duration?.text} di viaggio</Text>
                        </View>
                        <Text style={tw`text-md font-semibold`}>

                            {
                                new Intl.NumberFormat("it-IT", {
                                    style: 'currency',
                                    currency: 'EUR'
                                }).format(
                                    (travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100
                                )
                            }

                        </Text>
                    </TouchableOpacity>
                )}
            />

            <View style={tw`mt-auto border-t border-gray-100`}>
                <TouchableOpacity style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-200'}`}>
                    <Text style={tw`text-center text-white text-xl`}>{selected ? `Hai scelto ${selected?.title}` : `Seleziona Uber` }</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard

const styles = StyleSheet.create({})