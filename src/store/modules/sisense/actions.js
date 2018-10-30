import Vue from 'vue'
import VueLogger from 'vuejs-logger'
import LoggerConfig from '@/config/logger'
import SisenseConfig from '@/config/sisense'
import * as types from '@/store/types'

Vue.use(VueLogger, LoggerConfig)

export default {

  [types.actions.sisense.INITIALIZE](context) {
    Vue.$log.debug(`Vuex.actions.dashboard.${types.actions.sisense.INITIALIZE}`)

    let startTime = new Date().getTime();

    let callback = function () {
      try {
        let endTime = new Date().getTime();
        let duration = Math.round((endTime - startTime) / 1000);
        Vue.$log.debug(`Vuex.actions.dashboard.${types.actions.sisense.INITIALIZE} - Sisensejs: Loaded in ${duration} seconds`);

        const Sisense = window.Sisense;
        Sisense.connect(SisenseConfig.server).then(function (sisense) {
          console.log(sisense)
          context.commit(types.mutations.sisense.SET_SISENSE, sisense)
          sisense.$$http.get(`${SisenseConfig.server}/api/v1/dashboards?fields=oid%2Ctitle`).then(function (response) {
            context.commit(types.mutations.sisense.SET_DASHBOARDS, response.data)
          })
        });
      } catch (err) {
        Vue.$log.error(`Vuex.actions.dashboard.${types.actions.sisense.INITIALIZE}`, err)
      }
    }

    // Load SisenseJs
    var script = document.createElement('script')
    script.src = `${SisenseConfig.server}/js/sisense.js`
    script.id = 'sisense-script'
    script.type = 'text/javascript'
    script.charset = 'utf-8'
    script.async = true

    // Add event handler for when the script loads
    script.onload = callback

    // Add the tag to the web page
    document.getElementsByTagName('body')[0].appendChild(script)
  },

  [types.actions.sisense.LOAD_DASHBOARD](context, dashboardId) {    
    Vue.$log.debug(`Vuex.actions.dashboard.${types.actions.sisense.LOAD_DASHBOARD}:${dashboardId}`)
    return new Promise((resolve, reject) => {      
      context.state.sisense.dashboards.load(dashboardId).then(function(dash) {
        //dash.widgets.get('5bcd37594117c40c60b84c49').container = document.getElementById('widget-1')
        console.log(dash)
        resolve(dash)
      })    
    })
  }
}
