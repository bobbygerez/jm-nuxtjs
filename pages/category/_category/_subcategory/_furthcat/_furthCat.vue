<template>
  <span>
      <item-headers v-bind:suffix="furtherCategoryName"/>
      <v-divider></v-divider>
      <v-layout wrap class="ma-0 pa-0" justify-center align-center>
           <items v-bind:itemInfo="x" v-bind:index="i" v-for="(x, i) in itemInfo.data" :key="i"></items>
      </v-layout>
      <v-layout>
        <v-flex>
          <div class="text-xs-center pt-2">
          <v-pagination v-model="page" :length="itemInfo.last_page" total-visible="9"></v-pagination>
          </div>
        </v-flex>
      </v-layout>
  </span>
</template>

<script type="text/javascript">
	import axios from 'axios'
	import items from '~/components/items/item'
  	import itemHeaders from '~/components/items/item-headers'
	export default {

		middleware: 'further-cat',
		components: {
			items, itemHeaders
		},
		computed: {

			itemInfo(){
				return this.$store.getters.itemInfo
			},
			page: {
				get(){
					return this.$store.getters.page
				},
				set(val){
					this.$store.dispatch('page', val)
				}
				
			},
			furtherCategoryName(){
				return this.$store.getters.furtherCategoryName
			}

		},
		watch: {

			page(val){
				axios.get( process.env.baseApi + '/get-items/subcategory/furtherCategory/' + this.$route.params.furthCat + '?furthCat=' + this.$route.params.furthCat + '&page=' + val + '&perPage=' + this.$store.getters.selectedPage)
		        .then(res => {
		             this.$store.commit('itemInfo', res.data.itemInfo)
		             this.$store.commit('subcategoryName', res.data.subcategoryName)
		          })
			}
		}
	}
</script>