// types.ts
export interface PartProps {
  _id: string;  
  type: string;
  model: string;
  quantity: number;
}

export interface EquipmentProps {
  _id: string; 
  name: string;
  type: string;
  operatingSystem?: string;
  available: boolean;
  parts?: PartProps[];  
}

export interface BuildingsAreasComponentProps {
  _id: string;
  name: string;
  tasks?: string[];
  equipments?: EquipmentProps[];
}
