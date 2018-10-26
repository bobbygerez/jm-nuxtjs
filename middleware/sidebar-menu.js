import axios from 'axios'

export default function ({ store }) {
	
  if (store.categories === undefined || store.categories.length == 0) {
    return axios.get( process.env.baseApi + '/menu-categories' )
	  .then(response => {
	      store.dispatch('categories', response.data.categories)
	    })
	}
  
}