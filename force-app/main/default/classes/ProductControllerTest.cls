/*
* @author Gustavo Lincoln
*/
@isTest
private class ProductControllerTest {
    
    @TestSetup
    static void initData(){

        List<Product__c> products = (List<Product__c>) Test.loadData( Product__c.sObjectType, 'Product' );
        
    }

    @isTest
    private static void givenProductsWhenSearchByKeyThenReturnCorrespondentProducts() {

        List<String> categories = new List<String>{ 'Business', 'Fiction', 'Others' };

        String searchKey = 'cle';

        ProductController.Filters filter = new ProductController.Filters();
        filter.searchKey = searchKey;
        filter.categories = categories;

        Test.startTest();

        PagedResult result = ProductController.getProducts( filter , 1 );

        Test.stopTest();

        System.assert( result != null );
        System.assert(  result.totalItemCount > 0 );
        System.assert( !result.records.isEmpty() );  
    }
}
