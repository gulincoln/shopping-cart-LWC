/*
* @author Gustavo Lincoln
*/
public with sharing class ProductController {
    
    private final static Integer PAGE_SIZE = 9;

    @AuraEnabled(Cacheable=true)
    public static PagedResult getProducts(Filters filters, Integer pageNumber) {

        String key, whereClause = '';

        String[] categories, criteria = new List<String>{};

        if (filters != null) {

            if ( !String.isEmpty(filters.searchKey) ) {
                key = '\'%' + String.escapeSingleQuotes(filters.searchKey) + '%\'';
                criteria.add('Name LIKE '+key);
            }
            if ( filters.categories != null ) {
                categories = filters.categories;
                criteria.add('Category__c IN :categories');
            }
            if ( criteria.size() > 0 ) {
                whereClause = 'WHERE ' + String.join(criteria, ' AND ');
            }
        }

        Integer pageSize = ProductController.PAGE_SIZE;
        Integer offset = (pageNumber - 1) * pageSize;
        
        PagedResult result = new PagedResult();
        result.pageSize = pageSize;
        result.pageNumber = pageNumber;

        result.totalItemCount = Database.countQuery ( 'SELECT count() FROM Product__c ' + whereClause );
        result.records = Database.query( 'SELECT Id, Name, Price__c, Picture_URL__c, Category__c FROM Product__c ' + whereClause + ' ORDER BY Name LIMIT :pageSize OFFSET :offset' );
        
        return result;

    }


    public class Filters {
        
        @AuraEnabled
        public String searchKey { get; set; }
        
        @AuraEnabled
        public String[] categories { get; set; }

    }

}