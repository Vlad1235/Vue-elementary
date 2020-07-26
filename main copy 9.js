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
                v-on:mouseover='updateProduct(index)'>
            </div>

            <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock}">Add to Cart</button>
            <button v-on:click="removeFromCart">Remove from Cart</button>

        </div>

        <div>
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are now reviews yet</p>
            <ul>
                <li v-for="x in reviews">
                    <p> {{ x.name }}</p>
                    <p>Rating: {{ x.rating }}</p>
                    <p>Rating: {{ x.review }}</p>
                </li>
            </ul>
        </div>

        <product-review v-on:review-submitted="addReview"></product-review>

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
            ],
            reviews: []
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
        },
        addReview(productReview) {
            this.reviews.push(productReview)
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

Vue.component('product-review', {
    template: ` 
    <form class="review-form" @submit.prevent="onSubmit">
      
        <p class="error" v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>

        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name">
        </p>
        
        <p>
            <label for="review">Review:</label>      
            <textarea id="review" v-model="review"></textarea>
        </p>
        
        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>

        <p>Would you recommend this product?</p>
        <label>Yes
        <input type="radio" value="Yes" v-model="recommend"/>
        </label>
        <label>No
        <input type="radio" value="No" v-model="recommend"/>
        </label>
            
        <p>
        <input type="submit" value="Submit">  
        </p>    
    
    </form>
    `,

    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {    // способ собственной валидации прописать как
            this.errors = []
            if(this.name && this.review && this.rating && this.recommend) {
              let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating,
                recommend: this.recommend
              }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            } else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
                if(!this.recommend) this.errors.push("Recommendation required.")
            }
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



// v-model.number чтобы четко указать что тут только числовой тип
// @submit.prevent="onSubmit" аналог event.preventDefault()