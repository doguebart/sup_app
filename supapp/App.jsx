import React from "react";
import Routes from "./src/routes";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./src/context/UserContext";

const App = () => {
  return (
    <NavigationContainer>
      <UserProvider>
        <Routes />
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;
