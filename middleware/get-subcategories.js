import axios from 'axios'

export default function ({ store, params }) {

  return axios.get( process.env.baseApi + '/get-subcategories')
        .then(res => {
             store.commit('subcategories', res.data.subcategories)
          })
}