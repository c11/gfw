import * as actions from './actions';

export const initialState = {
  loading: false,
  error: false,
  data: {}
};

// reducers for all widgets parent wrapper component
const setWidgetsData = (state, { payload }) => ({
  ...state,
  data: {
    ...state.data,
    ...payload
  },
  loading: false,
  error: false
});

const setWidgetsSettings = (state, { payload }) => ({
  ...state,
  settings: {
    ...state.settings,
    [payload.widget]: {
      ...state.settings[payload.widget],
      ...payload.settings
    }
  }
});

const setWidgetsLoading = (state, { payload }) => ({
  ...state,
  loading: payload.loading,
  error: payload.error
});

export default {
  [actions.setWidgetsData]: setWidgetsData,
  [actions.setWidgetsLoading]: setWidgetsLoading,
  [actions.setWidgetsSettings]: setWidgetsSettings
};
