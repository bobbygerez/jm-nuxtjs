<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title><v-btn class="success green--text" outline @click="openNewFurth()">New Further Category</v-btn></v-toolbar-title>
      <v-spacer></v-spacer>
         <v-text-field
       v-model="search"
       append-icon="search"
       label="Search Further Categories..."
       single-line
       hide-details
       ></v-text-field>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="mb-0 pb-0">
            <span class="headline">Edit Further Category</span> 
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text class="ma-0 pa-0">
            <v-container grid-list-md >
            <v-flex xs12 sm12 md12 >
              <v-autocomplete
                v-model="editFurtherCat.subcategories.category_id"
                :items="categories"
                item-value="id"
                item-text="name"
                label="Select Category"
                class="ma-0 pa-0"
              ></v-autocomplete>
              </v-flex>
              <v-flex xs12 sm12 md12 >
              <v-autocomplete
                v-model="editFurtherCat.subcategory_id"
                :items="subcategories"
                item-value="id"
                item-text="name"
                label="Select Category"
                class="ma-0 pa-0"
              ></v-autocomplete>
              </v-flex>
                <v-flex xs12 sm12 md12 >
                  <v-text-field v-model="editFurtherCat.name" label="Name" ></v-text-field>
                </v-flex>

                <v-flex xs12 sm12 md12 >
                  <v-textarea
                  v-model="editFurtherCat.desc"
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
      <v-dialog v-model="newFurth" max-width="500px">
        <v-card>
          <v-card-title class="mb-0 pb-0">
            <span class="headline">New Further Category</span> 
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text class="ma-0 pa-0">
            <v-container grid-list-md >
            <v-flex xs12 sm12 md12 >
              <v-autocomplete
                v-model="newFurtherCat.subcategories.category_id"
                :items="categories"
                item-value="id"
                item-text="name"
                label="Select Category"
                class="ma-0 pa-0"
              ></v-autocomplete>
              </v-flex>
              <v-flex xs12 sm12 md12 >
              <v-autocomplete
                v-model="newFurtherCat.subcategory_id"
                :items="subcategories"
                item-value="id"
                item-text="name"
                label="Select SubCategory"
                class="ma-0 pa-0"
              ></v-autocomplete>
              </v-flex>
                <v-flex xs12 sm12 md12 >
                  <v-text-field v-model="newFurtherCat.name" label="Name" ></v-text-field>
                </v-flex>

                <v-flex xs12 sm12 md12 >
                  <v-textarea
                  v-model="newFurtherCat.desc"
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
      :items="furtherCategoriesData"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.subcategories.name }}</td>
        <td>{{ props.item.subcategories.categories.name }}</td>
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
        <v-btn color="primary" @click="getFurtherCategories()">Reload</v-btn>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="page" :length="furtherCategories.last_page" total-visible="9"></v-pagination>
    </div>
  </div>

</template>
<script type="text/javascript">

import axios from 'axios'
import _ from 'lodash'
  export default {
    
    data: ()=>({
       newFurth: false,
       selectedCategory: '',
       dialog: false,
       search: '',
       headers: [
        {
          text: 'Further Category',
          sortable: false,
          value: 'furthercategory'
        },
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
      perPage(){
        return this.$store.getters.selectedPage
      },
      subcategories(){
        let sub = this.$store.getters.subcategories
        return _.values(sub)
      },
      furtherCategoriesData(){
        let sub = this.$store.getters.furtherCategories.data
        return _.values(sub)
      },
      furtherCategories: {
        get(){
          return this.$store.getters.furtherCategories
        },
        set(val){

        }
        
      },

      page: {
          get(){
            return this.$store.getters.page
          },
          set(val){
            this.$store.dispatch('page', val);
          }
      },
      editFurtherCat: {
        get(){
          return this.$store.getters.editFurtherCat
        },
        set(val){
          this.$store.dispatch('editFurtherCat', val)
        }
      },
      newFurtherCat: {
          get(){
            return this.$store.getters.newFurtherCat
          },
          set(val){

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
      this.getFurtherCategories()
      this.$store.dispatch('page', 1);
    },
    methods: {
      openNewFurth(){
        this.newFurth = true
      },
      getSubCategories(catId){
        let data = this
        axios.get( process.env.baseApi + '/get-subcategories/' + catId)
            .then(res => {
               data.$store.dispatch('subcategories', res.data.subcategories)
              })
      },
      searchFurtherCat(){
        let data = this
          if (this.search !=null){
            axios.get( process.env.baseApi + '/search-further-category?search='+this.search + '&page='+this.page+'&perPage='+this.perPage)
            .then(res => {
               data.$store.dispatch('furtherCategories', res.data.furtherCategories)
              })
          }else{
            this.getFurtherCategories()
          }
      },
      getFurtherCategories(){
        let data = this
        axios.get( process.env.baseApi + '/further_categories?page='+this.page+'&perPage='+this.perPage)
            .then(res => {
                data.$store.dispatch('furtherCategories', res.data.furtherCategories)
              })
      },
      close(){
        this.dialog = false
        this.newFurth = false
      },
      edit(id){
        this.dialog = true
        let data = this
        axios.get( process.env.baseApi + '/further_categories/' + id + '/edit')
            .then(res => {
                data.$store.dispatch('editFurtherCat', res.data.furtherCat) 
              })
      },
      save(){
        axios.post( process.env.baseApi + '/further_categories?page='+this.page+'&perPage='+this.perPage, this.newFurtherCat)
            .then(res => {
                

              })
         this.newFurth = false
      },
      update(){
        let data = this
        axios.put( process.env.baseApi + '/further_categories/' + this.editFurtherCat.id + '?page='+this.page+'&perPage='+this.perPage, 
            this.editFurtherCat
            )
            .then(res => {
              data.$store.dispatch('furtherCategories', res.data.furtherCategories)
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
         axios.get( process.env.baseApi + '/further_categories/' + id + '/edit')
            .then(res => {
                data.$store.dispatch('editFurtherCat', res.data.furtherCat) 
              })
        this.$store.dispatch('confirmDeleteDialog', true)
      }
    },
    watch: {
      page(){
        this.getFurtherCategories()
      },
      'editFurtherCat.name': function(val){
        this.$store.dispatch('editFurtherCatField',{
          field: 'name',
          value: val
        });
      },
      'editFurtherCat.subcategories.category_id': function(val){
        this.getSubCategories(val);
        this.$store.dispatch('editFurtherCatFieldSub', val);
      },
      'editFurtherCat.subcategory_id': function(val){
        this.$store.dispatch('editFurtherCatField',{
          field: 'subcategory_id',
          value: val
        });
      },
      'editFurtherCat.desc': function(val){
        this.$store.dispatch('editFurtherCatField',{
          field: 'desc',
          value: val
        });
      },
      'newFurtherCat.name': function(val){
        this.$store.dispatch('editFurtherCatField',{
          field: 'name',
          value: val
        });
      },
      'newFurtherCat.desc': function(val){
        this.$store.dispatch('editFurtherCatField',{
          field: 'desc',
          value: val
        });
      },
      'newFurtherCat.subcategory_id': function(val){
        this.$store.dispatch('newFurtherCatField',{
          field: 'subcategory_id',
          value: val
        });
      },
      'newFurtherCat.subcategories.category_id': function(val){
        this.getSubCategories(val);
        this.$store.dispatch('newFurtherCatFieldSub', val);
      },
      search : _.debounce(function(){
        this.searchFurtherCat()
      }, 500)
    }
   
  }
</script>