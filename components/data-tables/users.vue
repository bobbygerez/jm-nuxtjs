<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>All Users</v-toolbar-title>
      <v-spacer></v-spacer>
         <v-text-field
       v-model="search"
       append-icon="search"
       label="Search user..."
       single-line
       hide-details
       ></v-text-field>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="mb-0 pb-0">
            <span class="headline">Edit User</span> 
            <v-spacer></v-spacer>
            <v-switch
              :label="'Block user'"
              v-model="userEdit.status"
            ></v-switch>
          </v-card-title>
          <v-card-text class="ma-0 pa-0">
            <v-container grid-list-md >
              <v-layout wrap class="mt-0 pt-0">
                <v-flex xs6 sm6 md6 >
                  <v-text-field v-model="userEdit.firstname" label="Firstname" class="ma-0 pa-0"></v-text-field>
                </v-flex>
                <v-flex xs6 sm6 md6>
                  <v-text-field v-model="userEdit.lastname" label="Lastname" class="ma-0 pa-0"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="userEdit.email" label="Email" class="ma-0 pa-0"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="userEdit.company" label="Company" class="ma-0 pa-0"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="userEdit.contact" label="Contact #" class="ma-0 pa-0"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="update(userEdit.id)">Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="users"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.firstname }} {{ props.item.lastname }}</td>
        <td>{{ props.item.email }}</td>
        <td></td>
        <td></td>
        <td>{{ props.item.created_at }}</td>
        <td class="justify-center layout px-0">
         <v-tooltip bottom >
          <v-btn slot="activator" icon class="ma-0 pa-0 mt-1" @click="edit(props.item.id)">
            <v-icon color="success">edit</v-icon>
          </v-btn>
          <span>Edit User</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn slot="activator" icon class="ma-0 pa-0 mt-1">
            <v-icon color="error">delete</v-icon>
          </v-btn>
          <span>Delete User</span>
        </v-tooltip>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="getUsers()">Reload</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import axios from 'axios'
import _ from 'lodash'
  export default {
    data: () => ({
      switch1: false,
      userEdit: [],
      selectedUser: '',
      search: '',
      dialog: false,
      searchUser: [],
      headers: [
        {
          text: 'Name',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Email',
          sortable: false,
          value: 'email'
        },
        {
          text: 'Company',
          sortable: false,
          value: 'contact'
        },
        {
          text: 'Contact #',
          sortable: false,
          value: 'contact'
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

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      users(){
        return this.$store.getters.users
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
      this.getUsers()
    },

    methods: {
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
      getUsers(){
        let data = this
        axios.get( process.env.baseApi + '/user')
            .then(res => {
                data.$store.dispatch('users', res.data.users)
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
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
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
    }
  }
</script>