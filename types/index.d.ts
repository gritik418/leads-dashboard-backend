interface User {
  _id: Types.ObjectId;
  name: string;
  email: string;
  role: "admin" | "user";
  password?: string;
  createdAt: string;
  updatedAt: string;
}
