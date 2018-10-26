import axios from 'axios'

export default async function ({context, store, router, redirect, req}) {

	return axios.get( process.env.baseApi + '/colors')
	.then(response => {
		store.dispatch('colors', response.data.colors)

	})
	.catch(function(error){

	})
}