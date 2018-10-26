<template>
<v-app id="inspire">
  <v-toolbar
    color="blue darken-3"
    dark
    app
    fixed
    >
    <v-spacer></v-spacer>
    <login></login>
    </v-toolbar>
    <content>
    <v-container >
          <v-layout
            column
            align-center
            justify-center
            class="white--text mt-5 pa-1"
          >
          <v-flex xs12 class="text-xs-center">
            <img src="~/assets/juanmerkado.png" alt="Vuetify.js" class="responsive" >
          </v-flex>
          
          </v-layout>
    </v-container >
      </content>
      <section>
        <v-container>
            <v-layout>
                <v-flex xs12>
                  <main-search></main-search>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container>
          <v-layout>
            <v-flex xs4>
                Listing Options
            </v-flex>
            <v-flex xs8>
                Card / Map Options
            </v-flex>
          </v-layout>
        </v-container>
        <v-container>
          <v-layout>
            <v-flex xs4>
                <search-listings></search-listings>
            </v-flex>
            <v-flex xs8>
                <search-item-group></search-item-group>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
      <first-splash-screen></first-splash-screen>
</v-app>
</template>

<script type="text/javascript">
  import login from '~/components/buttons/login'
  import searchStore from '~/components/inputs/textfields/search-store'
  import searchListings from '~/components/lists/search-listings'
  import searchCards from '~/components/card/search-cards'
  import firstSplashScreen from '~/components/dialog/first-splash-screen'
  import searchItemGroup from '~/components/groups/search-item-group'
  import mainSearch from '~/components/inputs/textfields/main-search'

  export default {
    data: ()=>({
       items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' }
      ]
    }),
    components: { login, searchStore, searchListings, searchCards, firstSplashScreen, searchItemGroup, mainSearch},
    computed: {
      dialogSearchStore: {
        get(){
          return this.$store.getters.dialogSearchStore
        }
      }
    },
    methods: {
      showStoreDialog(){
        this.$store.dispatch('dialogSearchStore', true)
      }
    }
  }
</script>

<style type="text/css">
  .responsive {
   width: 60%;
    max-width: 700px;
    height: auto;
}
</style>
