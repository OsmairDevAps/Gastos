import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { IFuncionario } from '@/utils/interface';
import { AuthContext } from '@/context/AuthContext';
import Header from '@/components/header';

export default function RootLayout() {
  const [funcionario, setFuncionario] = useState<IFuncionario | null>(null);
  const [isReady, setIsReady] = useState(false); 
  const segments = useSegments();
  const router = useRouter();
  
  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const isInAuthGroup = segments[0] === '(auth)';
    if (!funcionario && !isInAuthGroup) {
      router.replace('/(auth)/login');
    }
  }, [isReady, funcionario, segments]);

  return (
    <AuthContext.Provider value={{ funcionario, setFuncionario }}>
      <Stack
        screenOptions={{
        statusBarStyle: 'light',
        header: () => {
          const isLogin = segments[0] === '(auth)';
          if (isLogin) return null;
          return <Header />;
        },
      }}
      />
    </AuthContext.Provider>
  );
}