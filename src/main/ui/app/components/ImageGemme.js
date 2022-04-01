import {Image, StyleSheet} from "react-native";
import React from "react";


export default function ImageGemme(props) {

    const getSize = size => {
        switch (size) {
            case "very-tiny" : return { height: 30, width: 30 }
            case "tiny" : return { height: 45, width: 45 }
            case "big" : return { height: 75, width: 75 }
        }

    }

    const getImage = name => {
        switch (name) {
            case "rubis": return require("../screens/images/rubis.png")
            case "saphir": return require("../screens/images/saphir.png")
            case "emeraude": return require("../screens/images/emeraude.png")
            case "amethyste": return require("../screens/images/amethyste.png")
            case "tourmaline": return require("../screens/images/tourmaline.png")
            case "ambre": return require("../screens/images/ambre.png")
            default: return require("../screens/images/ambre.png")
        }
    }


    return(
        <Image style={getSize(props.size)} source={getImage(props.image)}/>
    )
}

