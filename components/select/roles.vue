<template>
      <v-flex xl12 lg12 md12 sm12 xs12>
        <v-select
          :items="roles"
          v-model="role"
          label="Select Roles"
          multiple
          chips
          item-text="name"
          item-value="id"
          hint="User Roles"
          persistent-hint
        ></v-select>
      </v-flex>
</template>
<script>
import axios from 'axios'
import _ from 'lodash'
  export default {
    created(){
      this.getRoles()
    },
    computed: {
      roles(){
        return this.$store.getters.roles
      },
      role(){
        let roles = this.$store.getters.user.roles;
       return _.uniqBy(roles, 'id');
      }
    },
    methods: {
      getRoles(){
        let data = this
        axios.get( process.env.baseApi + '/roles')
        .then(res => {
            data.$store.dispatch('roles', res.data.roles)
          })
      }
    }
  }
</script>