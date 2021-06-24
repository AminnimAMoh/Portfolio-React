import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  containerState: false,
  buttonTrigered: "",
  renderPage: "",
};

const buttonActionSlice = createSlice({
  name: "buttonAction",
  initialState,
  reducers: {
    containerStateToggle(state: any, action: PayloadAction<string>) {
      state.containerState = action.payload === "PowerButton" ? false : true;
      state.buttonTrigered =
        action.payload === "PowerButton" ? " " : action.payload;
      state.renderPage =
        action.payload === "PowerButton" ? " " : action.payload;
    },
  },
});

export const { containerStateToggle } = buttonActionSlice.actions;

export default buttonActionSlice.reducer;
