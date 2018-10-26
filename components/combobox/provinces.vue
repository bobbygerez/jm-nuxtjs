<template>
	<v-select
	:items="provinces"
	v-model="selectedProvinceProduct"
	item-text="provDesc"
	item-value="provCode"
	label="Province"
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
			provinces: {
				get(){
					return this.$store.getters.provinces
				},
				set(val){

				}
			},
			selectedProvinceProduct:{
				get(){
					return this.$store.getters.selectedProvinceProduct
				},
				set(val) {
					this.$store.dispatch('selectedProvinceProduct', val)
				}
			}
		},
		watch: {

			selectedProvinceProduct(val){

				let data = this

				axios.get( process.env.baseApi + '/get-cities/' + val)
				      .then(res => {
				        data.$store.dispatch('cities', res.data.cities);
				        data.$store.dispatch('selectedCitiesProduct', []);
				      })
			}
		}

	}
</script>