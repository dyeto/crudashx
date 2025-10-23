import type { ResourceViewConfig } from "crudashx";

export const userViewConfig: ResourceViewConfig = {
  list: {
    include: ["id", "name", "email"],
    labels: {
      id: "User ID",
      name: "Full Name",
      email: "Email"
    },
    
  }
};
