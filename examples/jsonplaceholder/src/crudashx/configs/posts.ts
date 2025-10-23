import type { ResourceViewConfig } from "crudashx";
import PostUserRenderer from "../../components/users/PostUserRenderer";

export const postViewConfig: ResourceViewConfig = {
  list: {
    include: ["id", "title", "userId"],
    labels: {
      id: "Post ID",
      name: "Title",
      userId: "User"
    },
    renderers: {
      userId: PostUserRenderer
    }
    
  },
  show: {
    
  },
  create: {
    
  },
  update: {
   
  },
};
