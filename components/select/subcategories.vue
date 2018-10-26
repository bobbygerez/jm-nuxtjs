<template>
	<v-select
	:items="subcategories"
	v-model="selectedSubcategory"
	label="Select Subcategory"
	item-text="name"
	item-value="id"
	attach
	chips
	clearable
	>
</v-select>
</template>
<script type="text/javascript">
	
	import axios from 'axios'

	export default {
		computed: {
			selectedSubcategory: {
				get(){
					return this.$store.getters.selectedSubcategory
				},
				set(val){
					this.$store.dispatch('selectedSubcategory', val)
				}
			},
			subcategories: {
				get(){
					return this.$store.getters.subcategories
				}
			}  
		},
		watch: {

			selectedSubcategory(val){
				 let data = this
				 axios.get(process.env.baseApi + '/get-further-category/' + val)
		            .then(function(res){
		              data.$store.dispatch('furtherCategories', res.data.furtherCategories)
		            })
			}
		}
	}
</script>