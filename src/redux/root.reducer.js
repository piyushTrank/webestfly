import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import MiscReducer from "./misc/misc.reducer";
import NotificationsReducer from "./notifications/notifications.reducer";
import flDataReducer from "./save-fl-data/flData.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["flData"],
};

const rootReducer = combineReducers({
  notifications: NotificationsReducer,
  flData: flDataReducer,
  misc: MiscReducer,
});

export default persistReducer(persistConfig, rootReducer);
