<template>
  <v-select
    v-model="selectedUnitProduct"
    :items="units"
    label="Units"
    item-text="name"
    item-value="id"
    chips
    clearable
  >
  </v-select>
</template>
<script>
  export default {
    computed: {
      selectedUnitProduct: {
        get(){
          return this.$store.getters.selectedUnitProduct
        },
        set(val){
          this.$store.dispatch('selectedUnitProduct', val)
        }
      },
      units(){
        return this.$store.getters.units
      }
    }
  }
</script>