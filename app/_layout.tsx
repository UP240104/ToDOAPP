import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import "../global.css";

export default function Layout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#6366f1" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Mis Tareas" }} />
        <Stack.Screen
          name="task/[id]"
          options={{ title: "Detalle de Tarea" }}
        />
        <Stack.Screen
          name="task/edit/[id]"
          options={{ title: "Editar Tarea" }}
        />
      </Stack>
      <Toast />
    </>
  );
}
