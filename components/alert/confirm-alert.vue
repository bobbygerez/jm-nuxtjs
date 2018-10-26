<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="confirmDeleteDialog"
      persistent
      width="400"
    >
    <v-card
      >
        <v-card-text>
          <span class="subheading">Are you sure you to delete this item?</span>
          <v-btn color="success" icon  @click="$emit('click')"><v-icon>check</v-icon></v-btn>
          <v-btn color="error" icon  @click="close"><v-icon>close</v-icon></v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    data: ()=>({
      
    }),
    computed: {
      confirmDeleteDialog: {
        get(){
          return this.$store.getters.confirmDeleteDialog
        },
        set(val){
          this.$store.dispatch('confirmDeleteDialog', val)
        }
      }
    },
    methods: {
      close(){
        this.$store.dispatch('confirmDeleteDialog', false)
      }
    }
  }
</script>