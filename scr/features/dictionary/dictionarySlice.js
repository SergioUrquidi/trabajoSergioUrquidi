import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  words: [],
  error: null
};

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    addWord: (state, action) => {
      const { spanish, english, portuguese } = action.payload;
      state.words.push({
        es: spanish.toLowerCase(),
        en: english.toLowerCase(),
        pt: portuguese.toLowerCase()
      });
      state.error = null;
    },
    removeWord: (state, action) => {
      const searchWord = action.payload.toLowerCase();
      const wordIndex = state.words.findIndex(word => 
        word.es === searchWord || 
        word.en === searchWord || 
        word.pt === searchWord
      );
      
      if (wordIndex === -1) {
        state.error = "Word not found in dictionary";
        return;
      }
      
      state.words.splice(wordIndex, 1);
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { addWord, removeWord, clearError } = dictionarySlice.actions;

// Selectors
export const selectWords = (state) => state.dictionary.words;
export const selectError = (state) => state.dictionary.error;

// Translation selector
export const translateWord = (state, word, fromLang, toLang) => {
  const searchWord = word.toLowerCase();
  const foundWord = state.dictionary.words.find(w => w[fromLang] === searchWord);
  return foundWord ? foundWord[toLang] : null;
};

export default dictionarySlice.reducer;