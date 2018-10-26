import axios from 'axios'

export default async function ({context, store, router, redirect, req}) {

	var token = store.getters.token;

 	if (token != null) {
 		return axios.get( process.env.baseApi + '/auth/user?token=' + token)
		  .then(response => {
		      store.dispatch('user', response.data.user)
		      store.dispatch('userLogin', true)
		      store.dispatch('stepper', 2);
		    })
		  .catch(function(error){
		  	  store.dispatch('snackbarText', 'Login expired...')
              store.dispatch('snackbarColor', 'error')
              store.dispatch('snackbar', true)
              store.dispatch('userLogin', false)
              store.dispatch('dashboard', false)
              redirect('/')
		  })
 	}

 	

}