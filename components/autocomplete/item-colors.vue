<template>
	<v-flex xs12>
            <v-autocomplete
              v-model="selectedItemColors"
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

    props: ['colors'],
    data () {
      let srcs = {
        
      }

      return {
        isUpdating: false,
        name: 'Midnight Crew',
        people: [
        
        ],
        title: 'The summer breeze'
      }
    },
    computed: {
      
    	selectedItemColors: {
    		get(){
    			return _.values(this.$store.getters.selectedItemColors)
    		},
    		set(val){
    			this.$store.dispatch('selectedItemColors', val)
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
        const index = this.selectedItemColors.indexOf(item.id)
        if (index >= 0) this.selectedItemColors.splice(index, 1)
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