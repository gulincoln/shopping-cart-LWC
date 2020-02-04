import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import SHIPPINGCART_ASSETS_URL from '@salesforce/resourceUrl/shipping_cart_assets';

import { registerListener, unregisterAllListeners, fireEvent } from 'c/pubsub';

const EMPTY_CART = SHIPPINGCART_ASSETS_URL + '/empty_cart.png';

export default class OrderDetails extends NavigationMixin(LightningElement) {
    
    @track empty_cart = EMPTY_CART;

    @track _products = [];
    @track totalPrice = 0.0;
    @track showConfirmation = false;
    @track address;

    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        registerListener('productselected', this.handleProductSelection, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }


    handleProductSelection(product) {
        let newProduct = { ...JSON.parse(product) };
        
        if ( this.hasProduct(newProduct) ) {
            this.getProductFromList(newProduct).quantity++;
        } else {
            this._products.push( { ...newProduct, quantity : 1 } );
        }

        this.calculateTotalPrice();
    }

    handleRemoveProduct(event) {
        let productName = event.currentTarget.dataset.record;
        this._products = this._products.filter( (prod) => prod.name !== productName );
        this.calculateTotalPrice();
    }

    handleChangeQuantity(event) {
        let selectedItem = event.currentTarget.ariaRowIndex;
        this._products[selectedItem].quantity = event.currentTarget.value;
        this.calculateTotalPrice();
    }

    calculateTotalPrice() {
        this.totalPrice = this._products.reduce( (total, prod) => ( total += prod.quantity * prod.price ), 0 );
    }

    clearCart(event) {
        this._products = [];
        this.calculateTotalPrice();
    }

    openConfirmationDialog() {
        this.showConfirmation = true;
    }

    handleCancelConfirmation() {
        this.showConfirmation = false;
    }

    handleAddressEvent(event) {
        this.address = event.detail;
    }

    hasProduct(product) {
        return this._products.filter( (prod) => prod.name === product.name ).length > 0;
    }

    getProductFromList(product) {
        return this._products.find( prod => prod.name === product.name );
    }

    get isContinueDisabled() {
        return ( this.hasNoProducts || this.totalPrice <= 0.0 );
    }

    get hasNoProducts() {
        return !this.hasProducts;
    }

    get hasProducts() {
        return ( this._products.length > 0 );
    }

    get hasProductsAndAddress() {
        return ( this.hasProducts && this.hasValidAddress );
    }

    get hasValidAddress() {
        return ( this.address && this.address.delivery && ( this.address.address || this.address.deliveryDate ) );
    }
}