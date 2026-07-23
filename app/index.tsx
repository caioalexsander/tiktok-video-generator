import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function HomeScreen() {
  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3001/api/stats'); // ajuste para o IP do backend
      return res.data;
    },
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎥 Gerador Auto TikTok</Text>
      
      <View style={styles.stats}>
        <Text>Pendentes: {stats?.pendentes || 0}</Text>
        <Text>Processando: {stats?.processando || 0}</Text>
        <Text>Concluídos: {stats?.concluidos || 0}</Text>
        <Text>Erros: {stats?.erros || 0}</Text>
      </View>

      <Button title="GERAR VÍDEOS" onPress={() => { /* chamar API */ }} color="#FF2D55" />
      <Button title="Novo Roteiro" onPress={() => {}} />
      <Button title="Biblioteca de Imagens" onPress={() => {}} />
      <Button title="Configurações" onPress={() => {}} />
      <Button title="Logs" onPress={() => {}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  stats: { backgroundColor: '#f0f0f0', padding: 15, borderRadius: 10, marginBottom: 20 }
});