interface User {
  _id: Types.ObjectId;
  name: string;
  email: string;
  role: "admin" | "user";
  password?: string;
  createdAt: string;
  updatedAt: string;
}

interface Lead {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  source: "Website" | "Referral" | "Ads" | "Social";
  status: "New" | "Contacted" | "Converted" | "Lost";
  stage: "Lead" | "Qualified" | "Proposal";
  createdAt: string;
  updatedAt: string;
}
