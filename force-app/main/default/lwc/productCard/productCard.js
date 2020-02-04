import { LightningElement, api, track } from 'lwc';

export default class ProductCard extends LightningElement {

    _product;
    
    @api
    get product() {
        return this._product;
    }
    set product(value) {
        this._product = { id: value.Id, name : value.Name, category : value.Category__c, pictureUrl : value.Picture_URL__c, price : value.Price__c };
    }

    handleProductSelected() {
        this.dispatchSelectedProduct();
    }
    
    dispatchSelectedProduct() {
        const productSelected = new CustomEvent ( "selected", {
            detail: JSON.stringify(this._product),
        });

        this.dispatchEvent ( productSelected );
    }
}