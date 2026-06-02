import { createSlice } from "@reduxjs/toolkit";

// Pure UI toggles — open/closed, theme, language. Synchronous client state.
// `language` powers the bilingual (English / বাংলা) site; it's hydrated from
// localStorage after mount (see LanguageInit) to avoid SSR hydration mismatch.
const initialState = {
  sidebarOpen: false,
  theme: "light",
  language: "en", // "en" | "bn"
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setLanguage(state, action) {
      state.language = action.payload === "bn" ? "bn" : "en";
      if (typeof window !== "undefined") {
        localStorage.setItem("lang", state.language);
      }
    },
  },
});

export const { toggleSidebar, setTheme, setLanguage } = uiSlice.actions;
export default uiSlice.reducer;
