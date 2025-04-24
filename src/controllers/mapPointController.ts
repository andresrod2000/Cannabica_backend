import { Request, Response } from "express";
import * as pointService from "../services/mapPointService";

// Obtener todos los puntos
export const getPoints = async (_: Request, res: Response) => {
  try {
    const points = await pointService.getPoints();
    res.json(points);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createPoint = async (req: Request, res: Response) => {
  try {
    const { url, type, location, name } = req.body;
    const userId = req.user?.id;

    const point = await pointService.createPoint({
      url,
      type,
      location,
      name,
      coords: [], // Pendiente por añadir geocodificaciónx
      user: userId,
    });

    res.status(201).json(point);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserPoints = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const points = await pointService.getUserPoints(userId);
    res.status(200).json(points);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const updatePoint = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const updatedPoint = await pointService.updatePoint(req.params.id, userId, req.body);
    res.status(200).json(updatedPoint);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePoint = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const result = await pointService.deletePoint(req.params.id, userId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

