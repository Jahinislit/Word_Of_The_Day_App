import React from "react";
import { StyleSheet, Text, View } from "react-native";

type WordCardProps = {
  word: string;
  definition: string;
  example: string;
  date: string;
};

export default function WordCard({ word, definition, example, date }: WordCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{word}</Text>
      <Text style={styles.definition}>{definition}</Text>
      <Text style={styles.example}>“{example}”</Text>
      <Text style={styles.date}>📅 {date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1A1A1A",
  },
  definition: {
    fontSize: 18,
    color: "#333",
    marginBottom: 12,
    lineHeight: 26,
  },
  example: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#555",
    marginBottom: 15,
  },
  date: {
    fontSize: 13,
    color: "#888",
    textAlign: "right",
  },
});
