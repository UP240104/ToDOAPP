import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { getTaskById, updateTask } from "../../../services/api";

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    getTaskById(Number(id)).then((data) => {
      const task = data.data ?? data;
      setTitle(task.title);
      setDescription(task.description ?? "");
      setCompleted(!!task.completed);
    });
  }, [id]);

  const handleSave = async () => {
    if (!title.trim()) {
      if (Platform.OS === "web") {
        window.alert("El título es obligatorio");
      } else {
        Alert.alert("Error", "El título es obligatorio");
      }
      return;
    }
    await updateTask(Number(id), { title, description, completed });
    Toast.show({
      type: "success",
      text1: "Tarea actualizada",
      text2: "Los cambios se guardaron correctamente",
    });
    router.replace("/");
  };

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-6">
      <View className="bg-white rounded-2xl p-5 shadow">
        <Text className="text-lg font-bold text-gray-700 mb-4">
          Editar Tarea
        </Text>

        <Text className="text-gray-600 mb-1">Título</Text>
        <TextInput
          className="border border-gray-200 rounded-xl px-3 py-2 mb-4 text-gray-800"
          value={title}
          onChangeText={setTitle}
        />

        <Text className="text-gray-600 mb-1">Descripción</Text>
        <TextInput
          className="border border-gray-200 rounded-xl px-3 py-2 mb-4 text-gray-800"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <View className="flex-row items-center justify-between mb-5">
          <Text className="text-gray-600">Completada</Text>
          <Switch
            value={completed}
            onValueChange={setCompleted}
            trackColor={{ false: "#d1d5db", true: "#6366f1" }}
          />
        </View>

        <Pressable
          className="bg-indigo-500 rounded-xl py-3 items-center"
          onPress={handleSave}
        >
          <Text className="text-white font-bold text-base">
            Guardar cambios
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
