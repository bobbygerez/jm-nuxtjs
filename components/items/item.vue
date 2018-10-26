<template>
  
    <v-flex xs12 sm6 md3 lg3 xl3>
      <v-card 
        hover
        class="ma-1"
        :height="500"
        :to="'/Category/' + slug(itemInfo.category.name) + '/'+ slug(itemInfo.sub_category.name) + '/' + slug(itemInfo.further_category.name) + '/' + slug(itemInfo.item.name) +`/${itemInfo.id}`" 
      >
        <v-card-title primary-title>
          <div>
            <div class="title">{{ itemInfo.item.name }}</div>
          </div>
        </v-card-title>
        <v-card-text wrap style='text-align: left;  word-wrap: break-word;'>
          <span v-for="img in itemInfo.item.images">
            <img :src="img.path" class='responsive'/>
          </span>
          <p class="caption"><v-icon>place</v-icon>{{ itemInfo.province.provDesc }}, {{ itemInfo.city.citymunDesc }}</p>
          <p>{{ itemInfo.item.short_desc| truncate(100) }}</p>
          <h3 class="text-lg-center red--text">{{ itemInfo.item.amount|currency('₱ ') }}</h3>
        </v-card-text>
      </v-card>
    </v-flex>
   
    
</template>

<script>
  export default {
    props: ['itemInfo', 'index'],
    data: () => ({
      show: false,
      cardME: "elevation-1"
    }),
    methods: {
      slug(text){
        return this.$slug(text)
      }
    }

    
  }
</script>

<style type="text/css">
  .responsive {
    width: 100%;
    height: auto;
}
</style>