const BASE_IP = "192.168.1.64";
const BASE_URL = `http://${BASE_IP}:3000/todos`;

//previene respuestas de strings vacios
const safeJson = async (res: Response) => {
  const text = await res.text();
  return text ? JSON.parse(text) : {};
};

export const getTasks = async () => {
  console.log("Fetching:", BASE_URL);
  const res = await fetch(BASE_URL);
  console.log("Status:", res.status);
  return safeJson(res);
};

export const getTaskById = async (id: number) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return safeJson(res);
};

export const createTask = async (task: {
  title: string;
  description?: string;
}) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return safeJson(res);
};

export const updateTask = async (
  id: number,
  task: { title?: string; description?: string; completed?: boolean },
) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return safeJson(res);
};

export const deleteTask = async (id: number) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return safeJson(res);
};
