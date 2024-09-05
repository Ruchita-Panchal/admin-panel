type Manager = {
  id: string;
  name: string;
};

type Customer = {
  id: string;
  name: string;
};

type Staff = {
  id: string;
  name: string;
};

export interface Project {
  id: string;
  referenceNumber: string;
  projectNumber: string;
  ProjectName: string;
  Location: string;
  address: string;
  startDate: string;
  dueDate: string;
  contactNumber: string;
  email: string;
  staff: Staff;
  customer: Customer;
  manager: Manager;
}
