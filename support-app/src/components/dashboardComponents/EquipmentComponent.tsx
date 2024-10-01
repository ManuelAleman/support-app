import React, { useState } from 'react';
import EquipmentCard from '@/components/cards/EquipmentCard';
import EquipmentModal from '@/components/modals/NewEquipmentModal';

interface Equipment {
  id: number;
  name: string;
  type: string;
  status: string;
}

const initialEquipmentList: Equipment[] = [
  { id: 1, name: 'Computadora A', type: 'Computadora', status: 'Disponible' },
  { id: 2, name: 'Servidor B', type: 'Servidor', status: 'En uso' },
  { id: 3, name: 'Impresora C', type: 'Impresora', status: 'Disponible' },
];

const EquipmentComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [equipmentList, setEquipmentList] = useState<Equipment[]>(initialEquipmentList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEquipment, setNewEquipment] = useState<Equipment>({
    id: equipmentList.length + 1,
    name: '',
    type: '',
    status: 'Disponible',
  });

  const filteredEquipment = equipmentList.filter(equipment =>
    equipment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEquipment = () => {
    setEquipmentList([...equipmentList, { ...newEquipment, id: equipmentList.length + 1 }]);
    setIsModalOpen(false);
    setNewEquipment({ id: equipmentList.length + 2, name: '', type: '', status: 'Disponible' });
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-black">Equipamiento de la Empresa</h2>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar equipamiento..."
          className="border rounded-md p-2 w-full text-gray-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="flex justify-between mb-4">
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Agregar Nuevo Equipamiento
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredEquipment.map(equipment => (
          <EquipmentCard key={equipment.id} equipment={equipment} />
        ))}
      </div>

      <EquipmentModal
        isOpen={isModalOpen}
        newEquipment={newEquipment}
        setNewEquipment={setNewEquipment}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddEquipment}
      />
    </div>
  );
};

export default EquipmentComponent;
