import {ObjectId} from 'bson';

class Spot {
    constructor({
        name,
        address,
        partition,
        id = new ObjectId(),
    }) {
        this._partition = partition;
        this._id = id;
        this.name = name;
        this.address = address;
    }

    static schema = {
        name: 'Spot',
        properties: {
            _id: 'objectId',
            _partition: 'string',
            name: 'string',
            address: 'string',
        },
        primaryKey: '_id',
    };
}

export {Spot};