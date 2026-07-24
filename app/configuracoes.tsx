import React from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet, ScrollView } from 'react-native';
import { useAppStore } from '../stores/useAppStore';

export default function ConfiguracoesScreen() {
  const { configs, setConfig } = useAppStore();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>⚙️ Configurações</Text>

      <View style={styles.field}>
        <Text>Pasta Google Drive</Text>
        <TextInput
          style={styles.input}
          value={configs.googleDriveFolderId}
          onChangeText={(v) => setConfig('googleDriveFolderId', v)}
          placeholder="ID da pasta"
        />
      </View>

      <View style={styles.field}>
        <Text>Velocidade da Narração</Text>
        <TextInput
          style={styles.input}
          value={configs.speechSpeed.toString()}
          onChangeText={(v) => setConfig('speechSpeed', parseFloat(v))}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.switchRow}>
        <Text>Efeito Ken Burns</Text>
        <Switch
          value={configs.kenBurns}
          onValueChange={(v) => setConfig('kenBurns', v)}
        />
      </View>

      <View style={styles.switchRow}>
        <Text>Transições Suaves</Text>
        <Switch
          value={configs.transicoes}
          onValueChange={(v) => setConfig('transicoes', v)}
        />
      </View>

      <Button title="Salvar Configurações" onPress={() => {}} color="#FF2D55" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  field: { marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15 }
});