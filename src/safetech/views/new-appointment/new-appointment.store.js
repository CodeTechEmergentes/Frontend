export default {
  namespaced: true,
  state: {
    applianceSelected: '',
    technicalSelected: '',
    dateSelected: '',
    shiftSelected: '',
    dateFormattedSelected: '',
  },
  getters: {
    applianceSelected: state => state.applianceSelected,
    technicalSelected: state => state.technicalSelected,
    dateSelected: state => state.dateSelected,
    shiftSelected: state => state.shiftSelected,
    dateFormattedSelected: state => state.dateFormattedSelected,
  },
  mutations: {
    SET_APPLIANCE_SELECTED(state, payload) {
      return (state.applianceSelected = payload)
    },
    SET_TECHNICAL_SELECTED(state, payload) {
      return (state.technicalSelected = payload)
    },
    SET_DATE_SELECTED(state, payload) {
      return (state.dateSelected = payload)
    },
    SET_SHIFT_SELECTED(state, payload) {
      return (state.shiftSelected = payload)
    },
    SET_DATE_FORMATTED_SELECTED(state, payload) {
      return (state.dateFormattedSelected = payload)
    },
  },
  actions: {
    A_SET_APPLIANCE_SELECTED({ commit }, params) {
      commit('SET_APPLIANCE_SELECTED', params)
    },
    A_SET_TECHNICAL_SELECTED({ commit }, params) {
      commit('SET_TECHNICAL_SELECTED', params)
    },
    A_SET_DATE_SELECTED({ commit }, params) {
      commit('SET_DATE_SELECTED', params)
    },
    A_SET_SHIFT_SELECTED({ commit }, params) {
      commit('SET_SHIFT_SELECTED', params)
    },
    A_SET_DATE_FORMATTED_SELECTED({ commit }, params) {
      commit('SET_DATE_FORMATTED_SELECTED', params)
    },
  },
}