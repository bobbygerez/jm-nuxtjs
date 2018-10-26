<template>
  <v-select
    v-model="selectedSizesProduct"
    :items="sizes"
    label="Sizes"
    item-text="name"
    item-value="id"
    multiple
    chips
    clearable
  >

    <v-list-tile
      slot="prepend-item"
      ripple
      @click="toggle"
    >
      <v-list-tile-action>
        <v-icon :color="selectedSizesProduct.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
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
        <span>{{ item.name }}</span>
      </v-chip>
      <span
        v-if="index === 1"
        class="grey--text caption"
      >(+{{ selectedSizesProduct.length - 1 }} others)</span>
    </template>
  </v-select>
</template>
<script>
  import _ from 'lodash'
  export default {
    computed: {
      likesAllSizes() {
        return this.selectedSizesProduct.length === this.sizes.length
      },
      likesSomeSizes () {
        return this.selectedSizesProduct.length > 0 && !this.likesAllSizes
      },
      icon () {
        if (this.likesAllSizes) return 'indeterminate_check_box'
        if (this.likesSomeSizes) return 'check_box_outline_blank'
        return 'check_box_outline_blank'
      },
      sizes(){
        return this.$store.getters.sizes
      },
      selectedSizesProduct: {
        get(){
          return this.$store.getters.selectedSizesProduct
        },
        set(val){
          this.$store.dispatch('selectedSizesProduct', val)
        }
      },
    },

    methods: {
      toggle () {
        this.$nextTick(() => {
          if (this.likesAllSizes) {
            this.selectedSizesProduct = []
          } else {
            this.selectedSizesProduct = this.sizes.slice()
          }
        })
      }
    }
  }
</script>