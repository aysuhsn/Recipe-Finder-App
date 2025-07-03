import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { LanguageProvider } from "./context/LanguageContext";
import { ColorModeProvider } from "./context/ColorModeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId="BURAYA_GOOGLE_CLIENT_ID_YAZ">
        <ColorModeProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </ColorModeProvider>
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);

