<template>
  <v-app id="inspire">
        <v-navigation-drawer
        :clipped="$vuetify.breakpoint.lgAndUp"
        v-model="drawer"
        fixed
        app
        >
        <v-list v-if="dashboard != true">
          <v-list-tile :to="'/'">
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-group
          v-for="(category, x) in categories"
          :key="x"
          >
          <v-list-tile slot="activator" :to="'/Category/' + slug(category.name) +`/${category.id}`">
            <v-list-tile-title>{{ category.name }}</v-list-tile-title>
          </v-list-tile>
          
          <v-list-group
          no-action
          sub-group
          v-for="(subcategory, i) in category.subcategories"
          :key="i"
          >
          <v-list-tile slot="activator" :to="'/Category/' + slug(category.name) + '/'+ slug(subcategory.name) + `/${subcategory.id}`">
            <v-list-tile-title>{{ subcategory.name }}</v-list-tile-title>
          </v-list-tile>

          <v-list-tile
          v-for="(furtherCat, i) in subcategory.further_categories"
          :key="i"
          :to="'/Category/' + slug(category.name) + '/'+ slug(subcategory.name) + '/' + slug(furtherCat.name) +`/${furtherCat.id}`"
          >
          <v-list-tile-title>{{ furtherCat.name }}</v-list-tile-title>
        </v-list-tile>
      </v-list-group>

    </v-list-group>
    </v-list>
    <v-list v-if="dashboard != false">

      <v-list-tile :to="'/'">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile :to="`/dashboard/profile/${user.id}`">
        <v-list-tile-action>
          <v-icon>account_circle</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Profile</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile :to="'/dashboard/users'">
        <v-list-tile-action>
          <v-icon>people</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Users</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>

      <v-list-group
      v-for="item in dashboardCategories"
      v-model="item.active"
      :key="item.title"
      :prepend-icon="item.action"
      no-action

      >
      <v-list-tile slot="activator" to='/Dashboard/Categories'>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile
      v-for="subItem in item.items"
      :key="subItem.title"
      :to="subItem.to"
      >
      <v-list-tile-content>
        <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <v-icon>{{ subItem.action }}</v-icon>
      </v-list-tile-action>
    </v-list-tile>

    </v-list-group>
    <v-divider></v-divider>
      <v-list-tile :to="'/dashboard/products'">
        <v-list-tile-action>
          <v-icon>store</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Products</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    </v-navigation-drawer>
    <v-toolbar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    color="blue darken-3"
    dark
    app
    fixed
    >
    <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <span class="hidden-sm-and-down">Juan Merkado</span>
      <login-dialog v-bind:visibility="'hidden-md-and-up'"></login-dialog>
    </v-toolbar-title>
    <login-dialog v-bind:visibility="'hidden-sm-and-down'"></login-dialog>

    <v-spacer></v-spacer>
    <v-autocomplete
    prepend-icon="search"
    cache-items
    class="mx-3 hidden-xs-only"
    flat
    hide-no-data
    hide-details
    label="Search Product..."
    solo-inverted
    ></v-autocomplete>
    </v-toolbar>
    <v-content>
      <v-container >
      <nuxt/>
      </v-container>

    </v-content>
    <v-btn
    fab
    bottom
    right
    color="pink"
    dark
    fixed

    >
    <v-icon>chat</v-icon>
    </v-btn>
    <v-dialog v-model="userReg" width="800px">
      <v-card>
        <v-card-title
        class="grey lighten-4 py-4 title"
        >
        New User Account
      </v-card-title>
      <v-container grid-list-sm class="pa-4">
        <v-form v-model="validReg" ref="register" lazy-validation>
          <v-alert :value="alertLogin" outline color="error" icon="warning" dismissible @click="alertLogin = false">
            {{ alertText }}
          </v-alert>
          <v-layout row wrap>
            <v-flex xs4>
              <v-text-field
              prepend-icon="account_circle"
              placeholder="Firstname"
              v-model="firstname"
              :rules="[
              (v) => !!v || 'Firstname is required'
              ]"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
              placeholder="Middlename"
              v-model="middlename"
              :rules="[
              (v) => !!v || 'Middlename is required'
              ]"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
              placeholder="Lastname"
              v-model="lastname"
              :rules="[
              (v) => !!v || 'Lastname is required'
              ]"
              ></v-text-field>
            </v-flex>
          </v-flex>
          <v-flex xs12>
            <v-text-field
            prepend-icon="mail"
            placeholder="Email"
            v-model="email"
            :rules="emailRules"
            ></v-text-field>
          </v-flex>

          <v-text-field
          v-model="password"
          :prepend-icon="e1 ? 'visibility_off' : 'visibility'"
          :rules="passwordRules"
          :type="e1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          @click:prepend="e1 = !e1"
          ></v-text-field>
        </v-layout>
      </v-form>
    </v-container>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="hideUserReg">Cancel</v-btn>
      <v-btn flat @click="register">Submit</v-btn>
    </v-card-actions>
    </v-card>
    </v-dialog>
    <v-dialog v-model="loginDialog" width="800px">
      <v-card>
        <v-card-title
        class="grey lighten-4 py-4 title"
        >
        Sign-in
      </v-card-title>
      <v-container grid-list-sm class="pa-4">
        <v-form v-model="valid" ref="login" lazy-validation>
         <v-alert :value="alertLogin" outline color="error" icon="warning" dismissible @click="alertLogin = false">
          {{ alertText }}
        </v-alert>
        <v-layout row wrap>
          <v-flex xs12 lg12 sm12 md 12 lx12>
            <v-text-field
            append-icon="mail"
            placeholder="Email"
            v-model="emailLogin"
            :rules="emailRules"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 lg12 sm12 md 12 lx12>

            <v-text-field
            v-model="passwordLogin"
            :append-icon="e1 ? 'visibility_off' : 'visibility'"
            :rules="passwordRules"
            :type="e1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            @click:append="e1 = !e1"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-form>
    </v-container>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="hideLoginDialog">Cancel</v-btn>
      <v-btn flat @click="signin">Sign-in</v-btn>
    </v-card-actions>
    </v-card>
    </v-dialog>
    <v-dialog v-model="storeLocation" width="800px">
      <v-card>
        <v-card-title
        class="grey lighten-4 py-4 title"
        >
        Filter Product Location
      </v-card-title>
      <v-container grid-list-sm class="pa-4">
        <v-form v-model="valid" ref="login" lazy-validation>
          <v-layout row wrap>
            <v-flex xs12 lg12 sm12 md 12 lx12>
             <v-combobox
             v-model="selectedProvince"
             :items="provinces"
             item-text="provDesc"
             item-value="id"
             label="Province"
             ></v-combobox>
           </v-flex>
           <v-flex xs12 lg12 sm12 md 12 lx12>
            <v-combobox
            v-model="selectedCity"
            :items="cities"
            item-text="citymunDesc"
            item-value="id"
            label="City"
            ></v-combobox>
          </v-flex>
        </v-layout>
      </v-form>
    </v-container>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="hideStoreLocation">Close</v-btn>
    </v-card-actions>
    </v-card>
    </v-dialog>
    <vuetify-loader></vuetify-loader>
    <main-snackbar></main-snackbar>
