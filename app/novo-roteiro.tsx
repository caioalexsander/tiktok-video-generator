import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function NovoRoteiroScreen() {
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');

  const salvarRoteiro = async () => {
    if (!titulo || !texto) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      await axios.post('http://seu-backend:3001/api/roteiros', { titulo, texto });
      Alert.alert('Sucesso', 'Roteiro salvo com status PENDENTE!');
      setTitulo('');
      setTexto('');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar roteiro');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título do Roteiro"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Texto completo do roteiro (narração)"
        value={texto}
        onChangeText={setTexto}
        multiline
      />
      <Button title="Salvar Roteiro" onPress={salvarRoteiro} color="#FF2D55" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 8 },
  textArea: { height: 200 }
});