import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

import PlopScreen from "./PlopScreen";

export default function TestScreen() {
    return (
       <View>
           <Text >Cddddddddd\n</Text>
           <Text >Cddddddddd\n</Text>
           <Text >Cddddddddd\n</Text>
        <Button
            title="OKKK"
            onPress={() => Alert.alert('Cannot press this one')}
        ></Button>
       </View>
    );
}
