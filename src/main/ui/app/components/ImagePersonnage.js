import {Image, StyleSheet} from "react-native";
import React from "react";


export default function ImagePersonnage(props) {

    const getSize = (size, padding) => {

        var style;
        switch (size) {
            case "very-tiny" : style = { height: 50, width: 50, borderRadius: 50 }; break;
            case "tiny" : style = { height: 60, width: 60, borderRadius: 50 }; break;
            case "small" : style = { height: 80, width: 80, borderRadius: 50 }; break;
            case "normal" : style = { height: 100, width: 100, borderRadius: 50}; break;
        }


        return style

    }

    const getImage = name => {

        switch (name) {
            case "personnage1": return require("../screens/images/personnages/personnage1.png")
            case "personnage2": return require("../screens/images/personnages/personnage2.png")
            case "personnage3": return require("../screens/images/personnages/personnage3.png")
            case "personnage4": return require("../screens/images/personnages/personnage4.png")
            case "personnage5": return require("../screens/images/personnages/personnage5.png")
            case "personnage6": return require("../screens/images/personnages/personnage6.png")
            case "personnage7": return require("../screens/images/personnages/personnage7.png")
            case "personnage8": return require("../screens/images/personnages/personnage8.png")
            case "personnage9": return require("../screens/images/personnages/personnage9.png")

            default: return require("../screens/images/personnages/personnage1.png")
        }
    }


    return(
        <Image style={getSize(props.size, props.padding)} source={getImage(props.image)}/>
    )
}

