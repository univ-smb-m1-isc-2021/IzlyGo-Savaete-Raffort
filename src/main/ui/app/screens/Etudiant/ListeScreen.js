import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView } from 'react-native';
import {useEffect, useState} from "react";
import { Dosis_200ExtraLight, Dosis_300Light, Dosis_400Regular, Dosis_500Medium, Dosis_600SemiBold, Dosis_700Bold, Dosis_800ExtraBold } from '@expo-google-fonts/dosis'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function ListeScreen() {

    const [gemmes, setGemmes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [vue, setVue] = useState();


    const donneGemmes = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/inventaire/123');
            const json = await response.json();

            setGemmes(json);
            setIsLoading(false);
            setScreen()

        } catch (error) {
            console.error(error);
        }
    }

    const getImage = name => {
        switch (name) {
            case "rubis": return require("../images/rubis.png")
            case "saphir": return require("../images/saphir.png")
            case "emeraude": return require("../images/emeraude.png")
            case "amethyste": return require("../images/amethyste.png")
            case "tourmaline": return require("../images/tourmaline.png")
            case "ambre": return require("../images/ambre.png")
            default: return require("../images/ambre.png")
        }
    }




    useEffect(() => {
        donneGemmes();
    }, [isLoading, gemmes]);

    const setScreen = () => {
        setVue(
            <View style={styles.main}>
                <View style={styles.points}>
                    <Text style={styles.points4}>Total de vos points IzlyGo :</Text>
                    <Text style={styles.points2}> 540 points </Text>
                    <Text style={styles.points3}>Soit {gemmes.etudiant.nombre_euros} €</Text>
                </View>

                <ScrollView>

                    <View>
                        <Text style={styles.titleGemme}>Mes gemmes</Text>
                    </View>

                    <View style={styles.container}>




                        {
                            gemmes.gemmes.map((twice, i) => {

                                    var o = require("../images/tourmaline.png");
                                    return (
                                        <View style={styles.row} key={i}>

                                            {
                                                twice.map((app, o) => {


                                                        return (
                                                            <View style={styles.item} key={o}>
                                                                <View style={[styles.titleView, styles.color(app.couleur)]}>
                                                                    <Text style={styles.titleItem}>{app.nom}</Text>
                                                                </View>
                                                                <View style={[styles.row, styles.secondPart]}>
                                                                    <View>

                                                                        <Image
                                                                            style={styles.tinyLogo}
                                                                            source={getImage(app.chemin_image)}
                                                                        />
                                                                    </View>
                                                                    <View style={styles.number}>
                                                                        <Text style={styles.numberText}>{app.quantite}</Text>
                                                                    </View>
                                                                </View>
                                                                <View style={styles.conversion}>
                                                                    <Text style={styles.conversionText}>{
                                                                        app.quantite == 0 ? "Aucun" : app.valeur_points + " points (Soit "+ app.valeur_euro + "€)"
                                                                    }</Text>
                                                                </View>
                                                            </View>
                                                        )
                                                    }
                                                )}

                                        </View>
                                    )
                                }
                            )}








                    </View>

                    <View>
                        <Text style={styles.titleGemme}>Mes objets</Text>
                    </View>

                    <View style={styles.row}>

                        <View style={styles.item}>
                            <View style={[styles.titleView, styles.gray]}>
                                <Text style={styles.titleItem}>"La panière"</Text>
                            </View>
                            <View style={[styles.row, styles.secondPart]}>
                                <View>
                                    <Image
                                        style={styles.tinyLogo}
                                        source={require('../images/croissant.png')}
                                    />
                                </View>
                                <View style={styles.number}>
                                    <Text style={styles.numberText}>0</Text>
                                </View>
                            </View>
                            <View style={styles.conversion}><Text style={styles.conversionText}>Voir modalités d'utilisation</Text></View>
                        </View>


                        <View style={styles.item}>
                            <View style={[styles.titleView, styles.gray]}>
                                <Text style={styles.titleItem}>"Le super"</Text>
                            </View>
                            <View style={[styles.row, styles.secondPart]}>
                                <View>
                                    <Image
                                        style={styles.tinyLogo}
                                        source={require('../images/biere.png')}
                                    />
                                </View>
                                <View style={styles.number}>
                                    <Text style={styles.numberText}>0</Text>
                                </View>
                            </View>
                            <View style={styles.conversion}><Text style={styles.conversionText}>Voir modalités d'utilisation</Text></View>
                        </View>





                    </View>

                    <Text>dd</Text>
                    <Text>dd</Text>
                    <Text>dd</Text>
                    <Text>dd</Text>
                    <Text>dd</Text>
                    <Text>dd</Text>
                    <Text>dd</Text>

                </ScrollView>


            </View>
        );

    }


    return(
        <SafeAreaView>
            {vue}
        </SafeAreaView>
    )


}




const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    main: {
        backgroundColor: "white"
    },
    row : {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 30
    },
    titleItem: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
        fontFamily: "Dosis_700Bold"
    },
    titleView: {
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 5,
        width: "80%",
        justifyContent: "center",
        alignItems: "center"
    },
    item: {
        backgroundColor: "#EFF0F3",
        height: 130,
        width: "45%",
        alignItems: "center",
        borderRadius: 10
    },

    red : {
        backgroundColor: "#E76967",
    },
    blue : {
        backgroundColor: "#82C5F1",
    },
    green : {
        backgroundColor: "#63D7B9",
    },
    purple : {
        backgroundColor: "#B689E7",
    },
    black : {
        backgroundColor: "#373F4A",
    },
    yellow : {
        backgroundColor: "#EAAE7B",
    },
    gray : {
        backgroundColor: "#989FAA",
    },

    color : function(hexa) {
        return {
            backgroundColor: "#" + hexa,
        }
    },



    tinyLogo: {
        width: 40,
        height: 40,
    },

    conversion: {
        position: "absolute",
        bottom: 10
    },
    conversionText: {
      fontSize: 12,
      color: "gray",
        fontFamily: "Dosis_300Light"
    },

    number: {
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 20,
    },
    numberText: {
        fontSize: 30,
        fontFamily: "Dosis_400Regular"

    },
    secondPart: {
        marginTop: 20
    },

    points : {
        backgroundColor: "#F0F2F5",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    points2: {
        fontSize: 20,
        padding: 5,
        fontFamily: "Dosis_700Bold"
    },

    points3: {
        fontSize: 12,
        fontFamily: "Dosis_300Light"
    },

    points4: {
        fontFamily: "Dosis_500Medium",
        fontSize: 20
    },

    titleGemme: {
        fontWeight: "100",
        fontFamily: "Dosis_200ExtraLight",
        fontSize: 20,
        margin: 20
    }
});
