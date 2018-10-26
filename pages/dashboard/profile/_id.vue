<template>
	<v-container class="ma-1 pa-1">
      <v-layout wrap justify-center align-center>
        <v-flex xs12 sm12 md12 lg12 xl12 class="pr-2">
        <h1>{{ user.firstname }} {{ user.lastname }}</h1>
         	<v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
              v-model="user.firstname"
              :rules="nameRules"
              :counter="20"
              label="Firstname"
              required
              ></v-text-field>
              <v-text-field
              v-model="user.lastname"
              :rules="nameRules"
              :counter="20"
              label="Lastname"
              required
              ></v-text-field>
              <v-text-field
              v-model="user.email"
              :rules="emailRules"
              label="E-mail"
              required
              ></v-text-field>
              <roles></roles>

            <v-text-field
              v-if="changePassWord == true"
              label="Change password"
              hint="At least 8 characters"
              :rules="passwordRules"
              v-model="password"
              :prepend-icon= "e1 ? 'visibility' : 'visibility_off'""
              @click:prepend="() => (e1 = !e1)"
              :type="e1 ? 'password' : 'text'"
              counter

              >
              </v-text-field>
              <v-btn color="success" @click="clickPassword()">{{passwordText}}</v-btn>
            <v-btn color="info" @click="submit()">Update</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script type="text/javascript">
import roles from '~/components/select/roles'
	export default {
     data(){
        return {
          changePassWord: false,
          password: '',
          passwordText: 'Change Password',
          valid: false,
           nameRules: [
            v => !!v || 'Name is required',
            ],
            passwordRules: [
              (v) => !!v || 'Password is required',
              ],
            email: '',
            emailRules: [
            v => !!v || 'E-mail is required',
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
             valid: true,
              e1: true,
        }
      },
    components: { roles },
		middleware: 'auth',
    computed: {
      user(){
        return this.$store.getters.user
      }
    },
    created(){
      this.$store.dispatch('dashboard', true);
    },
    methods: {
      submit(){

      },
      clickPassword(){
      if (this.changePassWord == false) {
        this.changePassWord = true
        this.passwordText = 'Hide Password'
      }else{
        this.changePassWord = false
        this.passwordText = 'Change Password'
      }
    },
    }
	}
</script>