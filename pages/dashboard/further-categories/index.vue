<template>
  <v-container class="ma-1 pa-1">
      <v-layout wrap justify-center align-center>
        <v-flex xs12 sm12 md12 lg12 xl12 class="pr-2">
            <further-categories></further-categories>
        </v-flex>
      </v-layout>
      <confirm-alert ref="cat" @click="deleteItem()"></confirm-alert>
  </v-container>
</template>

<script type="text/javascript">
import furtherCategories from '~/components/data-tables/further-categories'
import confirmAlert from '~/components/alert/confirm-alert.vue'
import axios from 'axios'
  export default {
      middleware: ['get-subcategories', 'auth'],
      components: { furtherCategories, confirmAlert }
      ,
      computed: {
        editFurtherCat(){
          return this.$store.getters.editFurtherCat
        },
        page(){
          return this.$store.getters.page
        },
        perPage: {
          get(){
            return this.$store.getters.selectedPage
          },
          set(val){

          }
        }
      },
      methods: {
        deleteItem(){
          let data = this
          
           axios.delete( process.env.baseApi + '/further_categories/' + this.editFurtherCat.id + '?page='+this.page+'&perPage='+this.perPage)
            .then(res => {
               data.$store.dispatch('confirmDeleteDialog', false)
               data.$store.dispatch('furtherCategories', res.data.furtherCategories)
               data.$store.dispatch('snackbarOptions', {
                  snackbarColor : 'success',
                  snackbarText : 'Successfully Deleted',
                  snackbar: true
                })
              data.$store.dispatch('confirmDeleteDialog', false)
              })
            .catch(function(error){
              data.$store.dispatch('snackbarOptions', {
                  snackbarColor : 'error',
                  snackbarText : 'Unable to delete Subcategory. Integrity constraint',
                  snackbar: true
                })
              data.$store.dispatch('confirmDeleteDialog', false)
            })
        }
      }
    }
</script>