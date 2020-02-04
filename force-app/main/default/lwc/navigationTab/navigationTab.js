import { LightningElement, api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';


export default class NavigationTab extends NavigationMixin(LightningElement) {
    
    @api recordId;
    @api label;
    @api buttonClass;
    
    get navigationButtonClass() {
        return ( this.buttonClass ) ? this.buttonClass : 'slds-button slds-button_brand';
    }

    navigateTo() {

        // View a custom object record.
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                actionName: 'view'
            }
        });
    }

    dispatchOnFinishEvent() {
        this.dispatchEvent( new CustomEvent( 'finish', {} ) );
    }

}