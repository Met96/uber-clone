import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import Map from '../components/Map/Map';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigateCard from '../components/NavigateCard/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard/RideOptionsCard';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin, setTravelTimeInformation } from '../redux/slices/navSlice';

const MapScreen = () => {

    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const backToHome = () => {
        navigation.navigate("HomeScreen");
        dispatch(setOrigin(null));
        dispatch(setDestination(null));
        dispatch(setTravelTimeInformation(null));
    }

    return (
        <View>

            <TouchableOpacity
                style={tw`absolute top-15 left-5 z-2 p-2 rounded-full bg-white shadow-md`}
                onPress={backToHome}
            >
                <Icon name="menu" />
            </TouchableOpacity>

            <View style={tw`h-1/2`}>
                <Map />
            </View>
            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                <Stack.Screen
                    name="NavigateCard"
                    component={NavigateCard}
                    options={{
                    headerShown: false
                    }}
                />
                <Stack.Screen
                    name="RideOptionsCard"
                    component={RideOptionsCard}
                    options={{
                    headerShown: false
                    }}
                />
                </Stack.Navigator>
            </View>
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({})