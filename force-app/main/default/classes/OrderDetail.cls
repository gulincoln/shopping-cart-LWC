/*
* @author Gustavo Lincoln
*/
public class OrderDetail {
    
    @AuraEnabled
    public String id { get; set; }

    @AuraEnabled
    public String name { get; set; }
    
    @AuraEnabled
    public String category { get; set; }

    @AuraEnabled
    public String pictureUrl { get; set; }

    @AuraEnabled
    public Decimal price { get; set; }

    @AuraEnabled
    public Integer quantity { get; set; }

}