import React from 'react';
import { Button } from 'react-native-paper';


const Barra = ({navigation, route}) => {

    const handlePress = () => {
        navigation.navigate("NuevoCliente")
    }
    return ( 
        <Button icon="plus"  color="#FFF" onPress={()=> handlePress()}>
            Cliente
        </Button>
     );
}
 
export default Barra;