import WordCard from "@/components/WordCard";
import { WordData } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HistoryScreen() {
  const [history, setHistory] = useState<WordData[]>([]);


  const loadHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem("history");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load history:", error);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem("history");
      setHistory([]);
    } catch (error) {
      console.error("Failed to clear history:", error);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <View style={styles.container}>
      {history.length === 0 ? (
        <Text style={styles.emptyText}>No history yet. View some words first!</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }:{item: WordData}) => (
            <WordCard
              word={item.word}
              definition={item.definition}
              example={item.example}
              date={item.date}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity style={styles.clearButton} onPress={clearHistory} disabled={history.length === 0}>
        <Text style={styles.clearButtonText}>Clear History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 50,
  },
  clearButton: {
    backgroundColor: "#e53935",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#e53935",
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
