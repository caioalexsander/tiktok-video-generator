import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const API_URL = 'http://192.168.1.x:3001'; // Seu IP

export default function NovoRoteiroScreen() {
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const router = useRouter();

  const salvar = async () => {
    if (!titulo || !texto) {
      Alert.alert('Erro', 'Preencha título e texto');
      return;
    }

    try {
      await axios.post(`${API_URL}/api/roteiros`, { titulo, texto });
      Alert.alert('Sucesso', 'Roteiro salvo!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Ex: Como ganhar dinheiro em 2026"
      />

      <Text style={styles.label}>Texto do Roteiro (Narração)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={texto}
        onChangeText={setTexto}
        placeholder="Escreva o texto completo aqui..."
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={salvar}>
        <Text style={styles.buttonText}>SALVAR ROTEIRO</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginTop: 15 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 15 },
  textArea: { height: 250, textAlignVertical: 'top' },
  button: { backgroundColor: '#FF2D55', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});