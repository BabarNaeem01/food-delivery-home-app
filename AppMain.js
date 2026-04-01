import { registerRootComponent } from "expo";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const getExpoHost = () => {
  const candidates = [
    Constants.expoConfig?.hostUri,
    Constants.manifest2?.extra?.expoGo?.debuggerHost,
    Constants.manifest?.debuggerHost
  ];

  const hostValue = candidates.find(Boolean) ?? "";
  const host = hostValue.split(":")[0];
  return host || "localhost";
};

const getApiBaseUrl = (port) => {
  const host = getExpoHost();
  return `http://${host}:${port}`;
};

const API_BASE_URL = getApiBaseUrl(4105);

function MainApp() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  useEffect(() => {
    fetch(`${API_BASE_URL}/restaurants`)
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch(() => setRestaurants([]));
  }, []);

  const cuisines = ["All", ...new Set(restaurants.map((item) => item.cuisine))];
  const visibleRestaurants =
    selectedCuisine === "All"
      ? restaurants
      : restaurants.filter((item) => item.cuisine === selectedCuisine);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Food Delivery</Text>
        <FlatList
          horizontal
          data={cuisines}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.chip, selectedCuisine === item && styles.activeChip]}
              onPress={() => setSelectedCuisine(item)}
            >
              <Text style={[styles.chipText, selectedCuisine === item && styles.activeChipText]}>
                {item}
              </Text>
            </Pressable>
          )}
        />
        <FlatList
          data={visibleRestaurants}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.cuisine}</Text>
              <Text style={styles.rating}>Rating: {item.rating}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fffaf0" },
  title: { fontSize: 28, fontWeight: "700", color: "#b45309", padding: 20 },
  filters: { paddingHorizontal: 20, paddingBottom: 16 },
  chip: { backgroundColor: "#fef3c7", borderRadius: 999, paddingHorizontal: 14, paddingVertical: 10, marginRight: 10 },
  activeChip: { backgroundColor: "#d97706" },
  chipText: { color: "#92400e", fontWeight: "600" },
  activeChipText: { color: "#ffffff" },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  card: { backgroundColor: "#ffffff", borderRadius: 18, padding: 16, marginBottom: 12 },
  name: { fontSize: 18, fontWeight: "700", color: "#111827", marginBottom: 4 },
  rating: { marginTop: 6, color: "#b45309" }
});

registerRootComponent(MainApp);

export default MainApp;
