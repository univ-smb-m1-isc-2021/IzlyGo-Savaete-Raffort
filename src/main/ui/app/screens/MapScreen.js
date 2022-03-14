import {StyleSheet, View} from "react-native";
import MapView from "react-native-maps";
import React from "react";



export default function MapScreen() {
    return (
        <View style={styles.container}>
            <MapView style={styles.map}   initialRegion={{
                latitude: 45.64341,
                longitude: 5.86990,
                latitudeDelta: 0.0522,
                longitudeDelta: 0.0421,
            }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: "100%",
        height: "100%",
    },
});
