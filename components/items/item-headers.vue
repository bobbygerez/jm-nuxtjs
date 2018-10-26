<template>
  <v-layout >
        
        <v-flex xs12 sm12 md12 lg12 xl12 class="text-xs-center " >
        <span class="subheading">Displaying 
        <span class="gray--text">{{ itemInfo.from }}</span > to <span class="gray--text">{{ itemInfo.to }}</span > out of 
        <span class="gray--text">{{ itemInfo.total }} </span> <strong>{{ suffix }} </strong>
        </span>

        
        <v-btn icon @click="showStoreLocation" class="green--text" >
              <v-icon>place</v-icon> 
            </v-btn>
            <v-chip
              v-model="provDesc"
              close
             
            ><span>{{ selectedProvince.provDesc }}</span></v-chip>
            <v-chip
              v-model="citymunDesc"
              close
            ><span>{{ selectedCity.citymunDesc }}</span></v-chip>
        
            
        </v-flex>
        <!-- <v-combobox
          v-model="selectedProvince"
          prepend-icon="place"
          :items="provinces"
          item-text="provDesc"
          item-value="provCode"
          label="Select Province"
          chips
          deletable-chips
        ></v-combobox> -->
        <!-- <v-flex xs12 sm12 md2 lg2 xl2>
          <v-select
                max-height="100"
                label="Items per page"
                persistent-hint
                :items="perPage"
                v-model="selectedPage"
              ></v-select>
          
        </v-flex> -->
  </v-layout>
</template>
<script type="text/javascript">
  
  export default {
    
    props: ['suffix'],
    middleware: ['provinces'],
    computed: {
      citymunDesc: {
        get(){
          if (this.selectedCity.citymunDesc != '') {
            return true
          }else{
            return false
          }
        },
        set(val){
          this.$store.dispatch('selectedCity',{
            citymunDesc: '',
            id: ''
          })
        }
        
      },
      provDesc: {
        get(){
          if (this.selectedProvince.provDesc != '') {
            return true
          }else{
            return false
          }
        },
        set(val){
          this.$store.dispatch('selectedProvince',{
            provDesc: '',
            id: ''
          })
        }
        
      },
      selectedProvince: {
        get(){
          return this.$store.getters.selectedProvince
        }
        
      },
      selectedCity: {
        get(){
          return this.$store.getters.selectedCity
        }
        
      },
      provinces(){
        return this.$store.getters.provinces
      },
      itemInfo(){
        return this.$store.getters.itemInfo
      },
      perPage(){
        return this.$store.getters.perPage
      },
      selectedPage: {
        get(){
          return this.$store.getters.selectedPage
        },
        set(val){
          this.$store.dispatch('selectedPage',val)
        }
        
      }
    },
    methods: {
      showStoreLocation(){
        this.$store.dispatch('storeLocation', true);
      }
    }
  }
</script>