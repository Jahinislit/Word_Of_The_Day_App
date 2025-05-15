import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WordCard from "../components/WordCard";
import { WordData } from "../types";
import { fetchDefinition, getRandomWord, saveWordToHistory } from "../utils/api";

const HomeScreen = () => {
  const [word, setWord] = useState<WordData | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation() as any;

  const fetchNewWord = async () => {
    setLoading(true);
    try {
      let success = false;
      let attempts = 0;

      while (!success && attempts < 5) {
        attempts++;
        const randomWord = await getRandomWord();

        try {
          const { definition, example } = await fetchDefinition(randomWord);

          const newWord: WordData = {
            word: randomWord,
            definition,
            example,
            date: new Date().toLocaleDateString(),
          };

          setWord(newWord);
          await saveWordToHistory(newWord);
          success = true;
        } catch (err) {
          console.warn(`Attempt ${attempts}: Failed for "${randomWord}"`);
        }
      }

      if (!success) {
        throw new Error("Could not find a valid word after several attempts.");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewWord();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Word of the Day</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : word ? (
        <WordCard {...word} />
      ) : (
        <Text style={styles.errorText}>No word loaded.</Text>
      )}
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={fetchNewWord}
          disabled={loading}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>🔄 New Word</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate("history")}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryButtonText}>📜 View History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FF",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 100,
    textAlign: "center",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    marginVertical: 10,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
    gap: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: "#4F86F7",
  },
  secondaryButton: {
    backgroundColor: "#E0E5F2",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryButtonText: {
    color: "#4F86F7",
    fontWeight: "600",
    fontSize: 16,
  },
});

