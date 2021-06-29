import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  rootState: false,
  delayState: true,
  direction: true,
  buttonTrigered: "",
  renderPage: "",
};

const buttonActionSlice = createSlice({
  name: "buttonAction",
  initialState,
  reducers: {
    containerStateToggle(state: any, action: PayloadAction<string>) {
      state.rootState =
        action.payload === "PowerButton" ? false : true;
      state.buttonTrigered =
        action.payload === "PowerButton" ? " " : action.payload;
      state.renderPage =
        action.payload === "PowerButton" ? " " : action.payload;
      state.delayState = false;
    },
    onDelayStateChange(state) {
      state.delayState = true;
    },
  },
});

export const { containerStateToggle, onDelayStateChange } =
  buttonActionSlice.actions;

export default buttonActionSlice.reducer;
