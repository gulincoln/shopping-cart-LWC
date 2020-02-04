/*
* @author Gustavo Lincoln
*/
public virtual class OrderBuilder {

    public Order__c buildOrder( Account account, OrderController.OrderDeliveryAddress address ) {

        return new Order__c(Account__c = account.Id, 
                            OwnerId = UserInfo.getUserId(), 
                            Status__c = 'Activated', 
                            StartDate__c = System.today(),
                            Address__c = address.address,
                            DeliveryDate__c = address.deliveryDate,
                            DeliveryType__c = address.delivery);

    }

}