import React from 'react';
import { FontAwesome, FontAwesome5, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#010101',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="despesa"
        options={{
          title: 'Despesas',
          tabBarIcon: ({ color }: any) => <FontAwesome6 name="sack-dollar" color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="receita"
        options={{
          title: 'Receitas',
          tabBarIcon: ({ color }: any) => <FontAwesome name="dollar" color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }: any) => <MaterialIcons name="home" color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="produto"
        options={{
          title: 'Produto',
          tabBarIcon: ({ color }: any) => <FontAwesome5 name="list" color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="compra"
        options={{
          title: 'Compras',
          tabBarIcon: ({ color }: any) => <FontAwesome5 name="shopping-cart" color={color} size={28} />,
        }}
      />
    </Tabs>
  );
}
