import axios from 'axios'

export default function ({ store, params }) {

  return axios.get( process.env.baseApi + '/get-items/subcategory/furtherCat/' + params.furthCat + '?furthCat=' + params.furthCat + '&page=' + store.getters.page + '&perPage=' + store.getters.selectedPage)
        .then(res => {
             store.commit('itemInfo', res.data.itemInfo)
             store.commit('furtherCategoryName', res.data.furtherCategoryName)
          })
}