import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Context } from "../context/UserContext";
import BottomTab from "./../components/bottomTab";
import Home from "./../screens/home";
import CreateCompany from "./../screens/company/create";
import Profile from "./../screens/profile";
import EditCompany from "./../screens/company/edit/edit";
import SignIn from "./../screens/auth/signIn";
import SignUp from "./../screens/auth/signUp";

const Stack = createStackNavigator();

const AppRoutes = () => {
  return (
    <Stack.Navigator>
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
      <Stack.Screen
        name="EditCompany"
        component={EditCompany}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AuthRoutes = () => {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};

const Routes = () => {
  const { isAuthenticated } = useContext(Context);

  return (
    <>
      {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
      {isAuthenticated && <BottomTab />}
    </>
  );
};

export default Routes;
