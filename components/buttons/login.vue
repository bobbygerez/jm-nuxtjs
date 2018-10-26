<template>
	<span :class="visibility">
		  <cart-items></cart-items>
		  <v-btn icon v-if="userLogin == false" @click="showUserReg">
		    <v-icon>account_circle</v-icon>
		  </v-btn>
		  <v-btn icon v-if="userLogin == true" to="/dashboard/profile/1"> 
		    <v-icon >dashboard</v-icon>
		  </v-btn>
		  <v-btn icon v-if="userLogin == true" @click="logoff"> 
		    <v-icon >power_settings_new</v-icon>
		  </v-btn>
		  <v-btn icon @click="showLoginDialog" v-else>
		    <v-icon>lock_outline</v-icon>
		  </v-btn>
	 </span>
</template>
<script type="text/javascript">
	import axios from 'axios'
  	import cartItems from '~/components/cart/items'

	export default {

		props: ['visibility'],
		components: { cartItems },
		computed: {
			loginDialog(){
				return this.$store.getters.loginDialog
			},
			userLogin(){
				return this.$store.getters.userLogin
			}
		},
		methods: {
			
			showLoginDialog(){
				this.$store.dispatch('loginDialog', true);
			},
			showUserReg(){
				this.$store.dispatch('userReg', true);
			},
			logoff(){
				let data = this
				axios.post( process.env.baseApi + '/auth/logout?token=' + this.$store.getters.token)
		        .then(function(res){
		        	data.$store.dispatch('snackbarOptions', {
		        			snackbarColor : 'success',
		        			snackbarText : res.data.msg,
		        			snackbar: true
		        		})
		        	data.$store.dispatch('userLogin', false)
		        	data.$store.dispatch('user',{})
		        	data.$store.dispatch('token', null)
		        	data.$store.dispatch('stepper', 1)

		        })
		        .catch(function(err){
		        	data.$store.dispatch('userLogin', false)
		        	data.$store.dispatch('user',{})
		        	data.$store.dispatch('token', null)
		        	data.$store.dispatch('stepper', 1)
		        })
			}
		}
	}

</script>