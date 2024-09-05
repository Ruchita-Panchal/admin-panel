type ProjectDetails = {
  id: string;
  name: string;
};

type SectionItems = {
  itemName: string;
  description: string;
  quantity: number;
  price: number;
  margin: number;
  total: number;
};

export interface Estimations {
  id: string;
  project: ProjectDetails;
  version: number;
  client: string;
  createdDate: Date;
  lastmodified: Date;
  status: "Created" | "Processing" | "Rejected" | "On Hold" | "In Transit";
  Section: SectionItems[];
}
