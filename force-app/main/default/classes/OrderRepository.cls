/*
* @author Gustavo Lincoln
*/
public virtual class OrderRepository extends AbstractRepository {

    public Order__c findById( String orderId ) {

        return [ SELECT Id FROM Order__c WHERE Id =: orderId ];

    }

}