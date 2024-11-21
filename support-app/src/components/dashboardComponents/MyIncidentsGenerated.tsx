import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { TaskProps } from '@/utils/types';

const MyIncidentsGenerated = () => {
  const [loading, setLoading] = useState(false);
  const [myTask, setMyTask] = useState<TaskProps[]>([]);

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    const fetchMyTask = async () => {
      try {
        setLoading(true); 
        const response = await fetch(
          "http://localhost:8080/task/getMyGeneratedTasks",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const data = await response.json();
        console.log("Mis tareas generadas:", data);
        setMyTask(data); 
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las tareas completadas:", error);
        setLoading(false);
      }
    };
    
    fetchMyTask();
  }, []); 

  return (
    <div className="text-black">
      <h1 className="text-3xl font-extrabold text-gray-900 mt-4 mb-6 text-center">
        Mis incidencias generadas
      </h1>

      {loading ? (
        <p>Cargando...</p>
      ) : myTask.length === 0 ? (
        <p className="text-gray-500">
          No tienes tareas completadas actualmente.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {myTask.map((task) => (
            <div
              key={task._id}
              className="bg-white p-4 shadow-lg rounded-lg border-l-4 border-blue-500 flex flex-col justify-between hover:shadow-xl transition-shadow h-full"
            >
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-800">{task.subject}</h3>
                <p className="text-gray-500">{task.message}</p>
                <p
                  className={`mt-2 text-sm font-semibold ${
                    task.priority === "high"
                      ? "text-red-600"
                      : task.priority === "medium"
                      ? "text-orange-600"
                      : "text-yellow-600"
                  }`}
                >
                  {task.priority === "high" && "Alta prioridad"}
                  {task.priority === "medium" && "Prioridad media"}
                  {task.priority === "low" && "Baja prioridad"}
                </p>
                <p
                  className={`text-sm mt-2 ${
                    task.status === "inProgress"
                      ? "text-blue-600"
                      : task.status === "completed"
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  Estado: {task.status === "pending" ? "Pendiente" : task.status}
                </p>

                <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-800">
                    Cambios solicitados:
                  </p>
                  {task.changes && task.changes.length > 0 ? (
                    <ul className="text-xs text-gray-600 mt-2">
                      {task.changes.map((change) => (
                        <li key={change._id} className="mt-1">
                          {change.piece.type} - {change.piece.model}:
                          <span
                            className={`ml-2 font-semibold ${
                              change.status === "pending"
                                ? "text-orange-600"
                                : change.status === "completed"
                                ? "text-green-600"
                                : change.status === "rejected"
                                ? "text-red-600"
                                : "text-gray-600"
                            }`}
                          >
                            {change.status === "pending"
                              ? "Pendiente"
                              : change.status === "completed"
                              ? "Completado"
                              : change.status === "rejected"
                              ? "Rechazado"
                              : change.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-gray-500 mt-2">
                      No se han solicitado cambios
                    </p>
                  )}
                </div>
              </div>

              {/* Aquí va la fecha en la parte inferior */}
              <div>
                <li className="mt-2 text-xs text-gray-600 font-bold">
                  <span className="text-gray-800">Completado el:</span>
                  <br />
                  <span className="text-blue-600 font-semibold">
                    {task.completedAt
                      ? new Date(task.completedAt).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }) +
                        " a las " +
                        new Date(task.completedAt).toLocaleTimeString("es-ES", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Incompleto..."}
                  </span>
                </li>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyIncidentsGenerated;
