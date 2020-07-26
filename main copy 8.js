Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <img v-bind:src="image" alt="img">
        </div>
        <div class="product-info">
            <h1>{{title}}</h1>
            <p>{{description}}</p>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p v-if="onSale">On Sale!!</p>
            <p>Shipping: {{ shipping }}</p>
            <ul>
                <li v-for="x in details">{{x}}</li>
            </ul>
            <div v-for="(x, index) in variants" 
                :key="x.variantId" 
                class="color-box"
                :style="{backgroundColor: x.variantColor}" 
                v-on:mouseover='updateProduct(index)'></div>
            <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock}">Add to Cart</button>
            <button v-on:click="removeFromCart">Remove from Cart</button>
        </div>
    </div>
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: "Socks",
            description: '100%wool',
            selectedVariant: 0,
            inventory: 10,
            // inStock: false,
            // onSale: false,
            details: ['80% cotton', '20%polyester', 'Gender-natural'],
            variants: [{
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
            ]
        }
    },
    methods: {
        addToCart: function () {
            // this.cart += 1;
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct: function (index) {
            this.selectedVariant = index;
            console.log(index);
        },
        removeFromCart: function() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        }
    },
    computed: {
        title: function () {
            return this.brand + ' ' + this.product
        },
        image: function () {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock: function () {
            return this.variants[this.selectedVariant].variantQuantity
        },
        onSale: function () {
            return this.variants[this.selectedVariant].variantQuantity != 0 ? true : false
        },
        shipping: function() {
            if(this.premium) {
                return "Free"
            }
            return 2.99
        }
    }
});



var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        removeItem(id) {
            for(var i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                this.cart.splice(i, 1);
                }
            }
        }
    }
})