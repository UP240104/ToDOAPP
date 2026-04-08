const BASE_IP = "10.10.150.189";
const BASE_URL = `http://${BASE_IP}:3000/todos`; //para que se pueda acceder desde otros dispositivos

//previene respuestas de strings vacios
const safeJson = async (res: Response) => {
  const text = await res.text();
  return text ? JSON.parse(text) : {};
};

export const getTasks = async () => {
  const res = await fetch(BASE_URL);
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
