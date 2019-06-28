const db = require('mongoose');

const customerSchema = db.Schema({

    _id:                    db.Schema.Types.ObjectId,
    firstname:              { type: String, required: true },
    lastname:               { type: String, required: true },
    company:                { type: String, required: true },
    addressline:            { type: String, required: true },
    zipcode:                { type: String, required: true },
    city:                   { type: String, required: true },
    country:                { type: String, required: true },

    email:                  { type: String, required: true },
    phone:                  { type: String, required: true },

    case_title:             { type: String, required: true },
    case_description:       { type: String, required: true },
    case_author:            { type: String, required: true },
    case_status:            { type: String, required: true },

    
});

module.exports = db.model("Customer", customerSchema);
