const { View } = require("react-native");
const { Text } = require("react-native");
import React from "react";
export const InfoCode=({message,responseCode,results,visible})=>{
    return (<View>
          <Text visible={visible}>---------</Text>
        <Text visible={visible}>---------</Text>
        <Text visible={visible}>---------</Text>
        <Text visible={visible}>---------</Text>
        <Text visible={visible}>Conexion:{message} </Text>
        <Text visible={visible}>---------</Text>
        <Text visible={visible}>ResponseCode:{responseCode} </Text>
        <Text visible={visible}>---------</Text>
        <Text visible={visible}>result:{results} </Text>
    </View>);
}