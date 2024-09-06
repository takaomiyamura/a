import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

function ConsultaCepScreen() {
  const [cep, setCep] = useState('');
  const [resultado, setResultado] = useState(null);

  const handleConsulta = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      setResultado(data);
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Consulta de Cep</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
      />
      <Button title="Consultar" onPress={handleConsulta} />
      {resultado && (
        <View style={styles.resultado}>
          <Text><strong>CEP:</strong> {resultado.cep}</Text>
          <Text><strong>Logradouro:</strong> {resultado.logradouro}</Text>
          <Text><strong>Bairro:</strong> {resultado.bairro}</Text>
          <Text><strong>Localidade:</strong> {resultado.localidade}</Text>
          <Text><strong>UF:</strong> {resultado.uf}</Text>
        </View>
      )}
    </ScrollView>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.settingsContainer}>
      <Text style={styles.title}>Configurações</Text>
      <Text>Somente uma tela com uma cor bonitinha</Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Button title="Consultar CEP" onPress={() => navigation.navigate('Consulta CEP')} />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Consulta CEP" component={ConsultaCepScreen} />
        <Drawer.Screen name="Configurações" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#DAA520',
  },

  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff', 
  },

  settingsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffefd5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  resultado: {
    marginTop: 20,
  },
});
