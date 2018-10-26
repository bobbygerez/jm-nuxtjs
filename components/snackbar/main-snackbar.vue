<template>
  <v-card>
    <v-snackbar
      :timeout="0"
      :color="snackbarColor"
      v-model="snackbar"
    >
      {{ snackbarText }}
      <v-btn dark flat @click.native="snackbarClose">Close</v-btn>
    </v-snackbar>
  </v-card>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        mode: '',
      }
    },
    computed: {
       ...mapGetters([
        'snackbar',
        'snackbarText',
        'snackbarColor'
      ]),
    },
    methods: {
      snackbarClose(){
        this.$store.dispatch('snackbar', false);
      }
    }
  }
</script>