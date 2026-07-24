import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Button, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://192.168.1.x:3001'; // Seu IP

export default function BibliotecaScreen() {
  const queryClient = useQueryClient();

  const { data: images = [] } = useQuery({
    queryKey: ['images'],
    queryFn: async () => {
      // Buscar do Supabase ou API
      const res = await axios.get(`${API_URL}/api/images`);
      return res.data;
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (uri: string) => {
      const formData = new FormData();
      formData.append('file', {
        uri,
        name: 'image.jpg',
        type: 'image/jpeg',
      } as any);
      return axios.post(`${API_URL}/api/images/upload`, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
      Alert.alert('Sucesso', 'Imagem enviada!');
    }
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!result.canceled) {
      uploadMutation.mutate(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="📸 Adicionar Imagem" onPress={pickImage} />

      <FlatList
        data={images}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={{ uri: item.url }} style={styles.image} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  image: { width: 120, height: 120, margin: 5, borderRadius: 8 }
});