</v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  import vuetifyLoader from '~/components/loader/vuetify-loader.vue'
  import mainSnackbar from '~/components/snackbar/main-snackbar.vue'
  import axios from 'axios'
  import loginDialog from '~/components/buttons/login.vue'
  export default {
   data(){
    return {
      dashboardCategories: [
      {
        action: 'assignment',
        title: 'Categories',
        items: [
        { title: 'Subcategories', to: '/Dashboard/Subcategories' },
        { title: 'Further Categories', to: '/Dashboard/Further-Categories' }
        ]
      }
      ],
      emailLogin: '',
      passwordLogin: '',
      password: '',
      validReg: false,
      valid: false,
      alertText: '',
      alertLogin: false,

      e1: false,
      passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => v.length >= 8 || 'Password must be at least 8 characters'
      ],
      emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      drawer: true,
      loading: false,
      search: null,
      select: null,
      states: [
      
      ]
    }
  }, 

  props: {
    source: String
  },
  components: {
    vuetifyLoader, mainSnackbar, loginDialog
    
  },
  computed: {
   ...mapGetters([
    'dashboard',
    'categories',
    'loader',
    'loginLoader',
    'snackbar',
    'storeLocation',
    'provinces',
    'cities',
    'user'

    ]),
   firstname: {
    get(){
      return this.$store.getters.firstname
    },
    set(val){
      this.$store.dispatch('firstname', val)
    }
  },
  selectedProvince:{
    get(){
      return this.$store.getters.selectedProvince
    },
    set(val) {
      this.$store.dispatch('selectedProvince', val)
    }
  },
  selectedCity:{
    get(){
      return this.$store.getters.selectedCity
    },
    set(val) {
      this.$store.dispatch('selectedCity', val)
    }
  },
  middlename: {
    get(){
      return this.$store.getters.middlename
    },
    set(val){
      this.$store.dispatch('middlename', val)
    }
  },
  lastname: {
    get(){
      return this.$store.getters.lastname
    },
    set(val){
      this.$store.dispatch('lastname', val)
    }
  },
  company: {
    get(){
      return this.$store.getters.company
    },
    set(val){
      this.$store.dispatch('company', val)
    }
  },
  email: {
    get(){
      return this.$store.getters.email
    },
    set(val){
      this.$store.dispatch('email', val)
    }
  },
  jobTitle: {
    get(){
      return this.$store.getters.jobTitle
    },
    set(val){
      this.$store.dispatch('jobTitle', val)
    }
  },
  phone: {
    get(){
      return this.$store.getters.phone
    },
    set(val){
      this.$store.dispatch('phone', val)
    }
  },
  userReg: {
    get(){
      return this.$store.getters.userReg
    },
    set(){

    }
  },
  loginDialog: {
    get(){
      return this.$store.getters.loginDialog
    },
    set(val){
      this.$store.dispatch('loginDialog', false)
    }
  },
  page(){
    return this.$store.getters.page
  },
  selectedPage(){
    return this.$store.getters.selectedPage
  }
},
methods: {
  hideStoreLocation(){
    this.$store.dispatch('storeLocation', false);
  },
  hideUserReg(){
    this.$store.dispatch('userReg', false);
  },
  hideLoginDialog(){
    this.$store.dispatch('loginDialog', false)
  },
  slug(text){
    return this.$slug(text)
  },
  // querySelections (v) {
  //   this.loading = true
  //   setTimeout(() => {
  //     this.items = this.states.filter(e => {
  //       return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
  //     })
  //     this.loading = false
  //   }, 500)
  // },
  signin(){

    if(this.$refs.login.validate()){

      this.$store.dispatch('loginLoader', 'Logging in...')
      this.$store.dispatch('loader', true) 
      var data = this
      axios.post(process.env.baseApi + '/login',{
        email: this.emailLogin,
        password: this.passwordLogin
      }).then(function (res){
        data.loginDialog = false
        data.$store.dispatch('token', res.data.token)
        data.$store.dispatch('user', res.data.user)
        data.$store.dispatch('userLogin', true)
        data.$store.dispatch('stepper', 2)
        data.$store.dispatch('snackbarText', 'You have successfully sign-in')
        data.$store.dispatch('snackbarColor', 'success')
        data.$store.dispatch('snackbar', true)
        data.$store.dispatch('loader', false) 
        data.hideLoginDialog()

      })
      .catch(function(error){
        data.alertText = error.response.data
        data.alertLogin = true
        data.$store.dispatch('loader', false) 
      })
    }
  },
  register(){
    let data = this
    if(this.$refs.register.validate()){
     axios.post(process.env.baseApi + '/user',{
      firstname: this.firstname,
      middlename: this.middlename,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    }).then(function (res){


    })
    .catch(function(error){
      data.alertText = 'Email address has already taken.'
      data.alertLogin = true
      data.$store.dispatch('loader', false) 
    })

  }
},
getItemsProvince(){
  let data = this
  axios.get( process.env.baseApi + '/get-items?provId=' + this.selectedProvince.id + '&page=' + this.page + '&perPage=' + this.selectedPage)
  .then(res => {
   data.$store.commit('itemInfo', res.data.itemInfo)
 })

}

},
watch: {
  selectedProvince(val){

    let data = this
    if (val.provCode != null) {
      axios.get( process.env.baseApi + '/get-cities/' + val.provCode)
      .then(res => {
        data.$store.dispatch('cities', res.data.cities);
        data.textProvince = res.data.province;
      })
    }

    this.getItemsProvince()



  },
  selectedCity(val){
    let data = this 
    if (val.id != '') {
      axios.get( process.env.baseApi + '/get-items?cityId=' + val.id + '&page=' + this.page + '&perPage=' + this.selectedPage)
      .then(res => {
       data.$store.commit('itemInfo', res.data.itemInfo)
     })
    }else{
      this.getItemsProvince()

    }

  }
}
}
</script>