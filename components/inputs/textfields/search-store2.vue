<template>
  <v-autocomplete
      v-model="storeId"
      :items="stores"
      :loading="isLoading"
      :search-input.sync="search"
      chips
      clearable
      hide-details
      hide-selected
      item-text="name"
      item-value="id"
      label="Select Store"
      
    >
      <template slot="no-data">
        <v-list-tile>
          <v-list-tile-title>
            No store found!
          </v-list-tile-title>
        </v-list-tile>
      </template>
      <template
        slot="selection"
        slot-scope="{ item, selected }"
      >
        <v-chip
          :selected="selected"
        >
          <v-icon left>mdi-coin</v-icon>
          <span v-text="item.name"></span>
        </v-chip>
      </template>
      <template
        slot="item"
        slot-scope="{ item, tile }"
      >
        <v-list-tile-avatar
          color="indigo"
          class="headline font-weight-light white--text"
        >
          {{ item.name.charAt(0) }}
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.name"></v-list-tile-title>
         <!--  <v-list-tile-sub-title v-text="item.symbol"></v-list-tile-sub-title> -->
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>mdi-coin</v-icon>
        </v-list-tile-action>
      </template>
    </v-autocomplete>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
  export default {
    data: () => ({
      isLoading: false,
      search: null
    }),
    computed: {
      stores: {
        get(){
          return this.$store.getters.stores
        },
        set(val){

        }
      },
      storeId: {
        get(){
          return this.$store.getters.storeId
        },
        set(val){
          this.$store.dispatch('storeId', val)
        }
      }
    },

    watch: {
      search: _.debounce(function(){
            this.isLoading = true

        if (this.search == null) {
          this.isLoading = false
          return
        }
        // Lazily load input items
        axios.get( process.env.baseApi + '/search-store?search=' + this.search)
          .then(res => {
            this.$store.dispatch('stores', res.data.stores)  
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))

          }, 500),

      storeId(val){
        let data = this
        if (val == undefined) return
          axios.get(process.env.baseApi + '/get-branches/' + val)
          .then(res => {
            data.$store.dispatch('branches', res.data.branches)
            data.$store.dispatch('selectedBranches', '')
          })

      }
      
    }
  }
</script>