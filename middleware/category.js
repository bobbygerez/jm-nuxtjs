import axios from 'axios'

export default function ({ store, params }) {
  let selectedProvince = store.getters.selectedProvince
  if (selectedProvince != null) {

  	return axios.get( process.env.baseApi + '/get-items/' + params.catId + '?catId=' + params.catId + '&page=' + store.getters.page + '&perPage=' + store.getters.selectedPage + '&provCode=' + store.getters.selectedProvince.provCode)
        .then(res => {
             store.commit('itemInfo', res.data.itemInfo)
             store.commit('categoryName', res.data.categoryName)
          })
  } else {
  	 return axios.get( process.env.baseApi + '/get-items/' + params.catId + '?catId=' + params.catId + '&page=' + store.getters.page + '&perPage=' + store.getters.selectedPage + '&provCode=')
        .then(res => {
             store.commit('itemInfo', res.data.itemInfo)
             store.commit('categoryName', res.data.categoryName)
          })
  }
  
}