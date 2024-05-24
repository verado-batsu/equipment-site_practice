import { nanoid } from 'nanoid'

const categories = {
	rolling: 'rolling',
	dragging: 'dragging',
	pressing: 'pressing',
	forging: 'forging',
	stamping: 'stamping',
}

const equipments = [
	{
		id: nanoid(),
		category: categories.dragging,
		model: 'dragging',
		photo: '',
		features: {

		}
	},
	{
		id: nanoid(),
		category: categories.rolling,
		model: 'rolling',
		photo: '',
		features: {

		}
	}
]

export const getEquipments = (category) => {
	return equipments.filter((equipment) => 
		equipment.category === category
	);
};

export const getEquipmentById = (equipmentId) => {
  return equipments.find((equipment) => equipment.id === equipmentId);
};