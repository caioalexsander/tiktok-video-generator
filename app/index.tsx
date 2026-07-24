import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'expo-router';

const API_URL = 'http://192.168.1.x:3001'; // Troque pelo IP do seu PC

export default function HomeScreen() {
  const router = useRouter();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/stats`);
      return res.data;
    },
  });

  const gerarVideos = async () => {
    Alert.alert('Gerar Vídeos', 'Iniciar processamento?', [
      { text: 'Cancelar' },
      { text: 'Confirmar', onPress: async () => {
        await axios.post(`${API_URL}/api/generate`);
        Alert.alert('Sucesso', 'Roteiros enviados para a fila!');
      }}
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎥 TikTok Auto Generator</Text>

      <View style={styles.statsContainer}>
        <Text style={styles.stat}>Pendentes: {stats?.pendentes || 0}</Text>
        <Text style={styles.stat}>Processando: {stats?.processando || 0}</Text>
        <Text style={styles.stat}>Concluídos: {stats?.concluidos || 0}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={gerarVideos}>
        <Text style={styles.buttonText}>GERAR VÍDEOS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/novo-roteiro')}>
        <Text>Novo Roteiro</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/biblioteca')}>
        <Text>Biblioteca de Imagens</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  statsContainer: { backgroundColor: '#f0f0f0', padding: 20, borderRadius: 12, marginBottom: 30 },
  stat: { fontSize: 18, marginVertical: 5 },
  button: { backgroundColor: '#FF2D55', padding: 15, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  secondaryButton: { backgroundColor: '#eee', padding: 15, borderRadius: 12, alignItems: 'center', marginBottom: 10 }
});