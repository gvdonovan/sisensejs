<template>
  <div>
    <span>{{dashboard.title}}</span>
    <v-btn v-on:click="getDashboard">Load</v-btn>

    <div ref="widget1" style="height: 400px; width: 35%; float: left; top: 10px; display: inline; margin-top:30px;"></div>


    <!-- <v-flex v-for="(w,index) in widgets" :key="`${index}`" xs12>
      <v-card>
        <v-card-text class="px-0">{{w.title}}</v-card-text>
        <div :id="`${w.id}-container`" style = "height: 400px; width: 35%; float: left; top: 10px; display: inline; margin-top:30px;">
        </div>
      </v-card>
    </v-flex> -->

    <!-- <v-card>
      <v-card-text class="px-0">Biff</v-card-text>
      <div id="widget-1" style="height: 400px; width: 35%; float: left; top: 10px; display: inline; margin-top:30px;">
      </div>
    </v-card> -->

  </div>
  <!-- <iframe id="ifm" name="ifm" width="100%" height="100%" frameborder="0" :src="source" scrolling="auto"></iframe>   -->
</template>

<script>
import { actions } from '@/store/types'
export default {
  data: () => ({
    dashboard: {},
    widgets: [],
    source:
      'http://devsisense.myresman.com:8081/app/main#/dashboards/5bc9f49563f78627dc886739?embed=true&I=true&t=false&h=false',
  }),

  methods: {
    getDashboard() {
      const self = this
      this.$store
        // Retreive dashboard
        .dispatch(
          `sisense/${actions.sisense.LOAD_DASHBOARD}`,
          '5bcd37594117c40c60b84c48'
        )
        .then(dash => {
          self.dashboard = dash
          self.$nextTick(() => {
            let widget = dash.widgets.get('5bcd37594117c40c60b84c49')
            // Both lines 47 &  49 cause the browser to hang indefinitely
            // The jQuery way
            //widget.container = document.getElementById('widget-1')
            // the Vue way
            //widget.container = this.$refs.widget1
            dash.refresh()
          })
        })
    },
  },
}
</script>
