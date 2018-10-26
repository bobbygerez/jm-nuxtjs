<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title><v-btn class="success green--text" outline @click="openNewItem()">New Product</v-btn></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
      v-model="search"
      append-icon="search"
      label="Search user..."
      single-line
      hide-details
      ></v-text-field>
      <v-dialog v-model="xx">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card class="ma-0 pa-0">
            <v-card-title class="headline success lighten--2 "
            primary-title>
            <v-container grid-list-md class="ma-0 pa-0">
              <v-layout wrap >
                <v-flex xs6>
                  <v-spacer></v-spacer><span>New Product</span> 
                </v-flex>
                <v-flex xs6 >
                 <v-switch
                 :label="'Status'"
                 v-model="status"
                 class="ma-0 pa-0"
                 ></v-switch>
               </v-flex>
             </v-layout>
           </v-container>
         </v-card-title>
         <v-card-text class="ma-0 pa-0">


         </v-card-text>

         
      </v-card>
    </v-form>
  </v-dialog>
</v-toolbar>
<v-data-table
:headers="headers"
:items="productsData"
hide-actions
class="elevation-1"
>
<template slot="items" slot-scope="props">
  <td>{{ props.item.item.name }} </td>
  <td>{{ props.item.item.amount|currency('₱') }}</td>
  <td>{{ props.item.store.name }}</td>
  <td>{{ props.item.branch.name }}</td>
  <td>
    <v-icon>check</v-icon>
  </td>
  <td>{{ props.item.created_at }}</td>
  <td class="justify-center layout px-0">
   <v-tooltip bottom >
    <v-btn slot="activator" icon class="ma-0 pa-0 mt-1" @click="edit(props.item.id)">
      <v-icon color="success">edit</v-icon>
    </v-btn>
    <span>Edit</span>
  </v-tooltip>
  <v-tooltip bottom>
    <v-btn slot="activator" icon class="ma-0 pa-0 mt-1">
      <v-icon color="error">delete</v-icon>
    </v-btn>
    <span>Delete</span>
  </v-tooltip>
</td>
</template>
<template slot="no-data">
  <v-btn color="primary" @click="getUsers()">Reload</v-btn>
</template>
</v-data-table>
<div class="text-xs-center pt-2">
  <v-pagination v-model="page" :length="products.last_page" total-visible="9"></v-pagination>
</div>
<v-dialog v-model="newProductDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
  <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click.native="close">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>New Product</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark flat @click.native="submit()">Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container >
      <v-layout wrap >
        <v-flex xs12 sm6 md6 lg4>
          <product-status></product-status>
        </v-flex>
        <v-flex xs12 sm6 md6 lg4>
          <search-store></search-store>
        </v-flex>
        <v-flex xs12 sm6 md6 lg4>
          <branches></branches>
        </v-flex>
        <v-flex xs12 sm6 md6 lg4>
          <provinces></provinces>
        </v-flex>
        <v-flex xs12 sm6 md6 lg4>
          <cities></cities>
        </v-flex>
        <v-flex xs12 sm6 md6 lg4 v-if="selectedCitiesProduct.length == 1" >
          <brgys v-bind:status="false"></brgys>
        </v-flex>
        <v-flex xs12 sm6 md6 lg4 v-else class="pl-2">
          <brgys v-bind:status="true"></brgys>
      </v-flex>
      <v-flex xs12 sm6 md6 lg4 >
        <v-text-field v-model="productName" label="Product Name" clearable ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md6 lg4 >
        <v-text-field v-model="productSKU" label="SKU" clearable ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md6 lg2 >
        <my-currency-input v-model="productPrice" v-bind:label="'Price'"></my-currency-input>
      </v-flex>
      <v-flex xs12 sm6 md6 lg1>
        <v-text-field v-model="productQuantity" label="Qty" type="number" clearable></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md6 lg1>
        <v-text-field v-model="productDiscount" label="Discount" type="number" clearable></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md6 lg4>
        <units></units>
      </v-flex>
      <v-flex xs12 sm6 md6 lg4>
        <sizes></sizes>
      </v-flex>
      <v-flex xs12 sm12 md12 lg4>
        <colors></colors>
      </v-flex>
      <v-flex xs12 sm12 md12 lg4>
        <categories></categories>
      </v-flex>
      <v-flex xs12 sm12 md12 lg4>
        <subcategories></subcategories>
      </v-flex>
      <v-flex xs12 sm12 md12 lg4>
        <further-categories></further-categories>
      </v-flex>
      <v-flex xs12>
        <v-textarea v-model="productShortDesc" label="Short Description" class="ma-0 pa-0" clearable></v-textarea>
      </v-flex>
      <v-flex xs12>
        <v-textarea v-model="productLongDesc" label="Long Description" class="ma-0 pa-0" clearable></v-textarea>
      </v-flex>
      <v-flex xs12>
        <dropzone id="myDropzone" ref="myVueDropzone" :options="options" :destroyDropzone="true"></dropzone>
      </v-flex>
    </v-layout>
  </v-container>
  <v-card-actions>
    <v-container>
      <v-layout>
         <v-flex xs12 class="text-xs-right">
          <v-btn color="blue darken-1" flat @click.native="close" >Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="submit()" >Save</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card-actions>
    
  </v-card>
