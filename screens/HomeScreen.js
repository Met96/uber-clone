import React, { useEffect, useRef } from 'react'
import { View, Image, StyleSheet, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import NavOptions from '../components/NavOptions/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from "@env";
import { useDispatch, useSelector } from 'react-redux';
import { setOrigin, setDestination, selectOrigin } from '../redux/slices/navSlice';
import NavFavourites from '../components/NavFavourites/NavFavourites';

export default function HomeScreen() {
    const dispatch = useDispatch();
    const AutocompleteRef = useRef(null);
    const origin = useSelector(selectOrigin);

    useEffect( () => {
        if(origin) return;
        AutocompleteRef.current.clear();
    },[origin])

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image 
                style={{ width: 100, height: 100, resizeMode: 'contain'}}
                source={{
                    uri: `https://loghi-famosi.com/wp-content/uploads/2020/05/Uber-Logo-650x366.png`
                }}
                />
                <GooglePlacesAutocomplete
                    placeholder='Dove si parte?'
                    onPress={(data, details = null) => {
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description
                        }))
                        dispatch(setDestination(null));
                    }}
                    minLength={2}
                    enablePoweredByContainer={false}
                    query={{
                        key: GOOGLE_API_KEY,
                        language: 'it',
                    }}
                    debounce={400}
                    ref={AutocompleteRef}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    styles={{
                        container: {
                            flex: 0
                        },
                        textInput: {
                            fontSize: 15
                        }
                    }}
                />
                <NavOptions />
                <NavFavourites />
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
});