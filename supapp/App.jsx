import React, { useState } from "react";
import { StatusBar, StyleSheet } from "react-native";
import Routes from "./src/routes";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./src/context/UserContext";

const App = () => {
  const [statusBarColor, setStatusBarColor] = useState("black");

  return (
    <NavigationContainer>
      <UserProvider>
        <StatusBar translucent={true} barStyle={statusBarColor} />
        <Routes />
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;
