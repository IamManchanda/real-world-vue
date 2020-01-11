import uuid from "uuid";

export const namespaced = true;

export const state = {
  user: {
    id: uuid.v4(),
    name: "Harry Manchanda",
  },
};
