export interface User {
  id: number;
  email: string;
  username: string;
  role: "Admin" | "Guest";
  password: string; // Hashed password
}
