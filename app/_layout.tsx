import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Redirect } from 'expo-router';
import Header from '@/components/header';
import { useState } from 'react';

export default function RootLayout() {
  // if (!user) {
  //   return <Redirect href="/login" />;
  // }

  return (
    <Stack
      screenOptions={{
        statusBarStyle: 'light',
        header: () => <Header />,
      }}
    />
  );
}


