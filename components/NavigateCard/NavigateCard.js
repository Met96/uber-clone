import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import tw from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from "@env";
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, setDestination } from '../../redux/slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from '../NavFavourites/NavFavourites';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const destination = useSelector(selectDestination);

    useEffect(() => {
        if(!destination) return;
        else navigation.navigate("RideOptionsCard");
    }, [destination])

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Scegli destinazione</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete
                        placeholder='Dove si va?'
                        minLength={2}
                        enablePoweredByContainer={false}
                        query={{
                            key: GOOGLE_API_KEY,
                            language: 'it',
                        }}
                        onFail={(data, details = null) => {
                            console.log("error", data, details);
                        }}
                        styles={toInputBoxStyles}
                        debounce={400}
                        fetchDetails={true}
                        returnKeyType={"search"}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        onPress={(data, details = null) => {
                            dispatch(setDestination({
                                location: details.geometry.location,
                                description: data.description
                            }));
                            navigation.navigate("RideOptionsCard");
                        }}
                    />
                </View>
                <NavFavourites />
            </View>
            <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
                <TouchableOpacity style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`} onPress={() => navigation.navigate('RideOptionsCard')}>
                    <Icon
                        name="car"
                        type='font-awesome'
                        color={"white"}
                        size={16}
                    />
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
                    <Icon
                        name="fast-food-outline"
                        type='ionicon'
                        color={"black"}
                        size={16}
                    />
                    <Text style={tw`text-center`}>Eat</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0
    }
})