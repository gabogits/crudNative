import React, {  useState, useCallback } from 'react';
import { FlatList, View, Platform } from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import { List, Headline, Button, FAB } from 'react-native-paper';

import axios from 'axios';

import globalStyles from '../styles/global';


const Inicio = ({navigation}) => {

    // state de la app

      const [clientes, guardarClientes] = useState([]);

      useFocusEffect(
        useCallback(() => {
        const obtenerClientesApi = async () => {
            try {
          
              const resultado = await axios.get(Platform.OS === 'ios' ? 'http://localhost:3000/clientes' : 'http://10.0.2.2:3000/clientes')

              guardarClientes(resultado.data)
            } catch (error) {

            }
        }
      
          obtenerClientesApi()
    
        }, [guardarClientes]),
     );


    return ( 
      <View style={globalStyles.contenedor}>

      <Button icon="plus-circle" onPress={() => navigation.navigate('NuevoCliente')}>
          Nuevo Cliente
      </Button>

      <Headline style={globalStyles.titulo}> { clientes.length > 0 ? "Clientes" : "Aún no hay Clientes" } </Headline>

      <FlatList
          data={clientes}
          keyExtractor={ cliente => (cliente.id).toString()  }
          renderItem={ ({item}) => (
              <List.Item
                  title={item.nombre}
                  description={item.empresa}
                  onPress={() => navigation.navigate('DetallesCliente', {item})}
              />
          )}
      />

      <FAB
          icon="plus"
          style={globalStyles.fab}
          onPress={() => navigation.navigate('NuevoCliente')}
      />
  </View>
     );
}

 
export default Inicio;