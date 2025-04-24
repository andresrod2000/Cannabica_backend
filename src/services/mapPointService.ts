import MapPoint, { IMapPoint } from "../models/mapPointModel";
import { Types } from "mongoose";

// Obtener todos los puntos
export const getPoints = async () => {
  return await MapPoint.find();
};

export const createPoint = async (data: Partial<IMapPoint>) => {
  if (!data.coords) data.coords = [];
  const point = new MapPoint(data);
  return await point.save();
};

export const getUserPoints = async (userId: Types.ObjectId) => {
  return await MapPoint.find({ user: userId });
};

export const updatePoint = async (id: string, userId: Types.ObjectId, data: Partial<IMapPoint>) => {
  const point = await MapPoint.findById(id);

  if (!point) {
    throw new Error("Punto no encontrado");
  }

  if (point.user.toString() !== userId.toString()) {
    throw new Error("No autorizado para editar este punto");
  }

  Object.assign(point, data); // Actualizamos los campos
  return await point.save();
};

export const deletePoint = async (id: string, userId: Types.ObjectId) => {
  const point = await MapPoint.findById(id);

  if (!point) {
    throw new Error("Punto no encontrado");
  }

  if (point.user.toString() !== userId.toString()) {
    throw new Error("No autorizado para eliminar este punto");
  }

  await point.deleteOne();
  return { message: "Punto eliminado correctamente" };
};