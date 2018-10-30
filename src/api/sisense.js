import SisenseConfig from '@/config/sisense'

export default {

    dashboards: [],

    init: function (callback) {
        this.loadSisense(callback)
    },

    loadSisense(callback) {
        var script = document.createElement('script')
        script.src = 'http://devsisense.myresman.com:8081/js/sisense.js'
        script.id = 'sisense-script'
        script.type = 'text/javascript'
        script.charset = 'utf-8'

        //  Add event handler for when the script loads
        script.onload = callback

        //  Add the tag to the web page
        document.getElementsByTagName('body')[0].appendChild(script)
    },


    loadSisense2() {

        //  Define the script tag to add
        var script = document.createElement('script')
        script.src = 'http://devsisense.myresman.com:8081/js/sisense.js'
        script.id = 'sisense-script'
        script.type = 'text/javascript'
        script.charset = 'utf-8'

        //  Add event handler for when the script loads
        script.onload = this.connect.bind(this)

        //  Add the tag to the web page
        document.getElementsByTagName('body')[0].appendChild(script)
    },

    connect() {
        const Sisense = window.Sisense
        try {
            console.log('connect')
            let ws = this
            Sisense.connect('http://devsisense.myresman.com:8081').then(function (app) {
                ws.sisenseApp = app
                app.$$http.get('http://devsisense.myresman.com:8081/api/v1/dashboards?fields=oid%2Ctitle').then(function (response) {
                    ws.dashboards = response.data
                })
            });
        } catch (err) {
            console.log("Error: Failed connecting to the Sisense server")
        }
    },
}
