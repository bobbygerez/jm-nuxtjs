<template>
	<v-select
	:items="branches"
	v-model="selectedBranches"
	label="Select Branch"
	item-text="name"
	item-value="id"
	attach
	chips
	clearable
	>

</v-select>
</template>
<script type="text/javascript">
	
	export default {

		computed: {

			selectedBranches: {
			        get(){
			          return this.$store.getters.selectedBranches
			        },
			        set(val){
			          this.$store.dispatch('selectedBranches', val)
			        }
			      },
			      branches: {
			        get(){
			          return this.$store.getters.branches
			        },
			        set(val){

			        }
			}  
		}
	}
</script>