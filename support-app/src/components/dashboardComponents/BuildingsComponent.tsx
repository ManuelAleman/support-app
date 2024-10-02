import React, { Suspense, useEffect, useState } from "react";
import BuildingCard from "@/components/cards/BuildingsCard";
import AddBuildingModal from "@/components/modals/NewBuildingModal";
import ErrorModal from "@/components/modals/ErrorModal";
import { useUser } from '@/utils/UserContext';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

interface BuildingsAreasComponentProps {
  name: string;
  equipment: string[];
  tasks: string[];
}

interface BuildingsComponentProps {
  name: string;
  inCharge: string;
  areas: BuildingsAreasComponentProps[];
  _id: string;
}

const BuildingsComponent = () => {
  const router = useRouter();
  const { user, loading } = useUser();
  const [buildings, setBuildings] = useState<BuildingsComponentProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/LogInPage');
    }
  }, [loading, user]);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const userId = user?._id;
        const token = Cookies.get('authToken');
        const response = await fetch(`http://localhost:8080/department/getMyBuildings/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
        
        const data = await response.json();
        
        if (data.status === "success") {
          setBuildings(data.departments);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching buildings:", error);
      }
    };

    fetchBuildings();
  }, [user]);

  const handleAddBuilding = async (name: string, inCharge: string) => {
    const token = Cookies.get('authToken');
    try {
      const response = await fetch('http://localhost:8080/department/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, inCharge }),
      });
  
      const data = await response.json();
  
      if (data.status === "success") {
        setBuildings([...buildings, { name, inCharge, areas: [], _id: data.newDepartmentId }]);
        setErrorMessage("");
        setIsModalOpen(false);
      } else {
        setErrorMessage(data.message);
        setIsErrorModalOpen(true);
      }
    } catch (error) {
      console.error("Error adding building:", error);
      setErrorMessage("Error adding building.");
      setIsErrorModalOpen(true);
    }
  };
  
  const handleAddArea = (buildingIndex: number, newArea: BuildingsAreasComponentProps) => {
    const updatedBuildings = [...buildings];
    updatedBuildings[buildingIndex].areas.push(newArea);
    setBuildings(updatedBuildings);
  };

  return (
    <div className="mt-8 px-4 md:px-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-black">MIS EDIFICIOS:</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Agregar Edificio
        </button>
      </div>
      <div className="space-y-4">
        {buildings.map((building, index) => (
          <BuildingCard
            key={building._id}
            index={index}
            name={building.name}
            areas={building.areas}
            buildingId={building._id}
            onAddArea={handleAddArea}
          />
        ))}
      </div>
      <AddBuildingModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setErrorMessage("");
        }}
        userId={user?._id || ""}
        onAddBuilding={handleAddBuilding}
      />
      {isErrorModalOpen && (
        <ErrorModal 
          message={errorMessage} 
          onClose={() => {
            setIsErrorModalOpen(false);
            setErrorMessage("");
          }} 
        />
      )}
    </div>
  );
};

export default BuildingsComponent;
