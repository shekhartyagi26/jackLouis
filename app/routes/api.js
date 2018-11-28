var User = require('../models/user');
var Blog = require('../models/blog');

var jwt = require('jsonwebtoken');
var secret = 'harrypotter';
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

module.exports = function(router) {

    var options = {
        auth: {
            api_user: 'Shikha99',
            api_key: 'Shikha@123'
        }
    }
    var client = nodemailer.createTransport(sgTransport(options));


    router.post('/users', function(req, res) {
        //res.send('test the route');
        var user = new User();
        user.name = req.body.name;
        user.message = req.body.message;
        user.email = req.body.email;
        if (req.body.name === null || req.body.name === '' || req.body.email === null || req.body.email === '' || req.body.message === null || req.body.message === '') {
            res.json({ success: false, message: 'Ensure name, email, and message were provided' });
        } else {
            // Save new user to database
            user.save(function(err) {
                if (err) {
                    // Check if any validation errors exists (from user model)
                    if (err.errors !== null) {
                        if (err.errors.name) {
                            res.json({ success: false, message: err.errors.name.message }); // Display error in validation (name)
                        } else if (err.errors.email) {
                            res.json({ success: false, message: err.errors.email.message }); // Display error in validation (email)
                        }
                     
                        else {
                            res.json({ success: false, message: err }); // Display any other errors with validation
                        }
                    } else if (err) {
                        // Check if duplication error exists
                        if (err.code == 11000) {
                            if (err.errmsg[61] == "u") {
                                res.json({ success: false, message: 'That username is already taken' }); // Display error if username already taken
                            } else if (err.errmsg[61] == "e") {
                                res.json({ success: false, message: 'That e-mail is already taken' }); // Display error if e-mail already taken
                            }
                        } else {
                            res.json({ success: false, message: err }); // Display any other error
                        }
                    }
                }
             
                else {
                    var email = {
                        from: 'Jacklouis,singhshikha701@gmail.com',
                        to: [user.email, 'shikha.s@ucs.consulting'],
                        subject: 'Thank you for contacting Jacklouis',
                        // text:'Hello'+user.name+'Thank you for showing your interest at jacklouis.in please click below link to complete your activation:http://localhost:3000/activate/'+user.temporarytoken,
                        // html: 'Hello<strong>'+user.name+'</strong>,</b><br>Thank you for registering at jacklouis.in please click below link to complete your activation:<br><br><a href="http://localhost:3000/activate/'+ user.temporarytoken +'">http://localhost:3000/activate</a>'
                        html: 'Hello<strong>&nbsp;' + user.name + '</strong>,</b><br> Thank you for your enquiry, we would like to understand few more details before we have a call to this forward<br><br> 1. Name of your Company/Organization <br> 2. Constitution (Proprietorship/Partnership/LLP/Pvt Ltd Company) <br> 3. Name of Proprietor/Partner/Managing Partner/ Director <br> 4. City/State of Operation <br> 5. Nature of Business (Distribution/Wholesaling/Retailing) <br>6. Staff Strength <br>7. Existing Distribution owned ( Name of companies and product categories) <br>8. Total Turnover (approx)<br>  On receipt of the above information, our sales team will contact you within 2 working days.<br><img src=".../assests/images/JACK LOUIS LOGO.png" style="width: 100px; height: auto;padding-left: 40px;">'
                    };

                    client.sendMail(email, function(err, info) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Message sent: ' + info.response);
                        }
                    });

                    //res.json({ success: true, message: 'user created' }); // Send success message back to controller/request

                    res.json({ success: true, message: 'Note Submitted' });


                }
            });


        }
    })
    router.post('/blogs', function(req, res) {
        //res.send('test the route');
        var blog = new Blog();
        blog.name = req.body.name;
        blog.message = req.body.message;

        if (req.body.name === null || req.body.name === '' || req.body.message === null || req.body.message === '') {
            res.json({ success: false, message: 'Ensure name and message were provided' });
        } else {
            // Save new blog to database
            blog.save(function(err) {
                if (err) {
                    // Check if any validation errors exists (from blog model)
                    if (err.errors !== null) {
                        if (err.errors.name) {
                            res.json({ success: false, message: err.errors.name.message }); // Display error in validation (name)
                        } else {
                            res.json({ success: false, message: err }); // Display any other errors with validation
                        }
                    }
                } else {
                    res.json({ success: true, message: 'Blog Posted Successfully' });


                }
            });


        }
    });

    router.get('/getBlogsList', function(req, res) {
        Blog.find({})
            .then(result => res.status(200).json({ message: "success", response: result }))
            .catch(err => res.status(500).json({ message: "servesr error", response: {} }))
    })


    return router;
};