</v-dialog>
</div>
</template>
<script>
  import furtherCategories from '~/components/select/further-categories'
  import subcategories from '~/components/select/subcategories'
  import categories from '~/components/select/categories'
  import productStatus from '~/components/select/productStatus'
  import units from '~/components/select/units'
  import sizes from '~/components/select/sizes'
  import colors from '~/components/autocomplete/colors'
  import Dropzone from 'nuxt-dropzone'
  import branches from '~/components/select/branches'
  import searchStore from '~/components/autocomplete/search-store'
  import myCurrencyInput from '~/components/currency-format/my-currency-input'
  import provinces from '~/components/combobox/provinces'
  import cities from '~/components/select/cities'
  import brgys from '~/components/select/brgys'
  import 'nuxt-dropzone/dropzone.css'
  import axios from 'axios'
  import _ from 'lodash'
  export default {
    components: {
      Dropzone, 
      searchStore, 
      myCurrencyInput, 
      provinces, 
      cities, 
      brgys, 
      colors,
      sizes,
      units,
      branches,
      productStatus,
      categories,
      subcategories,
      furtherCategories
    },
    data: () => ({
      xx: false,
      newProductDialog:true,
      notifications: false,
      sound: true,
      widgets: false,
      switchBrgy: true,
      valid: false,
      status:false,
      options: {
        url: process.env.baseApi,
        acceptedFiles: 'image/jpeg, image/jpg, image/png', 
        addRemoveLinks: true,
        dictDefaultMessage: 'Upload Images...',
        maxFilesize: 2, // MB
        dictFileTooBig: 'Maximum file is {{maxFilesize}}.',
        autoProcessQueue: false
      },
      userEdit: [],
      selectedUser: '',
      search: '',
      searchUser: [],
      headers: [
      {
        text: 'Name',
        sortable: false,
        value: 'name'
      },

      {
        text: 'Price',
        sortable: false,
        value: 'contact'
      },
      { 
        text: 'Store',
        value: 'store', 
        sortable: false 
      },
      {
        text: 'Branch',
        sortable: false,
        value: 'branch'
      },
      {
        text: 'Status',
        sortable: false,
        value: 'status'
      },
      {
        text: 'Created',
        sortable: false,
        value: 'date'
      },
      { 
        text: 'Action',
        value: 'action', 
        sortable: false 
      }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }),
    mounted() {
      // Everything is mounted and you can access the dropzone instance
      const instance = this.$refs.myVueDropzone.dropzone
    },
    computed: {
      token(){
        return this.$store.getters.token
      },
      productName: {
        get(){
          return this.$store.getters.productName
        },
        set(value){
          this.$store.dispatch('productName', value);
        }
      },
      productPrice: {
        get(){
          return this.$store.getters.productPrice
        },
        set(value){
          this.$store.dispatch('productPrice', value);
        }
      },
      productQuantity: {
        get(){
          return this.$store.getters.productQuantity
        },
        set(value){
          this.$store.dispatch('productQuantity', value);
        }
      },
      productSKU: {
        get(){
          return this.$store.getters.productSKU
        },
        set(value){
          this.$store.dispatch('productSKU', value);
        }
      },
      productShortDesc: {
        get(){
          return this.$store.getters.productShortDesc
        },
        set(val){
          this.$store.dispatch('productShortDesc', val);
        }
      },
      productLongDesc: {
        get(){
          return this.$store.getters.productLongDesc
        },
        set(val){
          this.$store.dispatch('productLongDesc', val)
        }
      },
      selectedProductStatus: {
        get(){
          return this.$store.getters.selectedProductStatus
        },
        set(val){
        }
      },
      productDiscount: {
        get(){
          return this.$store.getters.productDiscount
        },
        set(val){
          this.$store.dispatch('productDiscount', val);
        }
      },
      selectedCategory(){
        return this.$store.getters.selectedCategory
      },
      selectedSubcategory(){
        return this.$store.getters.selectedSubcategory
      },
      selectedFurtherCategory(){
        return this.$store.getters.selectedFurtherCategory
      },

      selectedUnitProduct(){
        return this.$store.getters.selectedUnitProduct
      },
      selectedSizesProduct(){
        return this.$store.getters.selectedSizesProduct
      },
      selectedColorsProduct(){
        return this.$store.getters.selectedColorsProduct
      },
      selectedBrgysProduct(){
        return this.$store.getters.selectedBrgysProduct
      },
      selectedCitiesProduct(){
        return this.$store.getters.selectedCitiesProduct
      },
      selectedProvinceProduct(){
        return this.$store.getters.selectedProvinceProduct
      },
      selectedBranches(){
        return this.$store.getters.selectedBranches
      },
      storeId(){
        return this.$store.getters.storeId
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
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      newProduct(){
        return this.$store.getters.newProduct
      },
      products(){
        return this.$store.getters.products
      },
      productsData(){
        let products = this.$store.getters.products.data
        return _.values(products)
      }
    },

    watch: {
      search: _.debounce(function(){
        this.searchNewUser()
      }, 500),
      dialog (val) {
        val || this.close()
      },
      'userEdit.firstname': function(val){
        this.userEdit.firstname = val
      },
      'userEdit.lastname': function(val){
        this.userEdit.lastname = val
      },
      'userEdit.email': function(val){
        this.userEdit.email = val
      },
      'userEdit.status': function(val){
        this.userEdit.status = val
      }
    },

    created () {
      this.getItems()
    },

    methods: {

      submit () {

        if (this.$refs.form.validate()) {
          axios.post( process.env.baseApi + '/items?token=' + this.token,{
            category_id: this.selectedCategory,
            subcategory_id: this.selectedSubcategory,
            further_category_id: this.selectedFurtherCategory,
            unit_ids: this.selectedUnitProduct,
            size_ids: _.map(this.selectedSizesProduct, 'id'),
            color_ids: this.selectedColorsProduct,
            brgy_ids: _.map(this.selectedBrgysProduct, 'brgyCode'),
            city_ids: this.selectedCitiesProduct,
            provCode: this.selectedProvinceProduct,
            branch_ids: this.selectedBranches,
            store_id: this.storeId,
            images: this.$refs.myVueDropzone.getQueuedFiles(),
            sku: this.productSKU,
            name: this.productName,
            amount: this.productPrice,
            quantity: this.productQuantity,
            discount: this.productDiscount,
            short_desc: this.productShortDesc,
            long_desc: this.productLongDesc,
            status:this.selectedProductStatus
          })
          .then(res => {

          })
          
        }
      },
      clear () {
        this.$refs.form.reset()
      },
      openNewItem(){
        this.newProductDialog = true
      },
      searchNewUser(){
        let data = this
        if (this.search !=null){
          axios.get( process.env.baseApi + '/search-user?search='+this.search)
          .then(res => {
           data.searchUser = res.data.arrayUser
           data.$store.dispatch('users', res.data.users)
         })
        }else{
          this.getUsers()
        }

      },
      getItems(){
        let data = this
        axios.get( process.env.baseApi + '/item_info?page='+this.page+'&perPage='+this.selectedPage)
        .then(res => {
          data.$store.dispatch('products', res.data.itemInfo)
        })
      },



      edit(userId) {
       let data = this
       this.dialog = true
       axios.get( process.env.baseApi + '/user/' + userId + '/edit')
       .then(res => {
        data.userEdit = res.data.user
      })
     },

     deleteItem (item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
    },

    close () {
      this.newProductDialog = false
    },
    update(userId) {
     let data = this
     axios.put( process.env.baseApi + '/user/' + userId,
      this.userEdit
      )
     .then(res => {
       data.$store.dispatch('users', res.data.users)
       data.$store.dispatch('snackbarOptions', {
        snackbarColor : 'success',
        snackbarText : 'User Updated Successfully',
        snackbar: true
      })
     })
     this.dialog = false
   }
 },
 watch: {
  'newProduct.status': function(val){
    this.$store.dispatch('newProductField',{
      field: 'status',
      value: val
    });
  },
  page(){
    this.getItems()
  }
}
}
</script>

<style type="text/css" scope>
  #myDropzone .dz-preview .dz-progress {
    opacity: 0;
  }

</style>