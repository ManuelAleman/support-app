import React, { useState, useEffect } from "react";
import { TaskProps, UserProps } from "@/utils/types";
import Cookies from "js-cookie";

interface IncidentManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskProps;
  user?: UserProps[];
  onUpdatedTask: (updatedTask: string) => void;
}

const IncidentManagementModal = ({
  isOpen,
  onClose,
  task,
  user,
  onUpdatedTask,
}: IncidentManagementModalProps) => {
  const [priority, setPriority] = useState("low");
  const [assignedTo, setAssignedTo] = useState(user?.[0]._id);
  const [service, setService] = useState("Maintenance - 4h");

  if (!isOpen) return null;

  const handleSave = async () => {
    const isConfirmed = window.confirm("¿Estás seguro de que deseas guardar los cambios?");
    const authToken = Cookies.get("authToken");
    if (isConfirmed) {
      const updatedTask = {
        taskId : task._id,
        priority,
        assignedTo,
        service,
      };

      console.log("Guardando cambios:", updatedTask);

      try {
        const response = await fetch("http://localhost:8080/task/authorize", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
          },
          body: JSON.stringify(updatedTask),
        });
  
        if (!response.ok) {
          throw new Error("Error al guardar los cambios");
        }
  
        console.log("Cambios guardados correctamente:", updatedTask);
        onUpdatedTask(task._id);
        onClose();
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
        alert("Hubo un problema al guardar los cambios. Inténtalo nuevamente.");
      }
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-[32rem] max-h-[80vh] overflow-auto border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-600 pb-2">
          ⚔️ Administrar Incidencia ⚔️
        </h2>

        <p className="text-gray-300 mb-2">
          Asunto: <span className="text-gray-100">{task.subject}</span>
        </p>
        <p className="text-gray-300 mb-2">
          Mensaje: <span className="text-gray-100">{task.message}</span>
        </p>

        <div className="mb-4">
          <label className="text-gray-400">Servicio:</label>
          <select
            className="block w-full mt-1 border border-gray-600 rounded bg-gray-700 text-gray-200 px-4 py-2 transition duration-200 ease-in-out shadow-inner focus:outline-none focus:ring-2 focus:ring-red-600 hover:bg-gray-600"
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="Maintenance - 4h">Mantenimiento (4hrs)</option>
            <option value="Support - 2h">Soporte (2hrs)</option>
            <option value="Installation - 1h-5h">Instalación (1-5hrs)</option>
            <option value="Consulting - 1h-8h">Consultoría (1-8hrs)</option>
            <option value="Hardware Repair - 3h-6h">Reparación de Hardware (3-6hrs)</option>
            <option value="Software Update - 1h-3h">Actualización de Software (1-3hrs)</option>
            <option value="Quick Training - 1h-2h">Capacitación Rápida (1-2hrs)</option>
            <option value="Data Migration - 4h-12h">Migración de Datos (4-12hrs)</option>
            <option value="Preventive Maintenance - 2h-4h">Mantenimiento Preventivo (2-4hrs)</option>
            <option value="Remote Support - 30min-2h">Soporte Remoto (30min-2hrs)</option>
            <option value="Security Assessment - 2h-5h">Evaluación de Seguridad (2-5hrs)</option>
            <option value="Technical Cleaning - 1h-3h">Limpieza Técnica de Equipos (1-3hrs)</option>
            <option value="Network Installation - 5h-8h">Instalación de Redes (5-8hrs)</option>
            <option value="IT Audit - 3h-6h">Auditoría de TI (3-6hrs)</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="text-gray-400">Prioridad:</label>
          <select
            className="block w-full mt-1 border border-gray-600 rounded bg-gray-700 text-gray-200 px-4 py-2 transition duration-200 ease-in-out shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:bg-gray-600"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="text-gray-400">Asignado a:</label>
          <select
            className="block w-full mt-1 border border-gray-600 rounded bg-gray-700 text-gray-200 px-4 py-2 transition duration-200 ease-in-out shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 hover:bg-gray-600"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            {user?.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <p className="text-gray-300 mb-2">
          Solicitud creada por: <span className="text-gray-100">{task.createdBy.name}</span>
        </p>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-200 ease-in-out shadow-md"
          >
            Cerrar
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded ml-2 transition duration-200 ease-in-out shadow-md"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentManagementModal;