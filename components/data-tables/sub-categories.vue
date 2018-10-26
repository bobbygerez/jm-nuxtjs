<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>
        <v-btn outline class="success green--text" @click="openNewSub()">New Subcategories</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
         <v-text-field
       v-model="search"
       append-icon="search"
       label="Search Subcategories..."
       single-line
       hide-details
       ></v-text-field>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="mb-0 pb-0">
            <span class="headline">Edit Subcategory</span> 
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text class="ma-0 pa-0">
            <v-container grid-list-md >
            <v-flex xs12 sm12 md12 >
              <v-autocomplete
                v-model="editSubcategory.category_id"
                :items="categories"
                item-value="id"
                item-text="name"
                label="Select Category"
                class="ma-0 pa-0"
              ></v-autocomplete>
              </v-flex>
              
                <v-flex xs12 sm12 md12 >
                  <v-text-field v-model="editSubcategory.name" label="Name" ></v-text-field>
                </v-flex>

                <v-flex xs12 sm12 md12 >
                  <v-textarea
                  v-model="editSubcategory.desc"
                  label="Description"
                  auto-grow
                   class="ma-0 pa-0"
                ></v-textarea>
                </v-flex>
                
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="update()">Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="newSub" max-width="500px">
        <v-card>
          <v-card-title class="mb-0 pb-0">
            <span class="headline">New Subcategory</span> 
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text class="ma-0 pa-0">
            <v-container grid-list-md >
            <v-flex xs12 sm12 md12 >
              <v-autocomplete
                v-model="newSubcategory.category_id"
                :items="categories"
                item-value="id"
                item-text="name"
                label="Select Category"
                class="ma-0 pa-0"
              ></v-autocomplete>
              </v-flex>
              
                <v-flex xs12 sm12 md12 >
                  <v-text-field v-model="newSubcategory.name" label="Name" ></v-text-field>
                </v-flex>

                <v-flex xs12 sm12 md12 >
                  <v-textarea
                  v-model="newSubcategory.desc"
                  label="Description"
                  auto-grow
                   class="ma-0 pa-0"
                ></v-textarea>
                </v-flex>
                
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="subcategoriesData"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.categories.name }}</td>
        <td>{{ props.item.desc }}</td>
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
    <div class="text-xs-center pt-2">
      <v-pagination v-model="page" :length="subcategories.last_page" total-visible="9"></v-pagination>
    </div>
  </div>

</template>
<script type="text/javascript">

import axios from 'axios'
import _ from 'lodash'
  export default {

    data: ()=>({
       newSub: false,
       selectedCategory: '',
       dialog: false,
       x: [],
       search: '',
       headers: [
        {
          text: 'Subcategory',
          sortable: false,
          value: 'subcategory'
        },
        {
          text: 'Category',
          sortable: false,
          value: 'category'
        },
        {
          text: 'Description',
          sortable: false,
          value: 'desc'
        },
        {
          text: 'Created',
          sortable: false,
          value: 'created'
        },
        { 
          text: 'Actions',
          value: 'actions', 
          sortable: false 
        }
      ],
    }),
    computed: {
      newSubcategory(){
        return this.$store.getters.newSubcategory
      },
      subcategoriesData(){
        let sub = this.$store.getters.subcategories.data
        return _.values(sub)
      },
      subcategories: {
        get(){
          return this.$store.getters.subcategories
        },
        set(val){

        }
        
      },
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
      editSubcategory: {
        get(){
          return this.$store.getters.editSubcategory
        },
        set(val){
          this.$store.dispatch('editSubcategory', val)
        }
      },
      categories: {
        get(){
          return this.$store.getters.categories
        },
        set(val){

        }
        
      }
    },
    created(){
      this.getSubcategories()
      this.$store.dispatch('page', 1);
    },
    methods: {
      openNewSub(){
        this.newSub = true
      },
      save(){
        let data = this
        axios.post( process.env.baseApi + '/subcategories?page='+this.page+'&perPage='+this.selectedPage, this.newSubcategory)
            .then(res => {
              data.$store.dispatch('subcategories', res.data.subcategories)
              data.$store.dispatch('snackbarOptions', {
                  snackbarColor : 'success',
                  snackbarText : 'Subcategory Created Successfully',
                  snackbar: true
                })
              })

        this.newSub = false
      },
      searchSubcategory(){
        let data = this
          if (this.search !=null){
            axios.get( process.env.baseApi + '/search-subcategory?search='+this.search+'&page='+this.page+'&perPage='+this.selectedPage)
            .then(res => {
               data.$store.dispatch('subcategories', res.data.subcategories)
              })
          }else{
            this.getCategories()
          }
      },
      getSubcategories(){
        let data = this
        axios.get( process.env.baseApi + '/subcategories?page='+this.page+'&perPage=20')
            .then(res => {
                data.$store.dispatch('subcategories', res.data.subcategories)
              })
      },
      close(){
        this.dialog = false
        this.newSub = false
      },
      edit(id){
        this.dialog = true
        let data = this
        axios.get( process.env.baseApi + '/subcategories/' + id + '/edit')
            .then(res => {
                data.$store.dispatch('editSubcategory', res.data.subcategory) 
              })
      },
      update(){
        let data = this
        axios.put( process.env.baseApi + '/subcategories/' + this.editSubcategory.id + '?page='+this.page+'&perPage='+this.selectedPage, this.editSubcategory)
            .then(res => {
               data.$store.dispatch('subcategories', res.data.subcategories)
              data.$store.dispatch('snackbarOptions', {
                  snackbarColor : 'success',
                  snackbarText : 'Subcategory Updated Successfully',
                  snackbar: true
                })
              })

        this.dialog = false
      },
      confirmDelete(id){
        let data = this
        axios.get( process.env.baseApi + '/subcategories/' + id + '/edit')
            .then(res => {
                data.$store.dispatch('editSubcategory', res.data.subcategory) 
              })
        this.$store.dispatch('confirmDeleteDialog', true)
      }
    },
    watch: {
      page(){
        this.getSubcategories()
      },
      'newSubcategory.category_id': function(val){
        this.$store.dispatch('newSubcategoryField',{
          field: 'category_id',
          value: val
        });
      },
      'newSubcategory.name': function(val){

        this.$store.dispatch('newSubcategoryField',{
          field: 'name',
          value: val
        });
      },
      'newSubcategory.desc': function(val){
        this.$store.dispatch('newSubcategoryField',{
          field: 'desc',
          value: val
        });
      },
      'editSubcategory.name': function(val){

        this.$store.dispatch('editSubcategoryField',{
          field: 'name',
          value: val
        });
      },
      'editSubcategory.category_id': function(val){
        this.$store.dispatch('editSubcategoryField',{
          field: 'category_id',
          value: val
        });
      },
      'editSubcategory.desc': function(val){
        this.$store.dispatch('editSubcategoryField',{
          field: 'desc',
          value: val
        });
      },
      search : _.debounce(function(){
        this.searchSubcategory()
      }, 500)
    }
   
  }
</script>