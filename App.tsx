import "react-native-gesture-handler";
import React from "react";
import { Alert, Button, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
//import * as Localization from "expo-localization";


import { Provider as PaperProvider } from "react-native-paper";

import useCachedResources from "./hooks/useCachedResources";

import Amplify, { I18n } from "aws-amplify";
import config from "./src/aws-exports";
import { en_US } from "./assets/translates/en";
import { es_ES } from "./assets/translates/es";
import { themeDefault } from "./constants/Colors";
import MBStates from "./contexts/MoneyBlinks/MBStates";
import Navigation from "./navigation";
import * as InAppPurchases from "expo-in-app-purchases";
import { InfoCode } from "./screens/Info";
Amplify.configure(config);
I18n.putVocabulariesForLanguage("en-US", en_US);
I18n.putVocabulariesForLanguage("es-US", es_ES);
I18n.putVocabulariesForLanguage("es-ES", es_ES);
I18n.putVocabulariesForLanguage("es-EC", es_ES);
I18n.putVocabulariesForLanguage("es-CU", es_ES);
I18n.putVocabulariesForLanguage("es", es_ES);
I18n.putVocabulariesForLanguage("en", en_US);

//const { locale } = Localization;
I18n.setLanguage("es-EC");
/*if (locale) {
  if (["es-ES", "es-EC", "es-CU", "es-US", "en-US"].includes(locale)) {
    I18n.setLanguage(locale);
  } else if (["es", "en"].includes(locale.substr(0, 2))) {
    I18n.setLanguage(locale.substr(0, 2));
  } else {
    I18n.setLanguage("en");
  }
} else {
  I18n.setLanguage("en");
}*/
export default function App() {
  
  const [message, setMessage] = React.useState("");
  const [connected, setConnected] = React.useState(false);
  const [responseCode, setresponseCode] = React.useState<any>();
  const [results, setresults] = React.useState<any>();
  const [visible, setvisible] = React.useState(false);
  
  React.useEffect(() => {
    console.log("inciando useeffect")
    loadRender();
  }, []);
  React.useEffect(() => {
   // if(connected){
      getDataList();
  //  }
  },[connected])
  const getDataList=async()=>{
    const items = Platform.select({
      ios: [
        'dev.products.gas',
        'dev.products.premium',
        'dev.products.gold_monthly',
        'dev.products.gold_yearly',
      ],
      android: ['gas', 'premium', 'gold_monthly', 'gold_yearly'],
    });

     // Retrieve product details
     console.log("items",items);
     try{
     const { responseCode, results } = await InAppPurchases.getProductsAsync(items);
      setresponseCode("resposndecode-"+responseCode);
      setresults("results--"+results);
     }catch (e) {
      setresponseCode("error al traer "+e);
      setresults("error al traer "+e);
     }

  }
  const loadRender = async () => {
    try {
       console.log("inciando");
      await InAppPurchases.connectAsync();
      getDataList();
      setMessage("se pudo conectar");
      setConnected(true);
    } catch (e) {
     setMessage("error al conectar" + e);
      console.log("error al conectar", e);
   }
  };
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    console.log("esta cargando");
    return null;
  } else {
    return (
      <SafeAreaProvider>
      
        <PaperProvider theme={themeDefault}>
          <MBStates>
          
            <Navigation />
            <Button
            title="Verificar"
            onPress={()=>{Alert.alert("resultados","conexion: "+message+"----"+"responseCode: "+responseCode+"-------"+"result: "+results)}}
            >

            </Button>
         
          </MBStates>
        </PaperProvider>
      </SafeAreaProvider>
    );
  }
}
/*
 return (
            <SafeAreaProvider>
                <PaperProvider theme={themeDefault}>
                    <MBStates>
                        <Navigation/>
                    </MBStates>
                </PaperProvider>
            </SafeAreaProvider>
        );
*/
