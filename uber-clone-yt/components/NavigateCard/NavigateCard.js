import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_API_KEY} from "@env";
import { useDispatch } from 'react-redux';
import { setDestination } from '../../redux/slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from '../NavFavourites/NavFavourites';

const NavigateCard = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>NavigateCard</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete
                        placeholder='Dove andiamo ?'
                        minLength={2}
                        enablePoweredByContainer={false}
                        query={{
                            key: GOOGLE_API_KEY,
                            language: 'it',
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