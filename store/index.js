import Vuex from 'vuex'
import _ from 'lodash'
const createStore = () => {
  return new Vuex.Store({
    
    state: {
      selectedStorePlace: '',
      storesPlaces: [],
      dialogSearchStore: false,
      productVisible: true,
      selectedItemColors: [],
      itemColors: [],
      productDiscount: 0,
      productLongDesc: '',
      productShortDesc: '',
      productSKU: '',
      productName: '',
      productPrice: 0,
      productQuantity: 0,
      newProductDialog: true,
      selectedUnitProduct: '',
      units: [],
      selectedProductStatus: true,
      selectedSizesProduct: [],
      sizes: [],
      selectedCategory: '',
      selectedSubcategory: '',
      selectedFurtherCategory: '',
      selectedColorsProduct:[],
      selectedBrgysProduct: [],
      selectedCitiesProduct: [],
      selectedProvinceProduct: '',
      selectedBranches:'',
      branches:[],
      selectedStore: '',
      stores: [],
      storeId: '',
      newProduct: {
        status: '',
        name: '',
        short_desc: '',
        amount: ''
      },
      products: [],
      newFurtherCat: {
        subcategory_id: null,
        name: '',
        subcategories: {
          category_id: null
        }
      },
      editFurtherCat:{
        subcategory_id: null,
        name: '',
        subcategories: {
          category_id: null
        }
      },
      furtherCategories: [],
      newSubcategory: {
        category_id: null,
        name: '',
        desc: ''
      },
      editSubcategory: {
        category_id: null,
        name: ''
      },
      subcategories:[],
      edittCategory: [],
      editCategories: [],
      confirmDeleteDialog: false,
      users: [],
      roles: [],
      role: '',
      dashboard: false,
      storeLocation: false,
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
        text: 'Remove', 
        value: 'remove',
        align: 'left',
        sortable: false, 
      }
      ],
      selectedProvince: {
        id: '',
        provDesc: '',
        id: ''
      },
      selectedCity: {
        id: '',
        citymunDesc: '',
        id: ''
      },
      brgys: [],
      cities: [],
      provinces: [],
      cities: [],
      brgys: [],
      stepper: 0,
      colorIds:[],
      colors: [],
      cart: [],
      cartQuantity: 0,
      item: {},
      firstname: '',
      middlename: '',
      lastname: '',
      email: '',
      company: '',
      jobTitle: '',
      phone: '',
      furtherCategoryName: '',
      subcategoryName: '',
      categoryName: '',
      token: null,
      user: {
        menu: {}
      },
      userLogin: false,
      userReg: false,
      loginDialog: false,
      snackbarColor: 'success',
      snackbarText: '',
      snackbar: false,
      loginLoader: '',
      loader: false,
      perPage: [12, 16, 20, 24, 28],
      selectedPage: 20,
      page: 1,
      itemInfo: [],
      categories: []
    },
    mutations: {
      selectedStorePlace(state, payload){
        state.selectedStorePlace = payload
      },
      storesPlaces(state, payload){
        state.storesPlaces = payload
      },
      dialogSearchStore(state, payload){
        state.dialogSearchStore = payload
      },
      selectedItemColors(state, payload){
        state.selectedItemColors = payload
      },
      itemColors(state, payload){
        state.itemColors = payload
      },
      selectedFurtherCategory(state, payload){
        state.selectedFurtherCategory = payload
      },
      selectedSubcategory(state, payload){
        state.selectedSubcategory = payload
      },
      selectedCategory(state, payload){
        state.selectedCategory = payload
      },
      productDiscount(state, payload){
        state.productDiscount = payload
      },
      selectedProductStatus(state, payload){
        state.selectedProductStatus = payload
      },
      productLongDesc(state, payload){
        state.productLongDesc = payload
      },
      productShortDesc(state, payload){
        state.productShortDesc = payload
      },
      productSKU(state, payload){
        state.productSKU = payload
      },
      productQuantity(state, payload){
        state.productQuantity = payload
      },
      productPrice(state, payload){
        state.productPrice = payload
      },
      productName(state, payload){
        state.productName = payload
      },
      newProductDialog(state, payload){
        state.newProductDialog = payload
      },
      selectedUnitProduct(state, payload){
        state.selectedUnitProduct = payload
      },
      units(state, payload){
        state.units = payload
      },
      selectedSizesProduct(state, payload){
        state.selectedSizesProduct = payload
      },
      sizes(state, payload){
        state.sizes = payload
      },
      colors(state, payload){
        state.colors = payload
      },
      selectedColorsProduct(state, payload){
        state.selectedColorsProduct = payload
      },
      selectedBrgysProduct(state, payload){
        state.selectedBrgysProduct = payload
      },
      selectedCitiesProduct(state, payload){
        state.selectedCitiesProduct = payload
      },
      selectedProvinceProduct(state, payload){
        state.selectedProvinceProduct = payload
      },
      selectedBranches(state, payload){
        state.selectedBranches = payload
      },
      branches(state, payload){
        state.branches = payload
      },
      selectedStore(state, payload){
        state.selectedStore = payload
      },
      stores(state, payload){
        state.stores = payload
      },
      storeId(state, payload){
        state.storeId = payload
      },
      newProductField(state, payload){
         state.newProduct[payload['field']] = payload['value']
      },
      newProduct(state, payload){
        state.newProduct = payload
      },
      products(state, payload){
        state.products = payload
      },
      editCategories(state, payload){
        state.editCategories = payload
      },
      editFurtherCatFieldSub(state, payload){
         state.editFurtherCat['subcategories']['category_id'] = payload
      },
      editFurtherCatField(state, payload){
         state.editFurtherCat[payload['field']] = payload['value']
      },
      editFurtherCat(state, payload){
        state.editFurtherCat = payload
      },
      newFurtherCatField(state, payload){
         state.newFurtherCat[payload['field']] = payload['value']
      },
      newFurtherCatFieldSub(state, payload){
         state.newFurtherCat['subcategories']['category_id'] = payload
      },
      newFurtherCat(state, payload){
        state.newFurtherCat = payload
      },
      furtherCategories(state, payload){
        state.furtherCategories = payload
      },
      newSubcategory(state, payload){
        state.newSubcategory = payload
      },
      newSubcategoryField(state, payload){
        state.newSubcategory[payload['field']] = payload['value']
      },
      editSubcategory(state, payload){
        state.editSubcategory = payload
      },
      subcategories(state, payload){
        state.subcategories = payload
      },
      editSubcategoryField(state, payload){
        state.editSubcategory[payload['field']] = payload['value']
      },
      edittCategory(state, payload){
        state.edittCategory = payload
      },
      confirmDeleteDialog(state, payload){
        state.confirmDeleteDialog = payload
      },
      users(state, payload){
        state.users = payload
      },
      role(state, payload){
        state.role = payload
      },
      roles(state, payload){
        state.roles = payload
      },
      dashboard(state, payload){
        state.dashboard = payload
      },
      storeLocation(state, payload){
        state.storeLocation = payload
      },
      selectedCity(state, payload){
        state.selectedCity = payload
      },
      selectedProvince(state, payload){
        state.selectedProvince = payload
      },
      brgys(state, payload){
        state.brgys = payload
      },
      cities(state, payload){
        state.cities = payload
      },
      provinces(state, payload){
        state.provinces = payload
      },
      stepper(state, payload){
        state.stepper = payload
      },
      colorIds(state, payload){
        state.colorIds = payload
      },
      cart(state, payload){
        state.cart = payload
      },
      cartQuantity(state, payload){
        state.cartQuantity = payload
      },
      item(state, payload){
        state.item = payload
      },
      email(state, payload){
        state.email = payload
      },
      phone(state, payload){
        state.phone = payload
      },
      jobTitle(state, payload){
        state.jobTitle = payload
      },
      company(state, payload){
        state.company = payload
      },
      lastname(state, payload){
        state.lastname = payload
      },
      middlename(state, payload){
        state.middlename = payload
      },
      firstname(state, payload){
        state.firstname = payload
      },
      furtherCategoryName(state, payload){
        state.furtherCategoryName = payload
      },
      subcategoryName(state, payload){
        state.subcategoryName = payload
      },
      categoryName(state, payload){
        state.categoryName = payload
      },
      user(state, payload){
        state.user = payload
      },
      userLogin(state, payload){
        state.userLogin = payload
      },
      token(state, payload){
        state.token = payload
      },
      userReg(state, payload){
        state.userReg = payload
      },
      loginDialog(state, payload){
        state.loginDialog = payload
      },
      snackbarColor(state, payload){
        state.snackbarColor = payload
      },
      snackbarText(state, payload){
        state.snackbarText = payload
      },
      snackbar(state, payload){
        state.snackbar = payload
      },
      loginLoader(state, payload){
        state.loginLoader = payload
      },
      loader(state, payload){
        state.loader = payload
      },
      perPage(state, payload){
        state.perPage = payload
      },
      selectedPage(state, payload){
        state.selectedPage = payload
      },
      itemInfo(state, payload){
        state.itemInfo = payload
      },
      page(state, payload){
        state.page = payload
      },
      categories(state, payload){
        state.categories = payload
      }
    },
    actions: {
      cart(store, value){
      var cart = store.state.cart;

        if(_.isEmpty(cart)){
          store.commit('cart', [value]);
        }
        else {
          cart.push(value);
          var newCart = store.state.cart;
          store.commit('cart', newCart);
        }
              
      },
      removeCart(store, delKey){
        var cart = store.state.cart;
        delete cart[delKey]
        var cleanArray = [];
        for(var key in cart){
          if(cart[key] !== null || cart[key] !== undefined){
            cleanArray.push(cart[key])
          }
        }
        store.commit('cart', cleanArray)
      },
      selectedStorePlace(store, payload){
        store.commit('selectedStorePlace', payload)
      },
      storesPlaces(store, payload){
        store.commit('storesPlaces', payload)
      },
      dialogSearchStore(store, payload){
        store.commit('dialogSearchStore', payload)
      },
      selectedItemColors(store, payload){
        store.commit('selectedItemColors', payload)
      },
      itemColors(store, payload){
        store.commit('itemColors', payload)
      },
      selectedFurtherCategory(store, payload){
        store.commit('selectedFurtherCategory', payload)
      },
      selectedSubcategory(store, payload){
        store.commit('selectedSubcategory', payload)
      },
      selectedCategory(store, payload){
        store.commit('selectedCategory', payload)
      },
      productDiscount(store, payload){
        store.commit('productDiscount', payload)
      },
      selectedProductStatus(store, payload){
        store.commit('selectedProductStatus', payload)
      },
      productShortDesc(store, payload){
        store.commit('productShortDesc', payload)
      },
      productLongDesc(store, payload){
        store.commit('productLongDesc', payload)
      },
      productSKU(store, payload){
        store.commit('productSKU', payload)
      },
      productQuantity(store, payload){
        store.commit('productQuantity', payload)
      },
      productName(store, payload){
        store.commit('productName', payload)
      },
      productPrice(store, payload){
        store.commit('productPrice', payload)
      },
      newProductDialog(store, payload){
        store.commit('newProductDialog', payload)
      },
      selectedUnitProduct(store, payload){
        store.commit('selectedUnitProduct', payload)
      },
      units(store, payload){
        store.commit('units', payload)
      },
      selectedSizesProduct(store, payload){
        store.commit('selectedSizesProduct', payload)
      },
      sizes(store, payload){
        store.commit('sizes', payload)
      },
      colors(store, payload){
        store.commit('colors', payload)
      },
      selectedColorsProduct(store, payload){
        store.commit('selectedColorsProduct', payload)
      },
      selectedBrgysProduct(store, payload){
        store.commit('selectedBrgysProduct', payload)
      },
      selectedCitiesProduct(store, payload){
        store.commit('selectedCitiesProduct', payload)
      },
      selectedProvinceProduct(store, payload){
        store.commit('selectedProvinceProduct', payload)
      },
      selectedProvinceProduct(store, payload){
        store.commit('selectedProvinceProduct', payload)
      },
      selectedBranches(store, payload){
        store.commit('selectedBranches', payload)
      },
      branches(store, payload){
        store.commit('branches', payload)
      },
      selectedStore(store, payload){
        store.commit('selectedStore', payload)
      },
      stores(store, payload){
        store.commit('stores', payload)
      },
      storeId(store, payload){
        store.commit('storeId', payload)
      },
      newProductField(store, payload){
        store.commit('newProductField', payload)
      },
      newProduct(store, payload){
        store.commit('newProduct', payload)
      },
      products(store, payload){
        store.commit('products', payload)
      },
      editCategories(store, payload){
        store.commit('editCategories', payload)
      },
      editFurtherCatFieldSub(store, payload){
        store.commit('editFurtherCatFieldSub', payload)
      },
      editFurtherCatField(store, payload){
        store.commit('editFurtherCatField', payload)
      },
      editFurtherCat(store, payload){
        store.commit('editFurtherCat', payload)
      },
      newFurtherCatFieldSub(store, payload){
        store.commit('newFurtherCatFieldSub', payload)
      },
      newFurtherCatField(store, payload){
        store.commit('newFurtherCatField', payload)
      },
      newFurtherCat(store, payload){
        store.commit('newFurtherCat', payload)
      },
      furtherCategories(store, payload){
        store.commit('furtherCategories', payload)
      },
      newSubcategoryField(store, payload){
        store.commit('newSubcategoryField', payload)
      },
      newSubcategory(store, payload){
        store.commit('newSubcategory', payload)
      },
      editSubcategory(store, payload){
        store.commit('editSubcategory', payload)
      },
      subcategories(store, payload){
        store.commit('subcategories', payload)
      },
      editSubcategoryField(store, payload){
        store.commit('editSubcategoryField', payload)
      },
      edittCategory(store, payload){
        store.commit('edittCategory', payload)
      },
      confirmDeleteDialog(store, payload){
        store.commit('confirmDeleteDialog', payload)
      },
      users(store, payload){
        store.commit('users', payload)
      },
      role(store, payload){
        store.commit('role', payload)
      },
      roles(store, payload){
        store.commit('roles', payload)
      },
      dashboard(store, payload){
        store.commit('dashboard', payload)
      },
      storeLocation(store, payload){
        store.commit('storeLocation', payload)
      },
      selectedProvince(store, payload){
        store.commit('selectedProvince', payload)
      },
      selectedCity(store, payload){
        store.commit('selectedCity', payload)
      },
      brgys(store, payload){
        store.commit('brgys', payload)
      },
       cities(store, payload){
        store.commit('cities', payload)
      },
      provinces(store, payload){
        store.commit('provinces', payload)
      },
      stepper(store, payload){
        store.commit('stepper', payload)
      },
      colorIds(store, payload){
        store.commit('colorIds', payload)
      },
      cartQuantity(store, payload){
        store.commit('cartQuantity', payload)
      },
      item(store, payload){
        store.commit('item', payload)
      },
      email(store, payload){
        store.commit('email', payload)
      },
      phone(store, payload){
        store.commit('phone', payload)
      },
      jobTitle(store, payload){
        store.commit('jobTitle', payload)
      },
      company(store, payload){
        store.commit('company', payload)
      },
      lastname(store, payload){
        store.commit('lastname', payload)
      },
      middlename(store, payload){
        store.commit('middlename', payload)
      },
      firstname(store, payload){
        store.commit('firstname', payload)
      },
      furtherCategoryName(store, payload){
        store.commit('furtherCategoryName', payload)
      },
      subcategoryName(store, payload){
        store.commit('subcategoryName', payload)
      },
      categoryName(store, payload){
        store.commit('categoryName', payload)
      },
      user(store, payload){
        store.commit('user', payload)
      },
      userLogin(store, payload){
        store.commit('userLogin', payload)
      },
      token(store, payload){
        store.commit('token', payload)
      },
      userReg(store, payload){
        store.commit('userReg', payload)
      },
      loginDialog(store, payload){
        store.commit('loginDialog', payload)
      },
      snackbarColor(store, payload){
        store.commit('snackbarColor', payload)
      },
      snackbarText(store, payload){
        store.commit('snackbarText', payload)
      },
      snackbar(store, payload){
        store.commit('snackbar', payload)
      },
      snackbarOptions(store, payload){
        store.commit('snackbarColor', payload['snackbarColor'])
        store.commit('snackbarText', payload['snackbarText'])
        store.commit('snackbar', payload['snackbar'])
      },
      loginLoader(store, payload){
        store.commit('loginLoader', payload)
      },
      loader(store, payload){
        store.commit('loader', payload)
      },
      selectedPage(store, payload){
        store.commit('selectedPage', payload)
      },
      perPage(store, payload){
        store.commit('perPage', payload)
      },
      itemInfo(store, payload){
        store.commit('itemInfo', payload)
      },
      page(store, payload){
        store.commit('page', payload)
      },
      categories(store, payload){
        store.commit('categories', payload)
      }
    },
    getters: {
      selectedStorePlace(state){
        return state.selectedStorePlace
      },
      storesPlaces(state){
        return state.storesPlaces
      },
      dialogSearchStore(state){
        return state.dialogSearchStore
      },
      selectedItemColors(state){
        return state.selectedItemColors
      },
      itemColors(state){
        return state.itemColors
      },
      selectedFurtherCategory(state){
        return state.selectedFurtherCategory
      },
      selectedSubcategory(state){
        return state.selectedSubcategory
      },
      selectedCategory(state){
        return state.selectedCategory
      },
      productDiscount(state){
        return state.productDiscount
      },
      selectedProductStatus(state){
        return state.selectedProductStatus
      },
      productShortDesc(state){
        return state.productShortDesc
      },
      productLongDesc(state){
        return state.productLongDesc
      },
      productSKU(state){
        return state.productSKU
      },
      productQuantity(state){
        return state.productQuantity
      },
      productPrice(state){
        return state.productPrice
      },
      productName(state){
        return state.productName
      },
      newProductDialog(state){
        return state.newProductDialog
      },
      selectedUnitProduct(state){
        return state.selectedUnitProduct
      },
      units(state){
        return state.units
      },
      selectedSizesProduct(state){
        return state.selectedSizesProduct
      },
      sizes(state){
        return state.sizes
      },
      colors(state){
        return state.colors
      },
      selectedColorsProduct(state){
        return state.selectedColorsProduct
      },
      selectedBrgysProduct(state){
        return state.selectedBrgysProduct
      },
      selectedCitiesProduct(state){
        return state.selectedCitiesProduct
      },
      selectedProvinceProduct(state){
        return state.selectedProvinceProduct
      },
      selectedBranches(state){
        return state.selectedBranches
      },
      branches(state){
        return state.branches
      },
      selectedStore(state){
        return state.selectedStore
      },
      stores(state){
        return state.stores
      },
      storeId(state){
        return state.storeId
      },
      newProduct(state){
        return state.newProduct
      },
      products(state){
        return state.products
      },
      editCategories(state){
        return state.editCategories
      },
      editFurtherCat(state){
        return state.editFurtherCat
      },
      newFurtherCat(state){
        return state.newFurtherCat
      },
      furtherCategories(state){
        return state.furtherCategories
      },
      subcategories(state){
        return state.subcategories
      },
      newSubcategory(state){
        return state.newSubcategory
      },
      editSubcategory(state){
        return state.editSubcategory
      },
      edittCategory(state){
        return state.edittCategory
      },
      confirmDeleteDialog(state){
        return state.confirmDeleteDialog
      },
      users(state){
        return state.users
      },
      role(state){
        return state.role
      },
      roles(state){
        return state.roles
      },
      dashboard(state){
        return state.dashboard
      },
      storeLocation(state){
        return state.storeLocation
      },
      checkOutHeaders(state){
        return state.checkOutHeaders
      },
      selectedProvince(state){
        return state.selectedProvince
      },
      selectedCity(state){
        return state.selectedCity
      },
      brgys(state){
        return state.brgys
      },
      cities(state){
        return state.cities
      },
      provinces(state){
        return state.provinces
      },
      stepper(state){
        return state.stepper
      },
      colorIds(state){
        return state.colorIds
      },
      cart(state){
        return state.cart
      },
      cartQuantity(state){
        return state.cartQuantity
      },
      item(state){
        return state.item
      },
      email(state){
        return state.email
      },
      firstname(state){
        return state.firstname
      },
      middlename(state){
        return state.middlename
      },
      lastname(state){
        return state.lastname
      },
      company(state){
        return state.company
      },
      jobTitle(state){
        return state.jobTitle
      },
      phone(state){
        return state.phone
      },
      furtherCategoryName(state){
        return state.furtherCategoryName
      },
      subcategoryName(state){
        return state.subcategoryName
      },
      categoryName(state){
        return state.categoryName
      },
       user(state){
        return state.user
      },
      userLogin(state){
        return state.userLogin
      },
      token(state){
        return state.token
      },
      userReg(state){
        return state.userReg
      },
      loginDialog(state){
        return state.loginDialog
      },
      snackbarColor(state){
        return state.snackbarColor
      },
      snackbarText(state){
        return state.snackbarText
      },
      snackbar(state){
        return state.snackbar
      },
      loginLoader(state){
        return state.loginLoader
      },
      loader(state){
        return state.loader
      },
      selectedPage(state){
        return state.selectedPage
      },
      perPage(state){
        return state.perPage
      },
      itemInfo(state){
        return state.itemInfo
      },
      page(state){
        return state.page
      },
      categories(state){
        return state.categories
      }
    }
  })
}

export default createStore