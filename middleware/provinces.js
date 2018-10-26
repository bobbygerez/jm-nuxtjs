import axios from 'axios'

export default function ({ store, params }) {

  return axios.get( process.env.baseApi + '/get-provinces')
        .then(res => {
             store.commit('provinces', res.data.provinces)
          })
}