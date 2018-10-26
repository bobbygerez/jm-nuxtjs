<template>
  <v-select
    v-model="selectedProductStatus"
    :items="productStatus"
    label="Status"
    item-text="text"
    item-value="value"
    chips
    clearable
  >
  </v-select>
</template>
<script>
  export default {
  	data: ()=>({
  		productStatus: [
  			{ text: 'Active', value: true},
  			{ text: 'Inactive', value: false}
  		]
  	}),
    computed: {
      selectedProductStatus: {
        get(){
          return this.$store.getters.selectedProductStatus
        },
        set(val){
          this.$store.dispatch('selectedProductStatus', val)
        }
      }
    }
  }
</script>