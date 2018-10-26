import axios from 'axios'

export default function ({ store, params }) {

  return axios.get( process.env.baseApi + '/items/' + params.itemId)
        .then(res => {
           		store.dispatch('item', res.data.item);
          })
}