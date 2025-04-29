import { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";

import axios from "axios";

interface Task {
  id: string;
  title: string;
  done: boolean;
}

function App() {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await api.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };
  

  const toggleTask = async (id: string) => {
    await api.put(`/tasks/${id}`);
    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex justify-center">
      <p className="text-[#242424] font-black text-[35rem] absolute bottom-1/4 z-0 max-h-screen">
        {tasks.length}
      </p>
      <div className="flex flex-col justify-center items-center z-40">
        <form onSubmit={addTask} className="flex flex-col items-center">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-sm transition-all duration-300 outline outline-white/0 focus:outline-white shadow-lg outline-offset-2 font-medium"
            placeholder="Ajouter une tâche"
          />
          <button type="submit" className="add mt-2.5 w-fit">
            Ajouter
          </button>
        </form>
        <table className="mt-5 max-h-[55vh] overflow-y-auto custom-scrollbar">
          {tasks.map((todo, i) => (
            <tr className="*:px-3">
              <td
                key={todo.id}
                className="flex items-center gap-5 justify-between mb-2"
              >
                <p
                  className="flex items-center gap-2.5 text-lg"
                  style={
                    todo.done
                      ? { textDecoration: "line-through", opacity: "0.5" }
                      : {}
                  }
                >
                  <sub>{i + 1}</sub>
                  {todo.title}
                </p>
              </td>

              <td>
                <button
                  onClick={() => deleteTask(todo.id)}
                  className="delete text-xl group aspect-square w-6"
                >
                  <MdDeleteForever
                    size={16}
                    className="delete fill-slate-50 group-hover:fill-slate-950"
                  />
                </button>
              </td>

              <td>
                <button
                  onClick={() => toggleTask(todo.id)}
                  className={`text-xl aspect-square w-6 hover:opacity-75
                  ${todo.done && "bg-green-700"}`}
                >
                  <FaRegCircleCheck size={16} className="fill-slate-50" />
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default App;
