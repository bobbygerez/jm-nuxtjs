<template>
  <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs2>
        <v-select
          v-model="selectedItem"
          :items="items"
          label="Options"
          item-text="name"
          item-value="id"
          persistent-hint
          clearable
        ></v-select>
        </v-flex>
        <v-flex xs10>
          <v-text-field
            v-model="message"
            clearable
            :label="labelField()"
            type="text"
            :disabled="disabled"
          >
            <v-tooltip
              slot="prepend"
              bottom
            >
              <v-icon slot="activator">mdi-help-circle-outline</v-icon>
              I'm a tooltip
            </v-tooltip>

            <v-fade-transition slot="append">
              <v-progress-circular
                v-if="loading"
                size="24"
                color="info"
                indeterminate
              ></v-progress-circular>
            </v-fade-transition>

           
          </v-text-field>
        </v-flex>

      </v-layout>
    </v-container>
  </v-form>
</template>
<script>
  export default {
    data: () => ({
      disabled: false,
      selectedItem: 1, 
      message: '',
      loading: false,
      items: [
        { id: 1, name: 'Supplier'}, 
        { id: 2, name: 'Product'}
      ]
    }),

    methods: {
      clickMe () {
        this.loading = true
        this.message = 'Wait for it...'
        setTimeout(() => {
          this.loading = false
          this.message = 'You\'ve clicked me!'
        }, 2000)
      },
      labelField(){
        if (this.selectedItem == 1) {
          this.disabled = false
          return 'Enter name of supplier'
        }else if(this.selectedItem == 2){
          this.disabled = false
          return 'Enter name of the product'
        }else{
          this.disabled = true
          return 'Please select any option'
        }
        
      }
    }
  }
</script>
