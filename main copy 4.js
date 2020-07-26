var app = new Vue({
    el: '#app',
    data: {
        brand: 'Vue Mastery',
        product: "Socks",
        description: '100%wool',
        selectedVariant: 0,
        inventory: 10,
        // inStock: false,
        // onSale: false,
        details: ['80% cotton', '20%polyester', 'Gender-natural'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: './assets/vmSocks-green.jpg',
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: './assets/vmSocks-blue.jpg',
                variantQuantity: 0
            }
        ],
        cart: 0
    },
    methods: {
        addToCart: function() {
            this.cart +=1;
        },
        updateProduct: function(index) {
            this.selectedVariant = index;
            console.log(index);
        }
    },
    computed: {
        title: function() {
            return this.brand+' '+this.product
        },
        image: function() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock: function() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        onSale: function() {
            return this.variants[this.selectedVariant].variantQuantity != 0 ? true : false 
        }
    }
})