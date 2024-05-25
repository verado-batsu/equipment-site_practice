import { equipmentData } from "data";

export const getEquipments = (category) => {
	return equipmentData.filter((equipment) => 
		equipment.category === category
	);
};

export const getEquipmentById = (equipmentId) => {
  return equipmentData.find((equipment) => equipment.id === equipmentId);
};