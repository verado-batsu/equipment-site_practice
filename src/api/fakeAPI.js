import { nanoid } from 'nanoid'

const equipments = [
	{
		id: nanoid(),
		category: '',
		model: '',
		photo: '',
		features: {

		}
	}
]

export const getEquipments = () => {
  return equipments;
};

export const getEquipmentById = (equipmentId) => {
  return equipments.find((equipment) => equipment.id === equipmentId);
};