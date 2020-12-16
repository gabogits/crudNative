import React from 'react';
import {View, StyleSheet, Alert, Platform} from 'react-native';
import {Headline, Text, Subheading, Button, FAB} from 'react-native-paper';
import axios from 'axios';
import globalStyles from '../styles/global';

const DetallesCliente = ({navigation, route}) => {
  // state de la app

  const {nombre, empresa, correo, telefono, id} = route.params.item;
  const mostrarConfirmacion = () => {
    Alert.alert(
      '¿Deseas eliminar este cliente?',
      'Un contacto eliminado no se puede recuperar',
      [{text: 'Si, eliminar', onPress: () => eliminarContacto()}, {text: 'Cancelar', style: 'Cancel'}],
    );
  };

  const eliminarContacto = async () => {
    const url = Platform.OS === 'ios' ? 'http://localhost:3000/clientes/' : 'http://10.0.2.2:3000/clientes/';

    try {
      await axios.delete(url+id)
    } catch (error) {
      console.log(error)
    }
    navigation.navigate('Inicio')
  }

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{nombre}</Headline>
      <Text style={styles.texto}>
        Empresa: <Subheading>{empresa}</Subheading>{' '}
      </Text>
      <Text style={styles.texto}>
        Correo: <Subheading>{correo}</Subheading>{' '}
      </Text>
      <Text style={styles.texto}>
        Teléfono: <Subheading>{telefono}</Subheading>{' '}
      </Text>

      <Button
        style={styles.boton}
        mode="contained"
        icon="cancel"
        onPress={() => mostrarConfirmacion()}>
        Eliminar Cliente
      </Button>

      <FAB
        icon="pencil"
        style={globalStyles.fab}
        onPress={() =>
          navigation.navigate('NuevoCliente', {
            cliente: route.params.item
          })
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  texto: {
    marginBottom: 20,
    fontSize: 18,
  },
  boton: {
    marginTop: 100,
    backgroundColor: 'red',
  },
});

export default DetallesCliente;
