<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title><v-btn class="success green--text" outline @click="openNewCategory()">New Category</v-btn></v-toolbar-title>
      <v-spacer></v-spacer>
         <v-text-field
       v-model="search"
       append-icon="search"
       label="Search categories..."
       single-line
       hide-details
       ></v-text-field>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="mb-0 pb-0">
            <span class="headline">Edit Category</span> 
            <v-spacer></v-spacer>
            
          </v-card-title>
          <v-card-text class="ma-0 pa-0">
            <v-container grid-list-md >
              <v-layout wrap class="mt-0 pt-0">
                <v-flex xs12 sm12 md12 >
                  <v-text-field v-model="edittCategory.name" label="Name" class="ma-0 pa-0"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12 >
                <v-textarea
                  v-model="edittCategory.description"
                  label="Description"
                  auto-grow
                   class="ma-0 pa-0"
                ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="update()">Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="newCategory" max-width="500px">
        <v-card>
          <v-card-title class="mb-0 pb-0">
            <span class="headline">New Category</span> 
            <v-spacer></v-spacer>
            
          </v-card-title>
          <v-card-text class="ma-0 pa-0">
            <v-container grid-list-md >
              <v-layout wrap class="mt-0 pt-0">
                <v-flex xs12 sm12 md12 >
                  <v-text-field v-model="newCatName" label="Name" class="ma-0 pa-0"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12 >
                <v-textarea
                  v-model="newCatDesc"
                  label="Description"
                  auto-grow
                   class="ma-0 pa-0"
                ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="closeNewCategory">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="editCategories"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.description }}</td>
        <td>{{ props.item.created_at }}</td>
        <td class="justify-center layout px-0">
         <v-tooltip bottom >
          <v-btn slot="activator" icon class="ma-0 pa-0 mt-1" @click="edit(props.item.id)">
            <v-icon color="success">edit</v-icon>
          </v-btn>
          <span>Edit Category</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn slot="activator" icon class="ma-0 pa-0 mt-1" @click="confirmDelete(props.item.id)">
            <v-icon color="error">delete</v-icon>
          </v-btn>
          <span>Delete Category</span>
        </v-tooltip>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="getCategories()">Reload</v-btn>
      </template>
    </v-data-table>
  </div>

</template>
<script type="text/javascript">

import axios from 'axios'
import _ from 'lodash'
  export default {

    data: ()=>({
      newCatName: '',
      newCatDesc: '',
      newCategory: false,
       dialog: false,
       search: '',
       headers: [
        {
          text: 'Name',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Description',
          sortable: false,
          value: 'description'
        },
        {
          text: 'Created',
          sortable: false,
          value: 'created'
        },
        { 
          text: 'Actions',
          value: 'name', 
          sortable: false 
        }
      ],
    }),
    computed: {
      editCategories: {
        get(){
          return this.$store.getters.editCategories
        },
        set(val){

        }
      },
      edittCategory: {
        get(){
          return this.$store.getters.edittCategory
        },
        set(val){
          this.$store.dispatch('edittCategory', val)
        }
      }
    },
    created(){
      this.getCategories()
    },
    methods: {
      save(){
        let data = this
         axios.post( process.env.baseApi + '/categories',{
            name: this.newCatName,
            description: this.newCatDesc
         })
            .then(res => {
               data.$store.dispatch('editCategories', res.data.categories)
               data.newCategory = false
               data.$store.dispatch('snackbarOptions', {
                  snackbarColor : 'success',
                  snackbarText : 'Category Created Successfully',
                  snackbar: true
                })
              })
      },
      closeNewCategory(){
        this.newCategory = false
      },
      openNewCategory(){
        this.newCategory = true
      },
      searchCategory(){
        let data = this
          if (this.search !=null){
            axios.get( process.env.baseApi + '/search-category?search='+this.search)
            .then(res => {
               data.$store.dispatch('editCategories', res.data.categories)
              })
          }else{
            this.getCategories()
          }
      },
      getCategories(){
        let data = this
        axios.get( process.env.baseApi + '/categories')
            .then(res => {
                data.$store.dispatch('editCategories', res.data.categories)
              })
      },
      close(){
        this.dialog = false
      },
      edit(id){
        this.dialog = true
        let data = this
        axios.get( process.env.baseApi + '/categories/' + id + '/edit')
            .then(res => {
                data.$store.dispatch('edittCategory', res.data.category) 
              })
      },
      update(){
        let data = this
        axios.put( process.env.baseApi + '/categories/' + this.edittCategory.id, this.edittCategory)
            .then(res => {
              data.$store.dispatch('editCategories', res.data.categories)
              data.$store.dispatch('snackbarOptions', {
                  snackbarColor : 'success',
                  snackbarText : 'Category Updated Successfully',
                  snackbar: true
                })
              })

        this.dialog = false
      },
      confirmDelete(id){
        let data = this
        axios.get( process.env.baseApi + '/categories/' + id + '/edit')
            .then(res => {
                data.$store.dispatch('edittCategory', res.data.category) 
              })
        this.$store.dispatch('confirmDeleteDialog', true)
      }
    },
    watch: {
      search : _.debounce(function(){
        this.searchCategory()
      }, 500)
    }
   
  }
</script>