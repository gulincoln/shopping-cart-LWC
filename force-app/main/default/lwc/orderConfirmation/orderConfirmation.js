import { LightningElement, api, track } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import processOrder from '@salesforce/apex/OrderController.processOrder';

export default class OrderConfirmation extends NavigationMixin(LightningElement) {
    @api products;
    @api address;
    @api totalPrice;

    @track errorMessage = '';
    @track isLoading = false;

    cancelConfirmation() {
        const cancelEvent = new CustomEvent( 'cancelconfirmation', { details : {} } );
        this.dispatchEvent( cancelEvent );
    }

    executeOrder() {
        
        this.isLoading = true;
        processOrder({ orderDetailsRequest : JSON.stringify( this.products ), addressPayload : JSON.stringify( this.address ) }).then( (response) => {
            
            this.isLoading = false;
            console.log('Order salva com sucesso: '+ JSON.stringify(response) );

            this.navigateToMyPurchases();
            
        } ).catch( (error) => {
            console.log('Problema ao salvar Order: '+JSON.stringify(error));
            this.errorMessage = JSON.stringify(error);
            this.isLoading = false;
        } );

    }

    navigateToMyPurchases() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'My_Purchases'
            }
        });
    }

    get hasError() {
        return ( this.errorMessage.length > 0 );
    }
}