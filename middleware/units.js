import axios from 'axios'

export default async function ({context, store, router, redirect, req}) {

	return axios.get( process.env.baseApi + '/units')
	.then(response => {

		store.dispatch('units', response.data.units)

	})
	.catch(function(error){

	})

	
}