<template>
	<v-flex xs12>
            <v-autocomplete
              v-model="selectedColorsProduct"
              :disabled="isUpdating"
              :items="colors"
              chips
              label="Colors"
              item-text="name"
              item-value="id"
              multiple
              clearable
            >
              <template
                slot="selection"
                slot-scope="data"
              >
                <v-chip
                  :selected="data.selected"
                  close
                  class="chip--select-multi"
                  @input="remove(data.item)"
                >
                  <v-avatar>
                    <img :src="toArray(data.item.images)">
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template
                slot="item"
                slot-scope="data"
              >
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-avatar>
                    <img :src="toArray(data.item.images)">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                    <!-- <v-list-tile-sub-title v-html="data.item.images[0].path"></v-list-tile-sub-title> -->
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </v-flex>
</template>
<script>
import _ from 'lodash'
  export default {
    data () {
      let srcs = {
        1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'
      }

      return {
        autoUpdate: true,
        isUpdating: false,
        name: 'Midnight Crew',
        people: [
          { header: 'Group 1' },
          { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
          { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
          { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
          { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
          { divider: true },
          { header: 'Group 2' },
          { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
          { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
          { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
          { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] }
        ],
        title: 'The summer breeze'
      }
    },
    computed: {
    	colors(){

    		return this.$store.getters.colors
    	},
      
    	selectedColorsProduct: {
    		get(){
    			return _.values(this.$store.getters.selectedColorsProduct)
    		},
    		set(val){
    			this.$store.dispatch('selectedColorsProduct', val)
    		}
    	}
    },

    watch: {
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      }
    },

    methods: {
      remove (item) {
        const index = this.selectedColorsProduct.indexOf(item.id)
        if (index >= 0) this.selectedColorsProduct.splice(index, 1)
      },
  	  toArray(val){
  	  	let lastIndex = val.length - 1
  	  	if (_.values(val)[lastIndex] != undefined){
  	  		return _.values(val)[lastIndex].path
  	  	}
  	  }
    }
  }
</script>