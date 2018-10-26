<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="900" >
      <v-card>
        <v-card-title class="headline mb-0 pb-0">Where do you want to shop?</v-card-title>
        <v-card-text>
          <v-text-field
            autofocus
            v-model="value"
            color="cyan darken"
            placeholder="Enter Name of the Store/Place..."
            loading
          >
            <v-progress-linear
              v-if="custom"
              slot="progress"
              :value="progress"
              :color="color"
              height="7"
            ></v-progress-linear>
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.native="dialog = false">Cancel</v-btn>
          <v-btn color="primary"  to="/search-result">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        dialog: true,
        value: '',
        custom: true
      }
    },
    computed: {
      progress () {
        return Math.min(100, this.value.length * 10)
      },
      color () {
        return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
      }
    },
    methods: {
      result(){

      }
    }
  }
</script>

<style type="text/css" scope>
  .v-overlay--active:before{
    opacity: .9;
  }
</style>