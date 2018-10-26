<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="loader"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="purple"
        dark
      >
        <v-card-text>
          {{loginLoader}}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
  export default {
    
        computed: {
          loader() {
             return this.$store.getters.loader
            
          },
          loginLoader(){
            return this.$store.getters.loginLoader
          }
        }, 

    watch: {
      dialog (val) {
        if (!val) return

        setTimeout(() => (this.dialog = false), 4000)
      }
    }
  }
</script>