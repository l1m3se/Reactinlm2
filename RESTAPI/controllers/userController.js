const db = require('mongoose');
const encrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


// unrestricted
exports.register = function(req, res) {   
    User
        .find({ email: req.body.email })
        .exec()
        .then(function(user) {
            if(user.length > 0) {
                return res.status(400).json({
                    message: `En användare med email ${req.body.email} finns redan`,
                    statuscode: 400
                })
            }
            else {
                encrypt.hash(req.body.password, 10, function(error, hash) {
                    if(error) {
                        return res.status(500).json({ 
                            error: error,
                            message: ` ${req.body.email}`
                        });
                    }
                    else {
                        
                        let user = new User(
                            {

                                _id:            new db.Types.ObjectId,
                                firstname:      req.body.firstname,
                                lastname:       req.body.lastname,
                                addressline:    req.body.addressline,
                                dateofbirth:    req.body.dateofbirth,
                                zipcode:        req.body.zipcode,
                                city:           req.body.city,
                                country:        req.body.country,
                                email:          req.body.email,
                                password:       hash

                            }
                        );

                        user
                            .save()
                            .then(function() {
                                res.status(201).json({
                                   message: `Användare ${req.body.firstname} ${req.body.lastname} skapades.`,
                                   statuscode: 201,
                                   success: true 
                                })
                            })
                            .catch(function(error) {
                                res.status(500).json({
                                    message: `Misslyckades att skapa användare ${req.body.firstname} ${req.body.lastname}.`,
                                    statuscode: 500,
                                    success: false
                                })
                            })
                    }
                })
            }
        }) 
}

exports.login = function(req, res) {
    User
        .find({ email: req.body.email })
        .then(function(user) {
            if(user.length === 0) {
                return res.status(401).json({
                    message: "Felaktig email eller lösenord",
                    statuscode: 401,
                    success: false
                })
            } 
            else {
                encrypt.compare(req.body.password, user[0].password, function(error, result) {
                    if(error) {
                        return res.status(401).json({
                            message: "Felaktig email eller lösenord",
                            statuscode: 401,
                            success: false
                        })
                    }

                    if(result) {
                        const token = jwt.sign(
                            { id: user[0]._id, email: user[0].email },
                            process.env.PRIVATE_SECRET_KEY,
                            { expiresIn: "1h" }
                        )

                        return res.status(200).json({
                            message: "Authentication was successful",
                            success: true,
                            token: token,
                            id: user[0]._id,
                            email: user[0].email,
                            firstname: user[0].firstname,
                            lastname: user[0].lastname
                        })
                    }

                    return res.status(401).json({
                        message: "Felaktig email eller lösenord",
                        statuscode: 401,
                        success: false
                    })
                })
            }       
        })
}


// restricted


exports.getUsers = function(req, res) {

    User.find()              
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).json(error))    
        
}

// exempel. localhost:3001/api/users/5ce515ce2af81f1484a0d88b
exports.getUser = function(req, res) {

    User.findOne({ _id: req.params.id })              
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).json(error))

}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((user) => res.status(200).json({ message: `Användare ${user.firstname} ${user.lastname} uppdaterades`, success: true, id: user._id, email: user.email, firstname: user.firstname, lastname: user.lastname }))
        .catch(() => res.status(500).json({
            errorcode: "500",
            message: "Någonting gick helt galet",
            success: false
        }));
}

exports.updateEmail = (req, res) => {
    User
        .find({ email: req.body.email })
        .exec()
        .then(function (user) {
            if (user.length > 0) {
                return res.status(400).json({
                    message: `En användare med email ${req.body.email} finns redan`,
                    statuscode: 400, 
                    success: false
                });
            } else {
                User.findByIdAndUpdate(req.params.id, req.body, { new: true })
                .then((user) => res.status(200).json({ success: true, message: `User ${user.firstname} ${user.lastname} was updated.`, email: user.email, firstname: user.firstname, lastname: user.lastname }))
                .catch(() => res.status(500).json({
                    errorcode: "500",
                    message: "Någonting gick helt galet",
                    success: false
                }));
            }
        });
}


exports.updatePassword = (req, res, next) => {
    const password = req.body.password;

    encrypt.hash(password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }

        req.body.password = hash;

        User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
            if (err) return res.send(err).status(500);
            return res.status(200).json({success: true, message: 'Lösenordet uppdaterades'});
        });
    });
}

exports.deleteUser = function(req, res) {
    User.deleteOne({ _id: req.params.id })
    .then(() => {
        res.status(200).json({
            message: 'Användaren togs bort från databasen'
        })
    })
    .catch((error) => {
        res.status(500).json({
            message: 'Användaren togs inte bort från databasen!',
            error: error
        })
    })    
}

