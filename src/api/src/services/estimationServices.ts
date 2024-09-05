import { Estimations } from "../models/estimationModel";
import { hashPassword } from "../utils/hash";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";

let estimations: Estimations[] = require("../../data/estimation.json");

export const findAllEstimations = (): Estimations[] | undefined => {
  return estimations;
};

export const findEstimationByID = (id: string): Estimations | undefined => {
  return estimations.find((estimation) => estimation.id === id);
};

export const addEstimation = (estimation: Estimations) => {
  estimation.id = uuidv4();
  estimations.push(estimation);
  saveEstimations();
};

export const editEstimation = (estimation: Estimations) => {
  const estimationIndex = estimations.findIndex(
    (item) => item.id === estimation.id
  );
  estimations.splice(estimationIndex, 1);
  estimations.push(estimation);
  saveEstimations();
};

export const removeEstimation = (estimationId: string) => {
  const estimationIndex = estimations.findIndex(
    (estimation) => estimationId === estimation.id
  );
  estimations.splice(estimationIndex, 1);
  saveEstimations();
};

function saveEstimations() {
  try {
    fs.writeFileSync(
      "./data/estimation.json",
      JSON.stringify(estimations),
      "utf-8"
    );
  } catch (error) {
    console.log(`Error : ${error}`);
  }
}
