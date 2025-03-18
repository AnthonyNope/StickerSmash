import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
const Vector = require("../assets/images/Vector.png");
const Triangulo = require("../assets/images/PLIGROO.png");



export default function LimitationsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      <Image source={Vector} style={styles.logo} />

      <Text style={styles.title}>Welcome to ChatGPT</Text>
      <Text style={styles.subtitle}>Ask anything, get your answer</Text>

      <Image source={Triangulo} style={styles.Triangulo} />


      <Text style={styles.sectionTitle}>Limitations</Text>

      <View style={styles.examples}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            May occasionally generate incorrect information
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            May occasionally produce harmful instructions or biased content
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Limited knowledge of world and events after 2021
          </Text>
        </TouchableOpacity>
      </View>

      {/* Indicador de páginas */}
      <View style={styles.indicatorContainer}>
        <View style={styles.indicator} />
        <View style={styles.indicator} />
        <View style={[styles.indicator, styles.activeIndicator]} />
      </View>

      {/* Botón "Let's Chat" */}
      <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/ChatScreen')}>
        <Text style={styles.nextButtonText}>Let's Chat →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161B22', // Fondo oscuro
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  logo: {
    width: 40,  // Ajusta según el tamaño de la imagen
    height: 50,
    marginBottom: 10, // Espacio entre el logo y el título
    resizeMode: "contain", // Asegura que la imagen se ajuste correctamente
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 20,
  },
  Triangulo: {
    width: 25,  // Ajusta según el tamaño de la imagen
    height: 50,
    marginBottom: 10, // Espacio entre el logo y el título
    resizeMode: "contain", // Asegura que la imagen se ajuste correctamente
    filter: "invert(1)", // Invierte los colores (negro a blanco)
  },
  
  warning: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  examples: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2C2F36',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4A4A4A',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#FFFFFF', // Punto activo en blanco
  },
  nextButton: {
    backgroundColor: '#008060', // Botón verde
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
