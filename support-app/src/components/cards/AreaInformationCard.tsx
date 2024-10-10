import React from 'react';

interface Area {
  name: string;
  tasks?: string[];
  equipment?: string[];
}

interface AreaInformationCardProps {
  areas: Area[];
}

const AreaInformationCard= ({ areas } : AreaInformationCardProps) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      {areas.length === 0 ? (
        <p>No hay áreas disponibles.</p>
      ) : (
        areas.map((area, areaIndex) => (
          <div key={areaIndex} className="border-b border-gray-300 py-4">
            <strong className="block text-lg">{area.name}</strong>

            <p className="text-gray-700">
              Equipos: {(area.equipment ?? []).length > 0 ? area.equipment?.length : "Sin equipos"}
            </p>
            <p className="text-gray-700">
              Tareas: {(area.tasks?.length ?? 0) > 0 ? area.tasks?.length : "Sin tareas"}
            </p>

            {area.tasks && area.tasks.length > 0 && (
              <ul className="list-disc pl-5">
                {area.tasks.map((task, taskIndex) => (
                  <li key={taskIndex} className="text-gray-600">{task}</li>
                ))}
              </ul>
            )}

            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Ver más detalles
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AreaInformationCard;
