import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { deleteTask, getTaskById } from "../../services/api";

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTaskById(Number(id))
      .then((data) => setTask(data.data ?? data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = () => {
    if (Platform.OS === "web") {
      window.confirm("¿Seguro?") &&
        deleteTask(Number(id)).then(() => router.replace("/"));
    } else {
      Alert.alert("Eliminar", "¿Seguro?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await deleteTask(Number(id));
            router.replace("/");
          },
        },
      ]);
    }
  };

  if (loading)
    return <ActivityIndicator className="mt-10" size="large" color="#6366f1" />;
  if (!task)
    return (
      <Text className="text-center mt-10 text-gray-400">
        Tarea no encontrada
      </Text>
    );

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-6">
      <View className="bg-white rounded-2xl p-5 shadow">
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          {task.title}
        </Text>
        <Text className="text-gray-500 mb-4">
          {task.description ?? "Sin descripción"}
        </Text>
        <View
          className={`self-start px-3 py-1 rounded-full ${
            task.completed ? "bg-green-100" : "bg-yellow-100"
          }`}
        >
          <Text
            className={task.completed ? "text-green-600" : "text-yellow-600"}
          >
            {task.completed ? "Completada" : "Pendiente"}
          </Text>
        </View>
      </View>

      <View className="flex-row gap-3 mt-5">
        <Pressable
          className="flex-1 bg-blue-500 rounded-xl py-3 items-center"
          onPress={() => router.push(`/task/edit/${id}`)}
        >
          <Text className="text-white font-bold">Editar</Text>
        </Pressable>
        <Pressable
          className="flex-1 bg-red-500 rounded-xl py-3 items-center"
          onPress={handleDelete}
        >
          <Text className="text-white font-bold">Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
}
