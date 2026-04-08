import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import TaskItem from "../components/TaskItem";
import { createTask, deleteTask, getTasks, updateTask } from "../services/api";

export default function HomeScreen() {
  type Task = {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    created_at?: string;
  };

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data.data ?? data);
    } catch {
      if (Platform.OS === "web") {
        window.alert("No se pudieron cargar las tareas");
      } else {
        Alert.alert("Error", "No se pudieron cargar las tareas");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async () => {
    if (!title.trim()) {
      if (Platform.OS === "web") {
        window.alert("El título es obligatorio");
      } else {
        Alert.alert("Error", "El título es obligatorio");
      }
      return;
    }
    await createTask({ title, description });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const handleDelete = async (id: number) => {
    if (Platform.OS === "web") {
      window.confirm("¿Seguro que quieres eliminar esta tarea?") &&
        (await deleteTask(id)) &&
        fetchTasks();
    } else {
      Alert.alert("Eliminar", "¿Seguro que quieres eliminar esta tarea?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await deleteTask(id);
            fetchTasks();
          },
        },
      ]);
    }
  };

  const handleToggle = async (id: number, completed: boolean) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed } : t)),
    );

    await updateTask(id, {
      title: task.title,
      description: task.description ?? "",
      completed,
    });
  };

  return (
    <View className="flex-1 bg-gray-100">
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={
          <View className="bg-white rounded-2xl p-4 mb-5 shadow">
            <Text className="text-lg font-bold text-gray-700 mb-3">
              Nueva Tarea
            </Text>
            <TextInput
              className="border border-gray-200 rounded-xl px-3 py-2 mb-2 text-gray-800"
              placeholder="Título *"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              className="border border-gray-200 rounded-xl px-3 py-2 mb-3 text-gray-800"
              placeholder="Descripción (opcional)"
              value={description}
              onChangeText={setDescription}
            />
            <Pressable
              className="bg-indigo-500 rounded-xl py-3 items-center"
              onPress={handleCreate}
            >
              <Text className="text-white font-bold text-base">+ Agregar</Text>
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        )}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" color="#6366f1" className="mt-10" />
          ) : (
            <Text className="text-center text-gray-400 mt-10">
              No hay tareas aún
            </Text>
          )
        }
      />
    </View>
  );
}
