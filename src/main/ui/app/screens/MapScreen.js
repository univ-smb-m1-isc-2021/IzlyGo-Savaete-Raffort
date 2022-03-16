import {StyleSheet, View, Image, Text, Alert} from "react-native";
import MapView from "react-native-maps";
import Marker from "react-native-maps";
import React, {useEffect, useState} from "react";



export default function MapScreen() {

    const [points, setPoints] = useState([]);

    const [currentDate, setCurrentDate] = useState('');

    const donneGemmes = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/tirage');
            const json = await response.json();

            setPoints(json["liste"]);




        } catch (error) {
            console.error(error);
        }
    }

    const getImage = name => {
        switch (name) {
            case "rubis": return require("./images/rubis.png")
            case "saphir": return require("./images/saphir.png")
            case "emeraude": return require("./images/emeraude.png")
            case "amethyste": return require("./images/amethyste.png")
            case "tourmaline": return require("./images/tourmaline.png")
            case "ambre": return require("./images/ambre.png")
            default: return require("./images/ambre.png")
        }
    }


    function markerClick(gemme){
        Alert.alert(
            "" + gemme.nom,
            "",
            [
                {
                    text: "Annuler", style: "cancel"
                },
                { text: "Oui",

                }
            ]
        );
    }

    function temps(){
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds

        var t1 = new Date(year, month, date, hours, min, sec);
        var t2
        if (min < 30){
            t2 = new Date(year, month, date, hours, 30, 0);
        }else {
            t2 = new Date(year, month, date, hours + 1, 0, 0);
        }

        var dif = Math.abs(t2.getTime() - t1.getTime()) / 1000
        dif -= 1


        if(dif > 0 && dif < 60) {
            setCurrentDate("Il reste " + dif + " secondes");
        }
        else {
            var min = Math.trunc(dif/60)
            var sec = dif - (min*60)
            setCurrentDate("Il reste " + min + " min et " + sec + " secondes.");
        }


        if (dif == 0){
            donneGemmes();
        }


    }



    useEffect(() => {
        donneGemmes();

        /*const timer = window.setInterval(() => {
            temps()

        }, 1000);

        return () => window.clearInterval(timer);*/




    }, []);

    return (
        <View style={styles.all}>
            <Text>{currentDate}</Text>
            <View style={styles.container}>
                <MapView style={styles.map}   region={{
                    latitude: 45.64341,
                    longitude: 5.86990,
                    latitudeDelta: 0.012,
                    longitudeDelta: 0.012,
                }}>

                    {points.map((pt, i) => {
                        return (
                            <MapView.Marker
                                key={pt.latitude}
                                coordinate={{ latitude : pt.latitude , longitude :pt.longitude }}
                                onPress={() => markerClick(pt.gemme)}
                            >

                                <Image source={getImage(pt.gemme.chemin_image)} style={{height: 35, width:35 }} />
                            </MapView.Marker>
                        )
                    })}


                </MapView>
            </View>
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
        height: "90%",
    },
    
    all : {
        width: "100%",
        height: "100%"
    }
});
