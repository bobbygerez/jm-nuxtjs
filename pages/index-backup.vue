<template>
  <span>
      <item-headers v-bind:suffix="'Items'"/>
      <v-divider></v-divider>
      <v-layout wrap class="ma-0 pa-0" justify-center align-center>
           <items v-bind:itemInfo="itemInfo" v-bind:index="i" v-for="(itemInfo, i) in itemInfo.data" :key="i"></items>
      </v-layout>
      <v-layout>
        <v-flex>
          <div class="text-xs-center pt-2">
          <v-pagination v-model="page" :length="itemInfo.last_page" total-visible="9"></v-pagination>
          </div>
        </v-flex>
      </v-layout>
  </span>
</template>

<script type="text/javascript">
  import axios from 'axios'
  import items from '~/components/items/item'
  import itemHeaders from '~/components/items/item-headers'
  function myFetchMethod(store, params){
    return axios.get( process.env.baseApi + '/get-items?provId=' + store.getters.selectedProvince.id + '&page=' + store.getters.page + '&perPage=' + store.getters.selectedPage)
        .then(res => {
             store.commit('itemInfo', res.data.itemInfo)
          })
  }
  
  export default {
    created(){
      this.$store.dispatch('dashboard', false);
      let data = this;
      axios.get( process.env.baseApi + '/auth/user?token=' + this.$store.getters.token)
      .then(response => {
          data.$store.dispatch('user', response.data.user)
          data.$store.dispatch('userLogin', true)
        })
      .catch(function(error){
          data.$store.dispatch('userLogin', false)
          data.$store.dispatch('dashboard', false)
      })
    },
    fetch ({ store, params }) {
      return myFetchMethod(store, params)
    },
    components: {
      items, itemHeaders
    },
    middleware: ['provinces'],
    computed: {
      selectedProvince(){
        return this.$store.getters.selectedProvince
      },
      categories(){
        return this.$store.getters.categories
      },
      page: {
        get(){
          return this.$store.getters.page
        },
        set(val){
          this.$store.dispatch('page', val)
        }
        
      },
      perPage(){
        return this.$store.getters.perPage
      },
      selectedPage: {
        get(){
          return this.$store.getters.selectedPage
        },
        set(val){
          this.$store.dispatch('selectedPage', val);
        }
      },
      itemInfo(){
        return this.$store.getters.itemInfo
      }
    },
    watch: {
       page(){
          myFetchMethod(this.$store, this.$params)
       },
       selectedPage(){
          myFetchMethod(this.$store, this.$params)
       }
    }
}
</script>

<style type="text/css">
  .gray--text{
    color: gray;
  }
</style>
