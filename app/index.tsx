import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Pantalla Principal</Text>
      <TouchableOpacity onPress={() => router.push('/welcome')} style={{ marginTop: 20, padding: 10, backgroundColor: 'blue' }}>
        <Text style={{ color: 'white' }}>Screens</Text>
      </TouchableOpacity>
    </View>
  );
}

