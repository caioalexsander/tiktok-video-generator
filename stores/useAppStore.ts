import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  // Configurações
  configs: {
    googleDriveFolderId: string;
    speechProvider: string;
    speechSpeed: number;
    qtdImagens: number;
    tempoPorImagem: number;
    fps: number;
    kenBurns: boolean;
    transicoes: boolean;
  };

  // Estado da geração
  isGenerating: boolean;
  pendingCount: number;

  // Ações
  setConfig: (key: keyof AppState['configs'], value: any) => void;
  setGenerating: (status: boolean) => void;
  setPendingCount: (count: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      configs: {
        googleDriveFolderId: '',
        speechProvider: 'piper',
        speechSpeed: 1.0,
        qtdImagens: 30,
        tempoPorImagem: 2,
        fps: 30,
        kenBurns: true,
        transicoes: true,
      },
      isGenerating: false,
      pendingCount: 0,

      setConfig: (key, value) =>
        set((state) => ({
          configs: { ...state.configs, [key]: value },
        })),

      setGenerating: (status) => set({ isGenerating: status }),
      setPendingCount: (count) => set({ pendingCount: count }),
    }),
    {
      name: 'tiktok-video-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);