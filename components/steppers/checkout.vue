<template>
  <v-stepper v-model="stepper">
    <v-stepper-header>
      <v-stepper-step :complete="stepper > 1" step="1">Login</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="stepper > 2" step="2">Receiver's Informations</v-stepper-step>

      <v-divider></v-divider>
      <v-stepper-step :complete="stepper > 3" step="3">Receiver's Map</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="stepper > 4" step="4">Item's Review</v-stepper-step>
       <v-divider></v-divider>
       <v-stepper-step step="5">Payments</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">

        <v-alert
          :value="true"
          color="error"
          icon="warning"
          outline
        >
          Please login to continue...
        </v-alert>
      </v-stepper-content>

      <v-stepper-content step="2">
       <v-form v-model="validStep" ref="stepper" lazy-validation>
        <v-card
          flat
        >
          <h3 class="title">Receiver's Informations</h3>
          <br />
          <v-text-field
            v-model="receiverFirstname"
            :rules="[() => !!receiverFirstname || 'Firstname is required']"
            label="Firstname"
            placeholder="Firstname"
            required
          ></v-text-field>
          <v-text-field
            v-model="receiverLastname"
            :rules="[() => !!receiverLastname || 'lastname is required']"
            label="Lastname"
            placeholder="Lastname"
            required
          ></v-text-field>
          <v-text-field
            v-model="contactNumber"
            :rules="[() => !!contactNumber || 'Contact Number is required']"
            :mask="'(####) ### - ####'"
            label="Phone Number"
            placeholder="Phone number"
            required
          ></v-text-field>
          <v-combobox
          v-model="selectedProvince"
          :items="provinces"
          :rules="[() => !!selectedProvince || 'Province is required']"
          item-text="provDesc"
          item-value="provCode"
          label="Province"
        ></v-combobox>
        <v-combobox
          v-model="selectedCity"
          :items="cities"
          :rules="[() => !!selectedCity || 'City is required']"
          item-text="citymunDesc"
          item-value="citymunCode"
          label="City"
        ></v-combobox>
          <v-combobox
          v-model="selecteBrgy"
          :items="brgys"
          :rules="[() => !!selecteBrgy || 'Barangay is required']"
          item-text="brgyDesc"
          item-value="brgyCode"
          label="Barangay"
        ></v-combobox>
        <v-textarea
          box
          v-model="streetNo"
          label="Lot No., Street"
          :rules="[() => !!streetNo || 'Street is required']"
        ></v-textarea>
        </v-card>

        <v-btn
          color="primary"
          @click="checkRequired(3)"
        >
          Continue
        </v-btn>

       </v-form>
       
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-5"
          flat
          height="500px"
        >

        <GmapMap
        :center="{lat:12.879721, lng:121.774017}"
        :zoom="7"
        map-type-id="terrain"
        style="width: 100%; height: 500px"
      >
        <GmapMarker
          :position="markersPosition"
          :clickable="true"
          :draggable="true"
          @dragend="dragend($event.latLng)"
          @click="infoWindow.open=true"
        />
        <gmap-info-window
          :position="markersPosition"
          :opened="infoWindow.open"
          @closeclick="infoWindow.open=false">

          <div>
              <p>
                <strong>{{ receiverFirstname }} {{ receiverLastname }}</strong>
                <br />
                <span>{{ contactNumber }} </span>

              </p>
          </div>
          <div><strong>{{receiverFirstname}} {{ receiverLastname}}</strong> <br />
          <span>{{contactNumber}}</span><br />
          <span>{{ textBrgy }}</span><br />
          <span>{{ textCity }}, {{ textProvince}} </span>

          </div>
      </gmap-info-window>
      </GmapMap>

        </v-card>

        <v-btn
          color="primary"
          @click="changeStepper(4)"
        >
          Continue
        </v-btn >

        <v-btn flat @click="changeStepper(2)">Back</v-btn>
      </v-stepper-content>
      <v-stepper-content step="4">
        <v-card
          class="mb-1"
          flat
        >
          
           <v-data-table
              v-bind:headers="checkOutHeaders"
              :items="cart"
              hide-actions
              flat
              >
              <template slot="items" slot-scope="props">
                <td class="text-xs-left">
                  <v-avatar
                  class="grey lighten-4 ma-1"
                  :size="'70px'"
                  :tile="true"
                  >

                  <img :src="props.item.item.item.images[0].path" alt="avatar">
                </v-avatar>
                <div >
                  <span  v-for="(color, key) in props.item.item.colors" v-if="color.id === props.item.colorId">
                    {{ color.name}} 
                  </span>
                  <!-- <span v-for="(size, key) in props.item.item.sizes" v-if="size.id === props.item.sizeId">
                    {{ ' - ' + size.name}} 
                  </span> -->
                </div>
              </td>

              <td>{{ props.item.quantity }}</td>
              <td>{{ props.item.item.item.amount|currency('₱ ') }}</td>
              <td>
                <v-btn icon small class="orange--text mt-3" @click.native="remove(props.index)">
                  <v-icon dark>remove_circle</v-icon>
                </v-btn>
              </td>
            </template>
           <template slot="footer">
            <td>
              &nbsp;
            </td>
            <td class="subheading">
              TOTAL: 
            </td>
            <td class="py-3 subheading">
              {{ cartTotal|currency('₱ ') }}
            </td>
            <td>
              &nbsp;
            </td>
          </template>
          </v-data-table>

        </v-card>

        <v-btn color="primary" @click="changeStepper(5)" >Continue</v-btn>
        <v-btn flat @click="changeStepper(3)">Back</v-btn>
        
      </v-stepper-content>
      <v-stepper-content step="5">
       <v-form v-model="validPayModel" ref="validPay" lazy-validation>
        <v-card
          class="mb-1"
          flat
        >
        <h3 class="title">Billing Information</h3>
        <v-switch
            class="ma-1"
            label="Same as delivery information"
            v-model="switch1"
          ></v-switch>
        </v-container>

        <span v-if="switch1==false">

        <v-combobox
          v-model="selectedCountry"
          :items="countries"
          :rules="[() => !!selectedCountry || 'Province is required']"
          item-text="name"
          item-value="iso"
          label="Country"
        ></v-combobox>

        <v-text-field
            v-model="payerFirstname"
            :rules="[() => !!payerFirstname || 'Firstname is required']"
            label="Firstname"
            placeholder="Enter Firstname"
            required
          ></v-text-field>
          <v-text-field
            v-model="payerLastname"
            :rules="[() => !!payerLastname || 'Lastname is required']"
            label="Lastname"
            placeholder="Enter Lastname"
            required
          ></v-text-field>
          <v-text-field
            v-model="payerContactNum"
            :rules="[() => !!payerContactNum || 'Contact Number is required']"
            :mask="'(###) ### - #######'"
            label="Contact Number"
            placeholder="Payer's Phone number"
            required
          ></v-text-field>
        </span>
        <v-combobox

          v-model="selectedCountry"
          :items="countries"
          :rules="[() => !!selectedCountry || 'Province is required']"
          item-text="name"
          item-value="sortName"
          label="Country"
        ></v-combobox>
        <v-combobox
          v-model="paymentProvince"
          :items="paymentProvinces"
          :rules="[() => !!paymentProvince || 'Province is required']"
          item-text="name"
          item-value="id"
          label="State/Province"
        ></v-combobox>
        <v-combobox
          v-model="paymentCity"
          :items="paymentCities"
          :rules="[() => !!paymentCity || 'Province is required']"
          item-text="name"
          item-value="id"
          label="City"
        ></v-combobox>
        <v-text-field
            v-model="postalCode"
            :rules="[() => !!postalCode || 'Contact Number is required']"
            label="Postal Code"
            placeholder="Enter Postal code"
            required
          ></v-text-field>
          <v-textarea
          box
          v-model="paymentStreet"
          label="Lot No., Street"
          :rules="[() => !!paymentStreet || 'Street is required']"
        ></v-textarea>
        <v-combobox
          v-model="selectedCreditCard"
          :items="creditCardType"
          label="Credit Card type"
          chips
          deletable-chips
        ></v-combobox>  
          <v-text-field 
          :mask="'credit-card'" 
          v-model="creditCardNumber"  
          label="Card Number" 
          :rules="[() => !!creditCardNumber || 'Card Number is required']"></v-text-field>
        
          <v-layout row wrap>
            <v-flex xs12 sm6 md3 class="ml-1">
              <v-combobox
                v-model="selectedExpirationMonth"
                :items="expiryMonth"
                label="Select Expiration Month"
                chips
                deletable-chips
              ></v-combobox> 
            </v-flex>

            <v-flex xs12 sm6 md3 class="ml-1">
              <v-combobox
                v-model="selectedExpirationYear"
                :items="expiryYear"
                label="Select Expiration Year"
                chips
                deletable-chips
              ></v-combobox> 
            </v-flex>
          </v-layout>
          

        </v-card>
        
        <a href="#">
          <img :src="paypalImg" width="200" @click="payNow()" >
        </a>
        <div style="float: left">
        <v-btn color="primary" @click="changeStepper(4)" >Back</v-btn>
        </div>
        
        </v-form>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
  import axios from 'axios'
  import vue2GoogleMaps from '~/components/google-maps/vue2-google-maps'
  export default {
    middleware: ['auth'],
    data () {
      return {
         checkOutHeaders: [
      {
        text: 'Image',
        align: 'left',
        sortable: false,
        value: 'img'
      },
      { 
        text: 'Qty', 
        value: 'qty',
        align: 'left',
        sortable: false,
      },
      { 
        text: 'Price', 
        value: 'price',
        align: 'left',
        sortable: false, 
      },
      { 
        text: 'Color', 
        value: 'color',
        align: 'left',
        sortable: false, 
      },
      { 
        text: 'Size', 
        value: 'size',
        align: 'left',
        sortable: false, 
      },
      { 
        text: 'Remove', 
        value: 'remove',
        align: 'left',
        sortable: false, 
      }
      ],
        paymentStreet: '',
        postalCode: '',
        payerContactNum: '',
        paymentCity:'',
        paymentCities:[],
        paymentProvince:'',
        paymentProvinces: [],

        countries: [],
        selectedCountry: '',
        switch1: false,
        validPayModel: false,
        cvv: '',
        payerLastname: '',
        payerFirstname: '',
        selectedExpirationMonth:'',
        selectedExpirationYear: '',
        expiryYear: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        expiryMonth: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        creditCardNumber: '',
        selectedCreditCard: '',
        creditCardType: ['Visa', 'Mastercard', 'American Express', 'Discover'],
        paypalImg: '',
        cvvImg: '',
        validStep: false,
        infoWindow: {
          open: false,
        },
        markers: [{
            position: {lat: 12.879721, lng: 121.774017}
          }],
        markersPosition: {lat: 12.879721, lng: 121.774017},
        streetNo: '',
        selecteBrgy: '',
        selectedCity: '',
        selectedProvince: '',
        textProvince: '',
        textCity: '',
        textBrgy: '',
        receiverFirstname: '',
        receiverLastname: '',
        contactNumber: '',
        emailLogin: '',
        passwordLogin: '',
        pass1: false,
        valid: false,
        alertText: '',
        alertLogin: false,
         passwordRules: [
          (v) => !!v || 'Password is required',
          (v) => v.length >= 8 || 'Password must be at least 8 characters'
          ],
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
          ],
      }
    },
    created(){
      this.getProvince()
      this.getCountries()
       this.paypalImg = process.env.basePublic + '/images/paypal.png'
       this.cvvImg = process.env.basePublic + '/images/cvv.jpg'
    },
    components: {
      vue2GoogleMaps
    },
    computed: {
      cartTotal(){
        var x = this.cart.map(function(item){
          return item.quantity * parseFloat(item.item.item.amount)
        })
        if(x.length > 0){
          return x.reduce((a, b)=> a + b)
        }
      },
      cart(){
        return this.$store.getters.cart
      },
      
      merhcantInfo(){
            return "<div>Delivery Information</div>"
      },
      userLogin(){
        return this.$store.getters.userLogin
      },
      stepper: {
        get(){
          return this.$store.getters.stepper
        },
        set(val){
          this.$store.dispatch('stepper', val);
        }
        
      },
      provinces(){
        return this.$store.getters.provinces
      },
      cities(){
        return this.$store.getters.cities
      },
      brgys(){
        return this.$store.getters.brgys
      }
    },
    methods: {
      remove(key){
        this.$store.dispatch('removeCart', key);
      },
      checkRequired(stepper){
        if(this.$refs.stepper.validate()){
          this.changeStepper(stepper)
        }
      },
      gmapMakerClick(){
        this.infoWinOpen = true
      },
      dragend(latLng){
        this.markersPosition = { lat: latLng.lat(), lng: latLng.lng() };
      },
      changeStepper(val){
        this.$store.dispatch('stepper', val);
      },
      getProvince(){
        let data = this
        axios.get( process.env.baseApi + '/get-provinces')
            .then(res => {
                data.$store.dispatch('provinces', res.data.provinces);
              })
      },
      getCountries(){
        let data = this
        axios.get( process.env.baseApi + '/get-countries')
            .then(res => {
                data.countries = res.data.countries
              })
      },
      payNow(){
         let data = this
         if(this.$refs.validPay.validate()){
           data.$store.dispatch('loader', true);
           data.$store.dispatch('loginLoader', 'Processing Payment...');
         axios.post( process.env.baseApi + '/pay-with-credit-card', {
              firstname: this.payerFirstname,
              lastname: this.payerLastname,
              contactNum: this.payerContactNum,
              country: this.selectedCountry,
              province: this.paymentProvince,
              city: this.paymentCity,
              postalCode: this.postalCode,
              creditCard: this.creditCardNumber,
              cardType: this.selectedCreditCard,
              expiryMonth: this.selectedExpirationMonth,
              expiryYear: this.selectedExpirationYear,
              cvv: this.cvv,
              deliver: {
                  firstname: this.receiverFirstname,
                  lastname: this.receiverLastname 
              }

           })
            .then(function(res){
                data.$store.dispatch('loader', false);

                window.location.href = res.data.approval_url;
            })
            .catch(function(err){
              data.$store.dispatch('snackbar', true);
                data.$store.dispatch('snackbarText', 'Payment Successful. Please check your email.');
                data.$store.dispatch('snackbarColor', 'success');
                window.open('www.yahoo.com')

            })

                

              
            

        }

        
       
      },
      approval(url){
        window.open(url);
      }
    },
    watch: {
      paymentProvince(val){
        let data = this
        if (val != null) {
          axios.get( process.env.baseApi + '/get-payment-cities/' + val.id)
            .then(res => {
                 data.paymentCities = res.data.cities
              })
        }
        
      },
      selectedCountry(val){
        let data = this
        if (val != null) {
          axios.get( process.env.baseApi + '/get-payment-province/' + val.id)
            .then(res => {
                 this.paymentProvinces = res.data.states
              })
        }
        
      },
      selectedProvince(val){
        console.log(this.selectedProvince)
        let data = this
        if (val != null) {
          axios.get( process.env.baseApi + '/get-cities/' + val.provCode)
            .then(res => {
                data.$store.dispatch('cities', res.data.cities);
                data.textProvince = res.data.province;
              })
        }
        
      },
      selectedCity(val){
         let data = this
         if (val != null) {
          axios.get( process.env.baseApi + '/get-brgys/' + val.citymunCode)
            .then(res => {
                data.$store.dispatch('brgys', res.data.brgys);
                data.textCity = res.data.city;
              })
        }
        
      },
      selecteBrgy(val){
        let data = this
        if (val != null) {
          axios.get( process.env.baseApi + '/get-selected-brgy/' + val.brgyCode)
            .then(res => {
               data.textBrgy = res.data.brgy;
              })
        }
      }
    }
  }
</script>