import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
};

type Props = {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
};

export default function TaskItem({ task, onDelete, onToggle }: Props) {
  const router = useRouter();

  return (
    <View className="bg-white rounded-2xl p-4 mb-3 shadow flex-row items-center">
      {/* Checkbox */}
      <Pressable
        onPress={() => onToggle(task.id, !task.completed)}
        className={
          task.completed
            ? "w-6 h-6 rounded-full border-2 mr-3 items-center justify-center bg-green-500 border-green-500"
            : "w-6 h-6 rounded-full border-2 mr-3 items-center justify-center border-gray-400"
        }
      >
        {task.completed && (
          <Text className="text-white text-xs font-bold">✓</Text>
        )}
      </Pressable>

      {/* Título y descripción */}
      <Pressable
        className="flex-1"
        onPress={() => router.push(`/task/${task.id}`)}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: task.completed ? "#9ca3af" : "#1f2937",
            textDecorationLine: task.completed ? "line-through" : "none",
          }}
        >
          {task.title}
        </Text>
        {task.description ? (
          <Text className="text-sm text-gray-400 mt-1" numberOfLines={1}>
            {task.description}
          </Text>
        ) : null}
      </Pressable>

      {/* Botones */}
      <View className="flex-row gap-2 ml-2">
        <Pressable
          onPress={() => router.push(`/task/edit/${task.id}`)}
          className="bg-blue-100 px-3 py-1 rounded-lg"
        >
          <Text className="text-blue-600 text-sm">Editar</Text>
        </Pressable>
        <Pressable
          onPress={() => onDelete(task.id)}
          className="bg-red-100 px-3 py-1 rounded-lg"
        >
          <Text className="text-red-500 text-sm">Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
}
