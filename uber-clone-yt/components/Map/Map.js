import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Marker} from 'react-native-maps';
import { selectDestination, selectOrigin, setTravelTimeInformation} from '../../redux/slices/navSlice';
import { useDispatch, useSelector } from 'react-redux';
import MapViewDirections from "react-native-maps-directions";
import {GOOGLE_API_KEY} from "@env";

const Map = () => {

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const MapRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!origin || !destination) return;

        // zoom and fit markers
        MapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: {top: 50, right: 50, left: 50, bottom: 50}
        })

    },[origin, destination])

    useEffect(() => {
        if(!origin || !destination) return;


        const getTravelTime = async () => {
            const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_API_KEY}`;

            fetch(URL).then(res => res.json())
            .then(data => {
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
            })
        }
        getTravelTime();

    },[origin, destination, GOOGLE_API_KEY])

    return (
        <View style={styles.container}>
            <MapView
                ref={MapRef}
                style={styles.map}
                mapType="mutedStandard"
                initialRegion={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
            >

                {
                    origin && destination && (
                        <MapViewDirections
                            origin={origin.description}
                            destination={destination.description}
                            apikey={GOOGLE_API_KEY}
                            strokeWidth={3}
                            strokeColor='black'
                        />
                    )
                }

                {
                    origin?.location && (
                        <Marker
                            identifier='origin'
                            coordinate={{
                                latitude: origin.location.lat,
                                longitude: origin.location.lng
                            }}
                            title="Origin"
                            description={origin.description}
                        />
                    )
                }

{
                    destination?.location && (
                        <Marker
                            identifier='destination'
                            coordinate={{
                                latitude: destination.location.lat,
                                longitude: destination.location.lng
                            }}
                            title="Origin"
                            description={destination.description}
                        />
                    )
                }
            </MapView>
        </View>
    )
}

export default Map

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});