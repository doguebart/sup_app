import React from "react";
import Routes from "./src/routes";
import { UserProvider } from "./src/context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
};

export default App;
