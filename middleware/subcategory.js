import axios from 'axios'

export default function ({ store, params }) {

  return axios.get( process.env.baseApi + '/get-items/subcategory/' + params.subId + '?subId=' + params.subId + '&page=' + store.getters.page + '&perPage=' + store.getters.selectedPage)
        .then(res => {
             store.commit('itemInfo', res.data.itemInfo)
             store.commit('subcategoryName', res.data.subcategoryName)
          })
}