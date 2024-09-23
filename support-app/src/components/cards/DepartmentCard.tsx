import React from 'react';

interface DepartmentCardProps {
    nombre: string;
}

const DepartmentCard = ({ nombre} : DepartmentCardProps) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
      <h2 className="text-xl font-bold text-gray-800">{nombre}</h2>
    </div>
  );
};

export default DepartmentCard;
