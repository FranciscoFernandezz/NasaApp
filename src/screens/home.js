import { StatusBar } from "expo-status-bar";
import { StyleSheet, FlatList, Text } from "react-native";
import Header from "../components/header";
import Visor from "../components/visor";
import Card from "../components/card";
import Layout from "../layout/layout";
import { useEffect, useState } from "react";
import fetchApod from "../api/fetchapod";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();
  const [imagenes, setImagenes] = useState([]);

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
        data={imagenes.slice(1)}
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
      />
      <StatusBar style="light" />
    </Layout>
  );
}

const styles = StyleSheet.create({
  subtitulo: {
    fontSize: 18,
    color: "white",
    marginTop: 20,
    marginLeft: 5,
    marginBottom: 5,
  },
});
