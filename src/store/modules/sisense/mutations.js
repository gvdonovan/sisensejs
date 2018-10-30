import * as types from '@/store/types'

export default {

  [types.mutations.sisense.SET_SISENSE](state, value) {
    state.sisense = value
  },

  [types.mutations.sisense.SET_DASHBOARDS](state, value) {
    state.dashboards = value
  }
}
