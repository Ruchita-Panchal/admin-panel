import { Request, Response } from "express";
import { Estimations } from "../models/estimationModel";
import {
  addEstimation,
  removeEstimation,
  findAllEstimations,
  findEstimationByID,
  editEstimation,
} from "../services/estimationServices";

export const getEstimations = async (req: Request, res: Response) => {
  let estimations = await findAllEstimations();
  res.json(estimations);
};

export const getEstimationById = async (req: Request, res: Response) => {
  const id = req.params.id;
  let estimation = await findEstimationByID(id);
  if (!estimation) {
    return res.status(404).json({ error: "estimation not found" });
  }
  res.json(estimation);
};

export const createEstimation = async (req: Request, res: Response) => {
  const estimation: Estimations = req.body;
  await addEstimation(estimation);
  res.status(201).json(estimation);
};

export const updateEstimation = async (req: Request, res: Response) => {
  const id = req.params.id;
  const estimation: Estimations = req.body;
  await editEstimation(estimation);
  res.status(200).json({ message: "Estimation updated!" });
};

export const deleteEstimation = async (req: Request, res: Response) => {
  const id = req.params.id;
  await removeEstimation(id);
  res.status(200).json({ message: "Estimation deleted!" });
};
