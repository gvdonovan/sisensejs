<template>
  <v-app>

    <v-navigation-drawer app clipped fixed v-model="drawer">

      <v-list color="blue2">

        <v-list-tile to="/" active-class="blue2--text">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile>

        <v-list-group prepend-icon="dashboard" value="true" active-class="blue2--text">

          <v-list-tile slot="activator">
            <v-list-tile-title>Dashboards</v-list-tile-title>
          </v-list-tile>

          <v-list-group no-action sub-group value="true" active-class="blue2--text" >

            <v-list-tile slot="activator">
              <v-list-tile-title>
                <span>Accounting</span>
              </v-list-tile-title>
            </v-list-tile>

            <v-list-tile v-for="(admin, i) in admins" :key="i" :to="{ name: 'dashboard', params: { id: i}}" active-class="blue2--text">
              <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="admin[1]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>

          </v-list-group>

          <v-list-group sub-group no-action >

            <v-list-tile slot="activator">
              <v-list-tile-title>Accounts Receivable</v-list-tile-title>
            </v-list-tile>

            <v-list-tile v-for="(crud, i) in cruds" :key="i">
              <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="crud[1]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>

          </v-list-group>

        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dark app fixed clipped-left dense color="blue2">
      <v-toolbar-title>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span>ResMan Insights</span><span class="subheading">&trade;</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-img :src="require('@/assets/roi-brand.png')" max-width="60px"></v-img>
    </v-toolbar>

    <v-content>
      <v-container id="sisenseApp" fluid style="height:100%;" class="px-1 py-1">
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer dark app color="green2">
      <v-layout align-center justify-end row fill-height class="pr-2">
        <span class="text-xs-right"> &copy;2018 — <strong>Resman</strong></span>
      </v-layout>
    </v-footer>
  </v-app>

</template>

<script>
// import SisenseService from '@/api/sisense'
import { actions } from './store/types'

export default {
  data: () => ({
    drawer: true,
    admins: [
      ['Accounts Payable', 'settings'],
      ['Accounts Receivable', 'people_outline'],
    ],
    cruds: [
      ['Create', 'add'],
      ['Read', 'insert_drive_file'],
      ['Update', 'update'],
      ['Delete', 'delete'],
    ],
  }),

  mounted() {
    this.$store.dispatch(`sisense/${actions.sisense.INITIALIZE}`)
  },
}
</script>
