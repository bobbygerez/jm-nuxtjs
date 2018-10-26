<template>
  <v-container fluid>
    <v-text-field
      v-model="value"
      color="cyan darken"
      placeholder="Enter Store/Supplier"
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
  </v-container>
</template>
<script>
  export default {
    data: () => ({
      value: '',
      custom: true
    }),
    computed: {
      progress () {
        return Math.min(100, this.value.length * 10)
      },
      color () {
        return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
      }
    }
  }
</script>