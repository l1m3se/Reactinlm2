db = require('mongoose');
const Customer = require('../models/customer');

// unrestricted
exports.getCustomers = (req, res) => {
    Customer.find().then(data => res.status(200).json(data))
}

exports.getCustomerById = (req, res) => {   
    Customer.findOne({ _id: req.params.id }).then(data => res.status(200).json(data))
}

exports.createCustomer = (req, res) => {

    const customer = new Customer(
        {
            _id:                new db.Types.ObjectId,
            firstname:          req.body.firstname,
            lastname:           req.body.lastname,
            company:            req.body.company,
            addressline:        req.body.addressline,
            zipcode:            req.body.zipcode,
            city:               req.body.city,
            country:            req.body.country,

            email:              req.body.email,
            phone:              req.body.phone,

            case_title:         req.body.case_title,
            case_description:   req.body.case_description,
            case_author:        req.body.case_author,
            case_status:        req.body.case_status
        }
    ) 

    customer.save()
    .then(() => {
        res.status(201).json({
            message: 'Kunden skapades',
            data: customer
            
        })
    })
    .catch((error) => {
        res.status(500).json({
            message: 'Kunden kunde inte skapades',
            error: error
        })
    })

}

exports.deleteCustomerById = (req, res) => {
    Customer.deleteOne({ _id: req.params.id })
    .then(() => {
        res.status(200).json({
            message: 'Kunden togs bort från databasen'
        })
    })
    .catch((error) => {
        res.status(500).json({
            message: 'Kunden togs inte bort från databasen!',
            error: error
        })
    })
}