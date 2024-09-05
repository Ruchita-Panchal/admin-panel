import { Request, Response } from "express";
import { Project } from "../models/projectModel";
import {
  addProject,
  removeProject,
  findAllProjects,
  findUserByUsername,
  editProject,
} from "../services/projectServices";

export const getProjects = async (req: Request, res: Response) => {
  let projects = await findAllProjects();
  res.json(projects);
};

export const getProjectById = async (req: Request, res: Response) => {
  const id = req.params.id;
  let project = await findUserByUsername(id);
  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }
  res.json(project);
};

export const createProject = async (req: Request, res: Response) => {
  const project: Project = req.body;
  await addProject(project);
  res.status(201).json({ message: "Project created!" });
};

export const updateProject = async (req: Request, res: Response) => {
  const id = req.params.id;
  const project: Project = req.body;
  await editProject(project);
  res.status(200).json({ message: "Project updated!" });
};

export const deleteProject = async (req: Request, res: Response) => {
  const id = req.params.id;
  await removeProject(id);
  res.status(200).json({ message: "Project deleted!" });
};
