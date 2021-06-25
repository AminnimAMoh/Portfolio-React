import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  containerState: {
    rootState: false,
    delayState: true,
  },
  buttonTrigered: "",
  renderPage: "",
};

const buttonActionSlice = createSlice({
  name: "buttonAction",
  initialState,
  reducers: {
    containerStateToggle(state: any, action: PayloadAction<string>) {
      state.containerState.rootState =
        action.payload === "PowerButton" ? false : true;
      state.buttonTrigered =
        action.payload === "PowerButton" ? " " : action.payload;
      state.renderPage =
        action.payload === "PowerButton" ? " " : action.payload;
      state.containerState.delayState = false;
    },
    onDelayStateChange(state) {
      state.containerState.delayState = true;
    },
  },
});

export const { containerStateToggle, onDelayStateChange } =
  buttonActionSlice.actions;

export default buttonActionSlice.reducer;
