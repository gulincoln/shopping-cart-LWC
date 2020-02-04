import { LightningElement, track } from 'lwc';

export default class OrderAddress extends LightningElement {
    
    @track deliverySelected = '';
    @track address;
    @track date;

    get deliveries() {
        return [
            { label: 'At Local', value: 'local' },
            { label: 'At Home', value: 'home' },
        ];
    }

    get hasNoDeliverySelected() {
        return ( !this.deliverySelected.length > 0 );
    }

    get hasDeliverySelected() {
        return !this.hasNoDeliverySelected;
    }

    get isDeliveryLocal() {
        return ( this.hasNoDeliverySelected || this.deliverySelected !== 'home' );
    }

    get isDeliveryHome() {
        return ( !this.hasNoDeliverySelected && !this.isDeliveryLocal );
    }

    handleChangeDelivery(event) {
        this.deliverySelected = event.target.value;
    }

    handleChangeDeliverDate(event) {
        this.date = event.target.value;
        this.dispatchAddressEvent();
    }

    handleChangeAddress(event) {
        this.address = event.target.value;
        this.dispatchAddressEvent();
    }
    /*
    requiredFieldsFilled() {
        let allComponents = Array.from( this.template.querySelectorAll("lightning-input") );
        let allValid = allComponents.reduce( (validSoFar, inputCmp) => {
            return (validSoFar && inputCmp.checkValidity());
        }, true );
        
        return allValid;
    }

    setCustomValidations() {
        this.template.querySelectorAll("lightning-input").forEach( (elem) => {
            
            if( !elem.checkValidity() ) {
                elem.setCustomValidity("Please Fill required Fields!");
                elem.reportValidity();
                return;
            }

            elem.setCustomValidity("");
            elem.reportValidity();

        } );
    }
    */
    dispatchAddressEvent() {
        const addressevent = new CustomEvent( 'deliveryaddress', { detail : 
            { delivery: this.deliverySelected, address: this.address, deliveryDate: this.date } 
        } );
        this.dispatchEvent( addressevent );
    }
}