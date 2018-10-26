<template>
	<v-container class="ma-1 pa-1">
      <v-layout wrap justify-center align-center>
        <v-flex xs12 sm12 md12 lg12 xl12 class="pr-2">
            <subcategories></subcategories>
        </v-flex>
      </v-layout>
      <confirm-alert ref="cat" @click="deleteItem()"></confirm-alert>
  </v-container>
</template>

<script type="text/javascript">
import subcategories from '~/components/data-tables/sub-categories'
import confirmAlert from '~/components/alert/confirm-alert.vue'
import axios from 'axios'
	export default {
      middleware: ['auth'],
      components: { subcategories, confirmAlert }
      ,
      computed: {
        selectedPage(){
        return this.$store.getters.selectedPage
        },
        page: {
            get(){
              return this.$store.getters.page
            },
            set(val){
              this.$store.dispatch('page', val);
            }
        },
        editSubcategory(){
          return this.$store.getters.editSubcategory
        }
      },
      methods: {
        deleteItem(){
          let data = this
          
           axios.delete( process.env.baseApi + '/subcategories/' + this.editSubcategory.id + '?page='+this.page+'&perPage='+this.selectedPage)
            .then(res => {
                data.$store.dispatch('subcategories', res.data.subcategories)
               data.$store.dispatch('confirmDeleteDialog', false)
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