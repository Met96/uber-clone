import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Marker} from 'react-native-maps';
import { selectOrigin} from '../../redux/slices/navSlice';
import { useSelector } from 'react-redux';


const Map = () => {

    const origin = useSelector(selectOrigin);


    return (
        <View style={styles.container}>
            <MapView
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
                    origin?.location && (
                        <Marker
                            identifier='identifier'
                            coordinate={{
                                latitude: origin.location.lat,
                                longitude: origin.location.lng
                            }}
                            title="Origin"
                            description={origin.description}
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