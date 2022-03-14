import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView } from 'react-native';


export default function ListeScreen() {
    return (
        <View style={styles.main}>
            <View style={styles.points}>
                <Text>Total de vos points IzlyGo :</Text>
                <Text style={styles.points2}>10 points</Text>
                <Text style={styles.points3}>Soit 0 €</Text>
            </View>

            <ScrollView>

                <View>
                    <Text style={styles.titleGemme}>Mes gemmes</Text>
                </View>

                <View style={styles.container}>
                    <View style={styles.row}>

                        <View style={styles.item}>
                            <View style={[styles.titleView, styles.red]}>
                                <Text style={styles.titleItem}>Rubi</Text>
                            </View>
                            <View style={[styles.row, styles.secondPart]}>
                                <View>
                                    <Image
                                        style={styles.tinyLogo}
                                        source={require('./images/rubi.png')}
                                    />
                                </View>
                                <View style={styles.number}>
                                    <Text style={styles.numberText}>0</Text>
                                </View>
                            </View>
                            <View style={styles.conversion}><Text style={styles.conversionText}>Aucun</Text></View>
                        </View>


                        <View style={styles.item}>
                            <View style={[styles.titleView, styles.blue]}>
                                <Text style={styles.titleItem}>Saphir</Text>
                            </View>
                            <View style={[styles.row, styles.secondPart]}>
                                <View>
                                    <Image
                                        style={styles.tinyLogo}
                                        source={require('./images/saphir.png')}
                                    />
                                </View>
                                <View style={styles.number}>
                                    <Text style={styles.numberText}>0</Text>
                                </View>
                            </View>
                            <View style={styles.conversion}><Text style={styles.conversionText}>Aucun</Text></View>
                        </View>



                    </View>

                    <View style={styles.row}>

                        <View style={styles.item}>
                            <View style={[styles.titleView, styles.green]}>
                                <Text style={styles.titleItem}>Émeraude</Text>
                            </View>
                            <View style={[styles.row, styles.secondPart]}>
                                <View>
                                    <Image
                                        style={styles.tinyLogo}
                                        source={require('./images/emeraude.png')}
                                    />
                                </View>
                                <View style={styles.number}>
                                    <Text style={styles.numberText}>0</Text>
                                </View>
                            </View>
                            <View style={styles.conversion}><Text style={styles.conversionText}>Aucun</Text></View>
                        </View>


                        <View style={styles.item}>
                            <View style={[styles.titleView, styles.purple]}>
                                <Text style={styles.titleItem}>Améthyste</Text>
                            </View>
                            <View style={[styles.row, styles.secondPart]}>
                                <View>
                                    <Image
                                        style={styles.tinyLogo}
                                        source={require('./images/amethyste.png')}
                                    />
                                </View>
                                <View style={styles.number}>
                                    <Text style={styles.numberText}>0</Text>
                                </View>
                            </View>
                            <View style={styles.conversion}><Text style={styles.conversionText}>Aucun</Text></View>
                        </View>



                    </View>


                    <View style={styles.row}>

                        <View style={styles.item}>
                            <View style={[styles.titleView, styles.black]}>
                                <Text style={styles.titleItem}>Tourmaline</Text>
                            </View>
                            <View style={[styles.row, styles.secondPart]}>
                                <View>
                                    <Image
                                        style={styles.tinyLogo}
                                        source={require('./images/tourmaline.png')}
                                    />
                                </View>
                                <View style={styles.number}>
                                    <Text style={styles.numberText}>0</Text>
                                </View>
                            </View>
                            <View style={styles.conversion}><Text style={styles.conversionText}>Aucun</Text></View>
                        </View>


                        <View style={styles.item}>
                            <View style={[styles.titleView, styles.yellow]}>
                                <Text style={styles.titleItem}>Ambre</Text>
                            </View>
                            <View style={[styles.row, styles.secondPart]}>
                                <View>
                                    <Image
                                        style={styles.tinyLogo}
                                        source={require('./images/ambre.png')}
                                    />
                                </View>
                                <View style={styles.number}>
                                    <Text style={styles.numberText}>0</Text>
                                </View>
                            </View>
                            <View style={styles.conversion}><Text style={styles.conversionText}>Aucun</Text></View>
                        </View>



                    </View>
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
                                    source={require('./images/croissant.png')}
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
                                    source={require('./images/biere.png')}
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
        fontSize: 15
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



    tinyLogo: {
        width: 40,
        height: 40,
    },

    conversion: {
        position: "absolute",
        bottom: 10
    },
    conversionText: {
      fontSize: 10,
      color: "gray"
    },

    number: {
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 20,
    },
    numberText: {
        fontSize: 30
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
        fontWeight: "bold",
        padding: 5
    },

    points3: {
        fontSize: 10,
    },

    titleGemme: {
        fontWeight: "100",
        fontSize: 20,
        margin: 20
    }
});
