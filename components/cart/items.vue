<template>
  <span class="text-xs-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      offset-x
    >
    

      <v-btn
        icon
        slot="activator"
        dark
      >
      <v-badge :color="'success'" left v-if="totalQuantity != null">
        <span slot="badge">{{ totalQuantity }}</span>
      </v-badge>

        <v-icon>shopping_cart</v-icon>
      </v-btn>

      <v-card>
        <v-list >
            <cart-table @closeCartMenu="closeCartMenu"></cart-table>
        </v-list>

      </v-card>
    </v-menu>
  </span>
</template>

<script>
  import cartTable from '~/components/cart/cartTable'
  export default {
    data: () => ({
      fav: true,
      menu: false,
      message: false,
      hints: true
    }),
    components: { cartTable },
    
    computed: {
      cart(){
        return this.$store.getters.cart
      },
      totalQuantity(){
        var x = this.cart.map(function(item){
          return item.quantity
        })
        if(x.length > 0){
          return x.reduce((a, b)=> a + b)
        }
      }
    },
    methods: {
      closeCartMenu(){
        this.menu = false
      }
    }
  }
</script>