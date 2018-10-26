<template>
  <span >
      <v-layout wrap class="elevation-1">
      	<v-flex xs12 sm12 md4 lg4 xl4 justify-center align-center>
      		<v-card flat>
		        <v-card-title>
		             <carousel-component v-for="img in item.item.images" :key="item.id">
    					    <carousel-item>
    					      <article class="demo-area ">
    							  <img class="demo-trigger" :src="img.path + '?w=200&ch=DPR&dpr=2&border=1,ddd'" :data-zoom="img.path + '?w=1000&ch=DPR&dpr=2'" >
    							</article>
    					    </carousel-item>
    					  </carousel-component>
		        </v-card-title>
		        <v-card-actions>
		          <v-btn color="orange darken-3 white--text">Share</v-btn>
		          <v-btn color="orange darken-3 white--text" @click="addCart">Add to Cart</v-btn>
		        </v-card-actions>
		      </v-card>
      	</v-flex>
      	<v-flex xs12 sm12 md8 lg8 xl8>
      		<div class="detail">
				   <section>
				      <h1 class="display-1 mt-4 mb-2"> {{ item.item.name }}</h1>
				      <span><star-rating v-model="rating" read-only :star-size="30" :show-rating="false"></star-rating> </span> 
				      <p>{{ item.short_desc }}</p>
				      <v-divider></v-divider>
				       <h2 class=" title pa-3">
				       <span class="red--text">{{ item.item.amount|currency('₱ ') }}</span> <br /><span class="grey--text body-2" style="text-decoration: line-through">{{ item.item.amount|currency('₱ ') }} </span> <span class="black--text body-2 ml-1"> -44% </span></h2>
				       <v-divider></v-divider>
               <br />
               <p>Quantity <cart-quantity></cart-quantity></p>
               <!-- <p>Select Color <br />
               <span v-for="(color, x) in item.colors" :key="x">
                 <span v-for="(img,i) in color.images" :key="i">
                    <img :src="img.path" class="ma-1 hoverCursor" 
                    @click="selectedImage($event,img.id)">
                 </span>
               </span></p>
                -->
                <div><span><item-colors v-bind:colors="item.colors"></item-colors></span></div>
				       
				    </section>
			</div>
      	</v-flex>


      </v-layout>
      <v-divider></v-divider>
      <v-layout wrap class="ma-2">
        <v-flex xs12 sm12 md12 lg12 xl12 justify-center align-center>
          Specifically designed to protect your phone from drops, shocks,scrapes, scratches, dust and debris without adding bulk
Made with dual-materials (durable 1.5mm hard plastic back-plateand flexible TPU edges and corners) that protect the back and allsides of your device from everyday use
        </v-flex>
      </v-layout>
  </span>
</template>

<script type="text/javascript">
import Vue from 'vue'
import cartQuantity from '~/components/cart/qty'
import itemColors from '~/components/autocomplete/item-colors'
import _ from 'lodash'
  export default{
    head () {
    return {
      script: [
        { src: '/js/drift-min.js' }
      ],
    } 
  },
  	data () {
    return {
     	rating: 4,
      isActive: true,
      colorIds: [],
    }
  },
    middleware: 'item',
    mounted(){
    	var demoTrigger = document.querySelectorAll('.demo-trigger');
  		var paneContainer = document.querySelector('.detail');

      	for (var i = 0, len = demoTrigger.length; i < len; i++) {

  		      	new Drift(demoTrigger[i], {
      				  paneContainer: paneContainer,
      				  inlinePane: false
      				});
  			}
		
    },
    components:{cartQuantity, itemColors},
    computed: {
    	item(){
    		return this.$store.getters.item
    	},
      cartQuantity(){
        return this.$store.getters.cartQuantity
      },
      selectedItemColors(){
        return this.$store.getters.selectedItemColors
      }
    },
    methods: {
      addCart(){
          this.$store.dispatch('cart', {
            color: this.selectedItemColors,
            quantity: this.cartQuantity,
            item: this.item
          })
      this.$store.dispatch('snackbarColor', 'success')
      this.$store.dispatch('snackbarText', 'Item successfully added!')
      this.$store.dispatch('snackbar', true)
      }
     
    }
  }
</script>

<style type="text/css">
.hoverCursor{
  cursor: pointer;
}
.selectedImg{
  border: 2px solid gray;
}
	.demo-area{
  background:$color_invert_fg;
  border-radius:8px;
  display: inline;
  padding:10px;
  

}

.demo-trigger {
  display: inline-block;
  width: 100%;
  float: left;
}

.detail {
  position: relative;
  width: 100%;
  float: left;
  background: white;
  button{
    vertical-align:middle;
    opacity:.5;
    cursor:unset;
    background:$color_invert_chrome_tint;
    margin-left:1em;
  }
}


@media (max-width: 610px) {

  .detail, .demo-trigger {
    float: none;
  }

  .demo-trigger {
    display:block;
    width: 50%;
    max-width:200px;
    margin: 0 auto;
  }

  .detail {
    margin: 0;
    width: auto;
  }

  p {
    margin: 0 auto 1em;
  }

  .responsive-hint {
    display: none;
  }
  h3 {
    margin-top:20px;
  }
}


/*Carousel */
.carousel-component {
  position: relative;
  overflow: hidden;
}

.carousel-page {
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: 0.5s;
  padding: 10px;

  h2 {
    margin: 0;
  }

  img {
    width: 300px;
  }
}

.carousel-page.active {
  visibility: visible;
  position: static;
}

.carousel-nav-prev,
.carousel-nav-next {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  display: block;
  width: 50px;
  height: 50px;
  border: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #FFF;
  cursor: pointer;
}

.carousel-nav-prev {
  left: 5px;
}

.carousel-nav-next {
  right: 5px;
}

</style>