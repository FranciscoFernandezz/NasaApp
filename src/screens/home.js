import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  FlatList,
  View,
  Button,
  Alert,
  Modal,
  Text,
  Pressable,
} from "react-native";
import Header from "../components/header";
import Visor from "../components/visor";
import Card from "../components/card";
import Layout from "../layout/layout";
import { useEffect, useState } from "react";
import fetchApod from "../api/fetchapod";
import { useNavigation } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";

export default function Home() {
  const navigation = useNavigation();
  const [imagenes, setImagenes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const MIN_DATE = "1995-06-16";
  const MAX_DATE = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const getImages = async () => {
      const data = await fetchApod(8);
      setImagenes([...data].reverse());
    };
    getImages();
  }, []);

  const goToDetails = (item) => {
    navigation.navigate("Detalles", { data: item });
  };

  const confirmarFecha = async () => {
    if (!fechaSeleccionada) {
      Alert.alert("Atención", "Seleccioná una fecha del calendario.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=fmhY1XYjBAzrrFKLxIb0ImZNtgQ01YfP8aPJv3vv&date=${fechaSeleccionada}`
      );
      const data = await response.json();

      if (data.code === 400 || data.error) {
        Alert.alert("Error", "No hay imagen para esa fecha.");
        return;
      }

      setSelectedImage(data);
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener la imagen.");
    }
  };

  const renderHeader = () => {
    if (imagenes.length === 0) return null;
    return (
      <>
        <Header />
        <Visor
          titulo={imagenes[0].title}
          url={imagenes[0].url}
          onPress={() => goToDetails(imagenes[0])}
          fecha={imagenes[0].date}
        />
        <Text style={styles.subtitulo}>Imágenes de los últimos 7 días</Text>
      </>
    );
  };

  return (
    <Layout>
      <FlatList
        data={imagenes}
        keyExtractor={(item) => item.date}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            date={item.date}
            url={item.url}
            onPress={() => goToDetails(item)}
          />
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <Pressable
              style={[styles.button, styles.buttonWhite]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.textStyle}>Seleccionar fecha anterior</Text>
            </Pressable>

            {selectedImage && (
              <Card
                title={`${selectedImage.title}`}
                date={selectedImage.date}
                url={selectedImage.url}
                onPress={() => goToDetails(selectedImage)}
              />
            )}

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                  <Text style={styles.modalTitle}>Elegí una fecha</Text>
                  <Calendar
                    onDayPress={(day) => setFechaSeleccionada(day.dateString)}
                    markedDates={{
                      [fechaSeleccionada]: {
                        selected: true,
                        selectedColor: "#2196f3",
                      },
                    }}
                    minDate={MIN_DATE}
                    maxDate={MAX_DATE}
                  />
                  <View style={styles.modalButtons}>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.textStyle}>Cancelar</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonConfirm]}
                      onPress={confirmarFecha}
                    >
                      <Text style={styles.textStyle}>Confirmar</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        }
      />
      <StatusBar style="light" />
    </Layout>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    marginBottom: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    minWidth: 100,
  },
  buttonClose: {
    backgroundColor: "#aaa",
  },
  buttonConfirm: {
    backgroundColor: "#2196f3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 18,
    color: "white",
    marginVertical: 10,
    marginLeft: 10,
  },
});
