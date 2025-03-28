import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getResponseFromGemini } from "../services/gemini";
const Vector = require("../assets/images/Vector.png");
import { Image } from "react-native";
import { useLocalSearchParams } from 'expo-router';

import { db } from "../utils/FirebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { doc, updateDoc, getDoc } from "firebase/firestore";







export default function ChatScreen() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ role: "user" | "ai"; text: string }[]>([]);

  const [chatId, setChatId] = useState<string | null>(null);
  

  const params = useLocalSearchParams();
  const chatIdFromParams = params?.id as string | undefined;


  useEffect(() => {
    if (params?.newChat === "true") {
      setChat([]);
      setMessage("");
  
      // Limpiamos la URL para que no vuelva a detectar "newChat"
      router.replace('/ChatScreen');
    }
  }, []);
  
  useEffect(() => {
    const loadChat = async () => {
      if (chatIdFromParams) {
        try {
          const docRef = doc(db, "chats", chatIdFromParams);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            const chatData = docSnap.data();
            setChat(chatData.messages || []);
            setChatId(docSnap.id);
          } else {
            console.log("Chat no encontrado");
          }
        } catch (error) {
          console.error("Error cargando chat:", error);
        }
      }
    };
  
    loadChat();
  }, [chatIdFromParams]);
  


  const sendMessage = async () => {
    if (!message.trim()) return;

    // Mensaje del usuario
    const userMessage: { role: "user"; text: string } = { role: "user", text: message };
    setChat((prevChat) => [...prevChat, userMessage]);
    setMessage("");

    // Si es un nuevo chat, lo guardamos en Firestore
    if (!chatId) {
      try {
        const docRef = await addDoc(collection(db, "chats"), {
          title: `Chat ${new Date().getTime()}`, // por ahora usamos timestamp como nombre
          create_at: Timestamp.now(),
          messages: [userMessage],
        });

        setChatId(docRef.id); // Guardamos el ID para futuras actualizaciones
      } catch (error) {
        console.error("Error guardando el chat:", error);
      }
    }


    // Llamar a la API de Gemini
    const aiResponse = await getResponseFromGemini(message);

    if (aiResponse) {
      const aiMessage: { role: "ai"; text: string } = { role: "ai", text: aiResponse };
    
      setChat((prevChat) => {
        const updatedChat = [...prevChat, aiMessage];
    
        if (chatId) {
          const chatRef = doc(db, "chats", chatId);
          updateDoc(chatRef, { messages: updatedChat }).catch((error) =>
            console.error("Error actualizando chat:", error)
          );
        }
    
        return updatedChat;
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Barra superior */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color="white" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/menu")}>
            <Image source={Vector} style={styles.logo} />
        </TouchableOpacity>
      </View>

      {/* Área del chat */}
      <ScrollView style={styles.chatContainer}>
        {chat.map((msg, index) => (
          <View key={index} style={[styles.message, msg.role === "user" ? styles.userMessage : styles.aiMessage]}>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input de texto */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#A0A0A0"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#161B22", paddingHorizontal: 15, paddingTop: 40 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 },
  backButton: { flexDirection: "row", alignItems: "center" },
  backText: { color: "white", fontSize: 16, marginLeft: 5 },
  chatContainer: { flex: 1, marginVertical: 10 },
  message: { padding: 10, marginVertical: 4, borderRadius: 8, maxWidth: "80%" },
  userMessage: { alignSelf: "flex-end", backgroundColor: "#008060" },
  aiMessage: { alignSelf: "flex-start", backgroundColor: "#2C2F36" },
  messageText: { color: "white" },
  inputContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#2C2F36", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, marginBottom: 20 },
  input: { flex: 1, color: "white", fontSize: 16 },
  sendButton: { backgroundColor: "#008060", padding: 10, borderRadius: 8 },
  logo: {
    width: 25,  // Ajusta según el tamaño de la imagen
    height: 50,
    marginBottom: 10, // Espacio entre el logo y el título
    resizeMode: "contain", // Asegura que la imagen se ajuste correctamente
  },
});
