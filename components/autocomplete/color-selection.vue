<template>
<v-card>
<v-layout v-for="color in colors" :key="color.id">
  <v-flex xs6 v-for="img in color.images" :key="img.id">
    <v-avatar size="80px" class="grey lighten-1">
      <img :src="img.path" alt="avatar">
    </v-avatar>
    {{ color.name }}
  </v-flex>
</v-layout>
</v-card>
</template>

<script type="text/javascript">
  export default{

    props:['colors']
  }
</script>



