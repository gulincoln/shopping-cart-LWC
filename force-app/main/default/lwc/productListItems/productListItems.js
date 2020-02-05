import { LightningElement, api, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

import getProducts from '@salesforce/apex/ProductController.getProducts';

import { registerListener, unregisterAllListeners, fireEvent } from 'c/pubsub';

import SHIPPINGCART_ASSETS_URL from '@salesforce/resourceUrl/shipping_cart_assets';

const NOT_FOUNDED_PRODUCTS = SHIPPINGCART_ASSETS_URL + '/not_founded.jpg';

export default class ProductListItems extends LightningElement {
    
    @track not_founded = NOT_FOUNDED_PRODUCTS;

    @track pageNumber = 1;
    @track pageSize;
    @track totalItemCount = 0;

    @track filters = {};
    @track alreadyAddedProducts = [];

    @wire(CurrentPageReference) pageRef;

    @wire(getProducts, { filters: '$filters', pageNumber: '$pageNumber' })
    products;

    connectedCallback() {
        registerListener('filterChange', this.handleFilterChange, this);
    }

    handleProductSelected(event) {
        fireEvent(this.pageRef, 'productselected', event.detail);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handleSearchKeyChange(event) {
        this.filters = {
            searchKey: event.target.value.toLowerCase()
        };
        this.pageNumber = 1;
    }

    handleFilterChange(filters) {
        this.filters = { ...filters };
        this.pageNumber = 1;
    }
    /*
    handleRemovedProducts(addedProducts) {
        this.alreadyAddedProducts = Array.from( addedProducts );
        this.buildNewProducts();
    }

    buildAllProducts() {
        return Array.from( this.products.data.records ).map( (prod) => ( { ...prod, alreadyAddedToCart : false } ) ) ;
    }

    buildNewProducts() {
        let newProducts = { ...this.products };
        let newRecords = Array.from( this.products.data.records ).map( (prod) => {
            return { ...prod, alreadyAddedToCart : this.isProductAlreadyAdded( prod ) };
        } ) ;
        newProducts.data.records = Object.assign({}, newRecords);
        console.log('novos produtos: '+JSON.stringify( newProducts ));
        return newProducts;
    }

    isProductAlreadyAdded( product ) {
        let addeProducts = this.alreadyAddedProducts.filter( added => ( added.name === product.Name ));
        return ( addeProducts.length > 0 );
    }
    */
    handlePreviousPage() {
        this.pageNumber = this.pageNumber - 1;
    }

    handleNextPage() {
        this.pageNumber = this.pageNumber + 1;
    }
    /*
    get produtos() {
        if( !this.alreadyAddedProducts.length > 0 ) return this.products;
        return this.buildNewProducts();
    }
    */
}