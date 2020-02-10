import { createElement } from 'lwc';
import OrderConfirmation from 'c/orderConfirmation';
import processOrder from '@salesforce/apex/OrderController.processOrder';
import { getNavigateCalledWith } from 'lightning/navigation';

// Mock product data
const mockProducts = require('./data/mock-products.json');

//Mock address data
const mockAddress = require('./data/mock-address.json');

// Mocking processOrder call
jest.mock(
    '@salesforce/apex/OrderController.processOrder',
    () => {
        return {
            default: jest.fn()
        };
    },
    { virtual: true }
);

// Sample data for imperative Apex call
const ORDER_SUCCESS = [
    {
        Id: 'a045w00003IoZlIAAV',
        Name: 'ON-00000',
        Account__c: '0015w000025XzlHAAS',
        StartDate__c: '2020-01-29',
        Status__c: 'Activated',
        TotalPrice__c: 300.0,
        Address__c: 'Rua Dois, 123',
        DeliveryDate__c: '2020-02-20',
        DeliveryType__c: 'Local'
    }
];

// Sample error for imperative Apex call
const ORDER_ERROR = {
    body: { message: 'An internal server error has occurred' },
    ok: false,
    status: 400,
    statusText: 'Bad Request'
};


describe('c-order-confirmation', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }

        // Prevent data saved on mocks from leaking between tests
        jest.clearAllMocks();
    });

    // Helper function to wait until the microtask queue is empty. This is needed for promise
    // timing when calling imperative Apex.
    function flushPromises() {
        // eslint-disable-next-line no-undef
        return new Promise(resolve => setImmediate(resolve));
    }


    it( 'given products then execute order and redirect to my purchases page', () => {

        processOrder.mockResolvedValue( ORDER_SUCCESS );

        // Mock realistic data
        const mockMyPurchasePageReference = require('./data/MockPageReference.json');

        // Create element
        const element = createElement('c-order-confirmation', {
            is: OrderConfirmation
        });
        document.body.appendChild(element);

        element.products = mockProducts;
        element.address = mockAddress;

        // Click process order action
        const processOrderBtn = element.shadowRoot.querySelector('.processOrderButton');
        processOrderBtn.click();

        

        return flushPromises().then(() => {
            //expected pageReference
            const { pageReference } = getNavigateCalledWith();

            expect( pageReference.type ).toBe( mockMyPurchasePageReference.type );
            expect( pageReference.attributes.apiName ).toBe( mockMyPurchasePageReference.attributes.apiName );
        });

    });
});