<template>
  <v-select
    v-model="selectedBrgysProduct"
    :items="brgys"
    label="Barangay"
    item-text="brgyDesc"
    item-value="brgyCode"
    :disabled="status"
    multiple
    clearable
  >

    <v-list-tile
      slot="prepend-item"
      ripple
      @click="toggle"
    >
      <v-list-tile-action>
        <v-icon :color="selectedBrgysProduct.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
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
        <span>{{ item.brgyDesc }}</span>
      </v-chip>
      <span
        v-if="index === 1"
        class="grey--text caption"
      >(+{{ selectedBrgysProduct.length - 1 }} others)</span>
    </template>
  </v-select>
</template>
<script>
  export default {
    props:['status'],
    computed: {
      likesAllBrgys () {
        return this.selectedBrgysProduct.length === this.brgys.length
      },
      likesSomeBrgys () {
        return this.selectedBrgysProduct.length > 0 && !this.likesAllBrgys
      },
      icon () {
        if (this.likesAllBrgys) return 'indeterminate_check_box'
        if (this.likesSomeBrgys) return 'check_box_outline_blank'
        return 'check_box_outline_blank'
      },
      brgys(){
        return this.$store.getters.brgys
      },
      selectedBrgysProduct: {
        get(){
          return this.$store.getters.selectedBrgysProduct
        },
        set(val){
          this.$store.dispatch('selectedBrgysProduct', val)
        }
      },
    },

    methods: {
      toggle () {
        this.$nextTick(() => {
          if (this.likesAllBrgys) {
            this.selectedBrgysProduct = []
          } else {
            this.selectedBrgysProduct = this.brgys.slice()
          }
        })
      }
    }
  }
</script>