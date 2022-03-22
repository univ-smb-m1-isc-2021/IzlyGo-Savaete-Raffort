import {createNativeStackNavigator} from "@react-navigation/native-stack";
import InscriptionScreen from "./InscriptionScreen";
import {StyleSheet, Text, TouchableHighlight, View, ActivityIndicator} from "react-native";
import React, {useEffect} from "react";
import ConnexionScreen from "./ConnexionScreen";
import {NavigationContainer} from "@react-navigation/native";
import { Video, AVPlaybackStatus } from 'expo-av';
import {AVPlaybackNativeSource} from "expo-av/build/Video";

const Stack = createNativeStackNavigator()

export default function AccueilScreen() {
    const forFade = ({ current, next }) => {
        const opacity = Animated.add(
            current.progress,
            next ? next.progress : 0
        ).interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0, 1, 0],
        });

        return {
            leftButtonStyle: { opacity },
            rightButtonStyle: { opacity },
            titleStyle: { opacity },
            backgroundStyle: { opacity },
        };
    };

    return (
        <NavigationContainer>
            <Stack.Navigator>

                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ title: 'Accueil', headerShown: false }}
                    />
                    <Stack.Screen name="Connexion" component={ConnexionScreen}/>
                    <Stack.Screen name="Inscription" component={InscriptionScreen} />
            </Stack.Navigator>

        </NavigationContainer>

       // <ConnexionScreen></ConnexionScreen>
    );
}


const HomeScreen = ({ navigation }) => {

    const video = React.useRef("");
    const [status, setStatus] = React.useState({});
    const [isLoad, setLoading] = React.useState(false);



    useEffect(() => {
        //video.current.playAsync()
    }, [])

    return (
        <View style={styles.vue_globale}>



            <View>
                <TouchableHighlight  onPress={() => navigation.navigate('Connexion')}  underlayColor="#EEEEEE">
                    <View style={styles.vue_bouton}>
                        <Text style={styles.texte_bouton}>Connexion</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight  onPress={() => navigation.navigate('Inscription' )} underlayColor="#EEEEEE">
                    <View style={styles.vue_bouton}>
                        <Text style={styles.texte_bouton}>Créer un compte</Text>

                    </View>
                </TouchableHighlight>
            </View>




        </View>

        /* <Video
                ref={video}
                style={styles.video}
                source={{uri : 'https://www.polytech.univ-smb.fr/fileadmin/Polytech_Internet/Communication/Images_Entete/HomePolytech.mp4'}}
                useNativeControls
                isMuted={true}
                paused={false}
                resizeMode="cover"
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
                onLoad={() => setLoading(true)}
            />*/

    )
}

const styles = StyleSheet.create({
    vue_globale: {
        position: "absolute",
        bottom: '10%',
        width: '100%',


    },

    vue_bouton: {
        backgroundColor: "white",
        opacity: 0.9,
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 20,
        marginHorizontal: 30,
    },
    texte_bouton: {
        textAlign: "center",
        color: "black",
        fontSize: 15,
        fontFamily: "Dosis_700Bold"
    },

    video: {
        width: "100%",
        height: "100%"
    },



})