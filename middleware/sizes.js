import axios from 'axios'

export default async function ({context, store, router, redirect, req}) {

	return axios.get( process.env.baseApi + '/sizes')
	.then(response => {

		store.dispatch('sizes', response.data.sizes)

	})
	.catch(function(error){

	})

	
}