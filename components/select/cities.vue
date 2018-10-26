<template>
  <v-select
    v-model="selectedCitiesProduct"
    :items="cities"
    label="Cities"
    item-text="citymunDesc"
    item-value="citymunCode"
    multiple
    clearable
  >

    <v-list-tile
      slot="prepend-item"
      ripple
      @click="toggle"
    >
      <v-list-tile-action>
        <v-icon :color="selectedCitiesProduct.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-title>Select All</v-list-tile-title>
    </v-list-tile>
    <v-divider
      slot="prepend-item"
      class="mt-2"
    ></v-divider>
    <v-divider
      slot="append-item"
      class="mb-2"
    ></v-divider>
    
    <template
      slot="selection"
      slot-scope="{ item, index }"
    >
      <v-chip v-if="index === 0">
        <span>{{ item.citymunDesc }}</span>
      </v-chip>
      <span
        v-if="index === 1"
        class="grey--text caption"
      >(+{{ selectedCitiesProduct.length - 1 }} others)</span>
    </template>
  </v-select>
</template>
<script>
  import axios from 'axios'
  export default {
    
    computed: {
      likesAllCities () {
        return this.selectedCitiesProduct.length === this.cities.length
      },
      likesSomeCities () {
        return this.selectedCitiesProduct.length > 0 && !this.likesAllCities
      },
      selectedCitiesProduct: {
        get(){
          return this.$store.getters.selectedCitiesProduct
        },
        set(val){
          this.$store.dispatch('selectedCitiesProduct', val)
        }
      },
      icon () {
        if (this.likesAllCities) return 'indeterminate_check_box'
        if (this.likesSomeCities) return 'check_box_outline_blank'
        return 'check_box_outline_blank'
      },
      cities(){
        return this.$store.getters.cities
      }
    },

    methods: {
      toggle () {
        this.$nextTick(() => {
          if (this.likesAllCities) {
            this.selectedCitiesProduct = []
          } else {
            this.selectedCitiesProduct = this.cities.slice()
          }
        })
      }
    },
    watch: {

      selectedCitiesProduct(val){
        let data = this
          if (val.length == 1) {
            axios.get(process.env.baseApi + '/get-brgys/' + val[0])
            .then(function(res){
              data.$store.dispatch('brgys', res.data.brgys)
            })
          }else{
            data.$store.dispatch('selectedBrgysProduct', [])
          }
      }
    }
  }
</script>