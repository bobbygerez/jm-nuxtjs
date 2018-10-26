<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="900" >
      <v-card>
        <v-card-title class="headline mb-0 pb-0">Where do you want to shop?</v-card-title>

        <v-card-text>
            <v-autocomplete
              v-model="selectedStorePlace"
              :items="storesPlaces"
              :loading="isLoading"
              :search-input.sync="search"
              chips
              clearable
              hide-details
              hide-selected
              item-text="name"
              item-value="id"
              label="Find Store/Place"
              
            >
              <template slot="no-data">
                <v-list-tile>
                  <v-list-tile-title>
                    No store/place found!
                  </v-list-tile-title>
                </v-list-tile>
              </template>
              <template
                slot="selection"
                slot-scope="{ item, selected }"
              >
                <v-chip
                  close
                  :selected="selected"
                  @input="remove()"
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
                  <v-list-tile-sub-title> {{ item.address.brgy.brgyDesc }}, {{ item.address.city.citymunDesc }}, {{ item.address.province.provDesc }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon>mdi-coin</v-icon>
                </v-list-tile-action>
              </template>
            </v-autocomplete>
          </v-card-text>
           <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.native="dialog = false">Cancel</v-btn>
          <v-btn color="primary"  to="/search-result">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
  export default {
    data () {
      return {
        dialog: true,
        value: '',
        custom: true,
         isLoading: false,
        search: null
      }
    },
    computed: {
      progress () {
        return Math.min(100, this.value.length * 10)
      },
      color () {
        return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
      },
      storesPlaces: {
        get(){
          return this.$store.getters.storesPlaces
        },
        set(val){

        }
      },
      selectedStorePlace: {
        get(){
          return this.$store.getters.selectedStorePlace
        },
        set(val){
          this.$store.dispatch('selectedStorePlace', val)
        }
      }
    },
    methods: {
      result(){

      },
       remove() {
        this.$store.dispatch('selectedStorePlace', '');
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
        axios.get( process.env.baseApi + '/search-store-place?search=' + this.search)
          .then(res => {
            this.$store.dispatch('storesPlaces', res.data.stores)  
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))

          }, 500),
      
    }
  }
</script>

<style type="text/css" scope>
  .v-overlay--active:before{
    opacity: .9;
  }
</style>