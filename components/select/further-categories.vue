<template>
	<v-select
	:items="furtherCategories"
	v-model="selectedFurtherCategory"
	label="Select Further Category"
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
			selectedFurtherCategory: {
				get(){
					return this.$store.getters.selectedFurtherCategory
				},
				set(val){
					this.$store.dispatch('selectedFurtherCategory', val)
				}
			},
			furtherCategories: {
				get(){
					return this.$store.getters.furtherCategories
				}
			}  
		}
	}
</script>