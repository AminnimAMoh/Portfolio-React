import buttonActionSlice from "./slices/buttonActionSlice";
import ScreenSettingsSlice from "./slices/ScreenSettingsSlice";
import FetchSlice from './slices/fetchSlice'

export default function rootReducer(state = {}) {
    return {
        buttonAction: buttonActionSlice,
        screenAction: ScreenSettingsSlice,
        dataStore: FetchSlice
    }
  }