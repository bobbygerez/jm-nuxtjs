import axios from 'axios'

export default async function ({context, store, router, redirect, req}) {

	var user = store.getters.user.roles;

	for (var i = user.length - 1; i >= 0; i--) {
		if(user[i].name != 'Super Admin'){
			
		}
	}
}