import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="index" options={{ title: 'TikTok Auto Video' }} />
        <Stack.Screen name="novo-roteiro" options={{ title: 'Novo Roteiro' }} />
        <Stack.Screen name="biblioteca" options={{ title: 'Biblioteca de Imagens' }} />
        <Stack.Screen name="configuracoes" options={{ title: 'Configurações' }} />
        <Stack.Screen name="logs" options={{ title: 'Logs' }} />
      </Stack>
    </QueryClientProvider>
  );
}