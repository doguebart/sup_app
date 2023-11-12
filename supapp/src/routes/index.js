import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Context } from "../context/UserContext";

const Stack = createStackNavigator();

import SignIn from "../screens/auth/signIn";
import SignUp from "./../screens/auth/signUp";
import CreateCompany from "./../screens/company/create";
import Home from "../screens/home";
import Profile from "../screens/profile";

const Routes = () => {
  const { isAuthenticated } = useContext(Context);

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateCompany"
            component={CreateCompany}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Routes;
