import uuid from "uuid";

export const namespaced = true;

export const state = {
  notifications: [],
};

export const mutations = {
  PUSH_NOTIFICATION(currentState, { notification }) {
    currentState.notifications.push({
      ...notification,
      id: uuid.v4(),
    });
  },
  DELETE_NOTIFICATION(currentState, { notification }) {
    currentState.notifications = currentState.notifications.filter(
      currentNotification => currentNotification.id !== notification.id
    );
  },
};

export const actions = {
  addNotification({ commit }, { notification }) {
    commit("PUSH_NOTIFICATION", { notification });
  },
  removeNotification({ commit }, { notification }) {
    commit("DELETE_NOTIFICATION", { notification });
  },
};
