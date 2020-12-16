import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const NuevoCliente = ({navigation, route}) => {
  // state de la app
  const [nombre, guardarNombre] = useState('');
  const [telefono, guardarTelefono] = useState('');
  const [correo, guardarCorreo] = useState('');
  const [empresa, guardarEmpresa] = useState('');
  const [alerta, guardarAlerta] = useState(false);

  //detectar si estamos editando o no

  useEffect(() => {
    if (route.params?.cliente) {
      const {nombre, empresa, correo, telefono} = route.params.cliente;
      guardarNombre(nombre);
      guardarTelefono(telefono);
      guardarCorreo(correo);
      guardarEmpresa(empresa);
    }
  }, []);

  const guardarCliente = async () => {
    //validar

    if (nombre === '' || telefono === '' || correo === '' || empresa === '') {
      guardarAlerta(true);
      return;
    }

    //generar cliente
    const cliente = {nombre, telefono, correo, empresa};

    //si estamos editando o guardar el cliente en la api

    if (route.params?.cliente) {
      const {id} = route.params.cliente;
      cliente.id = id;
      try {
        await axios.put(
          Platform.OS === 'ios'
            ? `http://localhost:3000/clientes/${id}`
            : `http://10.0.2.2:3000/clientes/${id}`,
          cliente,
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        //para android

        await axios.post(
          Platform.OS === 'ios'
            ? 'http://localhost:3000/clientes'
            : 'http://10.0.2.2:3000/clientes',
          cliente,
        );
      } catch (error) {
        console.log(error);
      }
    }

    //redireccionar
    navigation.navigate('Inicio');
    //limpiar el form
    guardarNombre('');
    guardarTelefono('');
    guardarCorreo('');
    guardarEmpresa('');
  };
  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>

      <TextInput
        label="Nombre"
        placeholder="Juan"
        onChangeText={(texto) => guardarNombre(texto)}
        value={nombre}
        style={styles.input}
      />
      <TextInput
        label="Teléfono"
        placeholder="13131414"
        onChangeText={(texto) => guardarTelefono(texto)}
        value={telefono}
        style={styles.input}
      />
      <TextInput
        label="Correo"
        placeholder="correo@correo.com"
        onChangeText={(texto) => guardarCorreo(texto)}
        value={correo}
        style={styles.input}
      />
      <TextInput
        label="Empresa"
        placeholder="Nombre Empresa"
        onChangeText={(texto) => guardarEmpresa(texto)}
        value={empresa}
        style={styles.input}
      />

      <Button
        icon="pencil-circle"
        mode="contained"
        onPress={() => guardarCliente()}>
        Guardar Cliente
      </Button>

      <Portal>
        <Dialog visible={alerta} onDismiss={() => guardarAlerta(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los campos son obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => guardarAlerta(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});

export default NuevoCliente;
