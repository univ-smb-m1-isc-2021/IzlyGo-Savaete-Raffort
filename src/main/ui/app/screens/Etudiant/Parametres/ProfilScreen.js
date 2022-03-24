import {StyleSheet, Text, View, TextInput, Button, Image, NativeModules, ScrollView, TouchableHighlight} from 'react-native';


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faFaceAngry, faFaceGrinBeam, faFaceFlushed, faGrinHearts, faGrinStars, faFaceGrinWide, faFaceGrinTongue, faFaceMeh, faFaceLaughWink, faFaceSmileBeam, faFaceSmile, faFaceSadTear} from '@fortawesome/free-solid-svg-icons'
import React, {useState} from "react";
import {color} from "react-native-elements/dist/helpers";

export default function ProfilScreen() {

    let icons = [ faFaceSmile, faFaceSmileBeam, faFaceGrinBeam, faFaceFlushed, faGrinHearts, faGrinStars, faFaceGrinWide, faFaceGrinTongue, faFaceMeh, faFaceLaughWink, faFaceSadTear, faFaceAngry ]
    let colors = [ "#E76967", "#82C5F1", "#63D7B9", "#B689E7", "#373F4A", "#EAAE7B", "#f1c40f"  ]

    const [click_icon, setIcon] = useState(-1);
    const [click_color, setColor] = useState(-1);

    const [my_color, setMyColor] = useState('#f1c40f');



    return (
        <View>

            <View style={styles.view1}>
                <ScrollView horizontal={true} style={styles.scroll}>
                    <View style={styles.view_scroll}>

                        {
                            icons.map((icon, i) => {
                                return(
                                    <TouchableHighlight underlayColor="white" onPress={() => {setIcon(i)}} >
                                        <View style={[styles.view_icon, click_icon == i ? styles.view_border : '']}>
                                            <FontAwesomeIcon icon={icon}  color={my_color} size={ 50 } />
                                        </View>
                                    </TouchableHighlight>
                                )
                            })
                        }

                    </View>
                </ScrollView>

                <ScrollView horizontal={true} style={styles.scroll}>
                    <View style={styles.view_scroll}>

                        {
                            colors.map((color, i) => {
                                return(
                                    <TouchableHighlight underlayColor="white" onPress={() => {setColor(i), setMyColor(color)}} >
                                        <View style={[styles.view_icon, click_color == i ? styles.view_border : '']}>
                                            <View style={{width: 50, height: 50, borderRadius: 100, backgroundColor: color}}></View>
                                        </View>
                                    </TouchableHighlight>
                                )
                            })
                        }

                    </View>
                </ScrollView>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    scroll: {
        marginHorizontal: 20,
    },

    view1: {
        borderRadius: 10,
        margin: 20,
        backgroundColor: 'white'

    },

    view_scroll: {
        flexDirection: "row",
        padding: 20
    },

    view_icon: {
        paddingHorizontal: 10,
    },

    view_border: {
        borderWidth: 1,
        borderColor: "#373F4A",
    }
})


