/*
* @author Gustavo Lincoln
*/
public abstract class AbstractRepository {
    
    virtual
    public SObject save (SObject aggregate) {

        if (aggregate.Id == null ) {
            insert aggregate;
        } else {
            update aggregate;
        }

        return aggregate;
    }

    virtual
    public List<SObject> save (List<SObject> aggregates) {

        List<SObject> aggregatesToCreate = filterWithOutId (aggregates);

        if (!aggregatesToCreate.isEmpty()) {
            insert aggregatesToCreate;
        }

        List<SObject> aggregatesToUpdate = filterWithId (aggregates);

        if (!aggregatesToUpdate.isEmpty()) {
            update aggregatesToUpdate;
        }

        return aggregates;

    }

    virtual
    public List<SObject> filterWithId (List<SObject> aggregates) {
        List<SObject> aggregatesToStore = new  List<SObject>();

        for (SObject aggregate : aggregates) {
            if (aggregate.id != null) aggregatesToStore.add (aggregate);
        }

        return aggregatesToStore;
    }

    virtual
    public List<SObject> filterWithOutId (List<SObject> aggregates) {
        List<SObject> aggregatesToStore = new  List<SObject>();

        for (SObject aggregate : aggregates) {
            if (aggregate.id == null) aggregatesToStore.add (aggregate);
        }

        return aggregatesToStore;
    }

    virtual
    public List<Database.SaveResult> updateAll ( List<SObject> entities ) {
        return Database.update (entities, false);
    }

}