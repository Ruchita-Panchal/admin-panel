import { Project } from "../models/projectModel";
import { hashPassword } from "../utils/hash";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";

let projects: Project[] = require("../../data/projects.json");

export const findAllProjects = (): Project[] | undefined => {
  return projects;
};

export const findUserByUsername = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};

export const addProject = (project: Project) => {
  project.id = uuidv4();
  projects.push(project);
  saveProjects();
};

export const editProject = (project: Project) => {
  const projectIndex = projects.findIndex((item) => item.id === project.id);
  projects.splice(projectIndex, 1);
  projects.push(project);
  saveProjects();
};

export const removeProject = (projectId: string) => {
  const ProjectIndex = projects.findIndex(
    (project) => projectId === project.id
  );
  projects.splice(ProjectIndex, 1);
  saveProjects();
};

function saveProjects() {
  try {
    fs.writeFileSync("./data/projects.json", JSON.stringify(projects), "utf-8");
  } catch (error) {
    console.log(`Error : ${error}`);
  }
}
