import { LightningElement, wire, api, track } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import { getRecord } from 'lightning/uiRecordApi';
import findPurchases from '@salesforce/apex/OrderSummaryController.findPurchases';
import deletePurchase from '@salesforce/apex/OrderSummaryController.removePurchase';


import USER_ID from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';

export default class OrderSummary extends NavigationMixin(LightningElement) {

    @track userName;
    @track purchases = [];

    @track isLoading = false;

    @wire(getRecord, {
        recordId: USER_ID,
        fields: [NAME_FIELD]
    }) wireuser({
        error,
        data
    }) {
        if (error) {
           this.error = error ; 
        } else if (data) {
            this.userName = data.fields.Name.value;
        }
    }

    connectedCallback() {
        this.findAllPurchases();
    }

    findAllPurchases() {
        this.isLoading = true;
        findPurchases({ userId : USER_ID }).then( (response) => {
            
            this.purchases = response;
            this.isLoading = false;

        } ).catch( (error) => {
            console.log('Problema ao carregar ordens: '+JSON.stringify(error));
            this.isLoading = false;
        } );

    }
    
    handleRemovePurchase(event) {

        this.isLoading = true;
        let purchaseId = event.currentTarget.dataset.record;
        
        deletePurchase({ userId : USER_ID, orderId : purchaseId }).then( (response) => {
            this.purchases = response;
            this.isLoading = false;
        } ).catch( (error) => {
            console.log('Problema ao remover ordem: '+ purchaseId +' - Details: '+JSON.stringify(error));
            this.isLoading = false;
        } );
    }

    executeNewPurchase() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'Shopping_Cart'
            }
        });
    }
}