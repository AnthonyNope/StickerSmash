import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Para los íconos,  ya  no los uso
import { signOut } from 'firebase/auth';
import { auth } from '../utils/FirebaseConfig';

import { useEffect, useState } from "react";
import { db } from "../utils/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";



export default function MenuScreen() {
  const router = useRouter();


  const [chatList, setChatList] = useState<any[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "chats"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setChatList(data);
      } catch (error) {
        console.error("Error obteniendo chats:", error);
      }
    };

    fetchChats();
  }, []);



  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/login');
  };
  

  return (
    <View style={styles.container}>
      {/* Encabezado con botón de regreso */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color="white" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Opciones del menú */}
      <ScrollView style={styles.menuContainer}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.replace('/ChatScreen?newChat=true')}
      >
        <Ionicons name="chatbubble-outline" size={18} color="white" />
        <Text style={styles.menuText}>New Chat</Text>
        <Ionicons name="chevron-forward" size={18} color="white" />
      </TouchableOpacity>

      {chatList.map((chat) => (
        <TouchableOpacity
          key={chat.id}
          style={styles.menuItem}
          onPress={() => router.push(`/ChatScreen?id=${chat.id}`)}
        >
          <Ionicons name="chatbubbles-outline" size={18} color="white" />
          <Text style={styles.menuText}>{chat.title || "Chat sin título"}</Text>
        </TouchableOpacity>
      ))}



        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="trash-outline" size={18} color="white" />
          <Text style={styles.menuText}>Clear conversations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="star-outline" size={18} color="white" />
          <Text style={styles.menuText}>Upgrade to Plus</Text>
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="sunny-outline" size={18} color="white" />
          <Text style={styles.menuText}>Light mode</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="information-circle-outline" size={18} color="white" />
          <Text style={styles.menuText}>Updates & FAQ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, styles.logout]} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={18} color="#E63946" />
          <Text style={[styles.menuText, { color: '#E63946' }]}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161B22',
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
  menuContainer: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  menuText: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#2C2F36',
    marginVertical: 10,
  },
  newBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  newBadgeText: {

    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  logout: {
    marginTop: 20,
  },
});
