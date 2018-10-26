<template>
	<div class="text-xs-center">
		<v-dialog
		v-model="dialogSearchStore"
		width="900"
		>
		<v-btn
		slot="activator"
		color="red lighten-2"
		dark
		>
		Click Me
	</v-btn>

	<v-card>
		<v-container>
			<v-layout>
				<v-flex xs12>
					<search-store></search-store>
				</v-flex>
			</v-layout>
		</v-container>

		<v-divider></v-divider>

		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn
			color="primary"
			flat
			@click="dialogClose()"
			>
			Close
		</v-btn>
	</v-card-actions>
</v-card>
</v-dialog>
</div>
</template>
<script>
	import searchStore from '~/components/autocomplete/search-store'
	export default {
		components: { searchStore },
		computed: {
			dialogSearchStore(){
				return this.$store.getters.dialogSearchStore
			}
		},
		methods: {
			dialogClose(){
				this.$store.dispatch('dialogSearchStore', false)
			}
		}
	}
</script>