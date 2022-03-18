import React from "react";
import {StyleSheet, Text} from "react-native";

export default function TextTitre(props) {

    return (
        <Text style={monStyle.text}>{props.title}</Text>
    )


}

const monStyle = StyleSheet.create({
    text: {
        fontWeight: "100",
        //fontFamily: "Dosis_200ExtraLight",
        fontSize: 20,
        marginTop: 20,
        marginLeft: 20
    }
})
