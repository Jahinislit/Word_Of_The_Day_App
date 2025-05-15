import AsyncStorage from "@react-native-async-storage/async-storage";
import { WordData } from "../types";

// Fetch a truly random word
export const getRandomWord = async (): Promise<string> => {
  const response = await fetch("https://random-word-api.herokuapp.com/word");
  const data = await response.json();
  return data[0];
};

// Get definition and example sentence
export const fetchDefinition = async (word: string) => {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    if (!data[0]?.meanings?.length) {
      throw new Error("Invalid dictionary data.");
    }

    const definition = data[0].meanings[0].definitions[0].definition;
    const example = data[0].meanings[0].definitions[0].example || "No example available.";

    return { definition, example };
  } catch (err: any) {
    console.error("fetchDefinition error:", err.message);
    throw new Error("Unable to fetch definition. Please try another word.");
  }
};

// Save a word to local history
export const saveWordToHistory = async (word: WordData) => {
  try {
    const jsonValue = await AsyncStorage.getItem("wordHistory");
    const history = jsonValue ? JSON.parse(jsonValue) : [];
    const newHistory = [word, ...history];
    await AsyncStorage.setItem("wordHistory", JSON.stringify(newHistory));
  } catch (err) {
    console.error("Error saving word to history", err);
  }
};

// Get full word history
export const getWordHistory = async (): Promise<WordData[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem("wordHistory");
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (err) {
    console.error("Error fetching word history", err);
    return [];
  }
};

// Clear the history
export const clearWordHistory = async () => {
  try {
    await AsyncStorage.removeItem("wordHistory");
  } catch (err) {
    console.error("Error clearing word history", err);
  }
};


