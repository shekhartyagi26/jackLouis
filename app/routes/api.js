var Blog = require('../models/blog');
var productModel = require('../models/product');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
const multer = require("multer");
const { STORAGE, DEFAULT_FILE_ARRAY } = require("../module/image");
const { validate, parameterMissing, successResult, serverError } = require('../module/generic')
const _ = require("lodash");
const mongoose = require('mongoose');

var options = {
    auth: {
        api_user: 'Shikha99',
        api_key: 'Shikha@123'
    }
}
var client = nodemailer.createTransport(sgTransport(options));

module.exports = function (router) {
    router.post('/users', function (req, res) {
        let { name, message, email } = req.body; // object destructring       
        let data = validate({ name, message, email }) // 
        if (data.status) {
            let senderEmail = {
                from: 'Jacklouis, singhshikha701@gmail.com',
                to: [email, 'shikha.s@ucs.consulting'],
                subject: 'Thank you for contacting Jacklouis',
                html: 'Hello<strong>&nbsp;' + name + '</strong>,</b><br> Thank you for your enquiry, we would like to understand few more details before we have a call to this forward<br><br> 1. Name of your Company/Organization <br> 2. Constitution (Proprietorship/Partnership/LLP/Pvt Ltd Company) <br> 3. Name of Proprietor/Partner/Managing Partner/ Director <br> 4. City/State of Operation <br> 5. Nature of Business (Distribution/Wholesaling/Retailing) <br>6. Staff Strength <br>7. Existing Distribution owned ( Name of companies and product categories) <br>8. Total Turnover (approx)<br>  On receipt of the above information, our sales team will contact you within 2 working days.<br><img src=".../assests/images/JACK LOUIS LOGO.png" style="width: 100px; height: auto;padding-left: 40px;">'
            };
            client.sendMail(senderEmail, function (err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Message sent: ' + info.response);
                }
            });
            res.status(200).json(successResult({}, "Note Submitted"))
        } else {
            res.status(400).json(parameterMissing(data.data))
        }
    })


    router.post('/blogs', function (req, res) {
        let { name, message } = req.body;
        let data = validate({ name, message })
        if (data.status) {
            let blog = new Blog(data.data);
            blog.save()
                .then(result => res.status(200).json(successResult(result, "Blog Posted Successfully")))
                .catch(err => res.status(500).json(serverError(err)))
        } else {
            res.status(400).json(parameterMissing(data.data))
        }
    });

    router.get('/getBlogsList', function (req, res) {
       Blog.find({}).sort({updatedAt: 1})
            .then(result => res.status(200).json({ message: "success", response: result }))
            .catch(err => res.status(500).json({ message: "servesr error", response: {} }))
    })

    router.post('/product', multer({ storage: STORAGE('product') }).any('file'), function (req, res) {
        let { name, description } = req.body;
        if (req.files && req.files.length) {
            let data = validate({ name, description });
            if (data.status) {
                data = _.merge({ image: DEFAULT_FILE_ARRAY(req.files) }, data.data)
                let product = new productModel(data)
                product.save()
                    .then(product => res.status(200).json(successResult(product, "product added Successfully")))
                    .catch(err => res.status(500).json(serverError(err)))
            } else {
                res.status(400).json(parameterMissing(data.data))
            }
        } else {
            res.status(400).json(parameterMissing("image is missing"))
        }
    })

 router.get('/product', function (req, res) {
        let id = req.params.id;
        productModel.find()
            .then(product => res.status(200).json(successResult(product)))
            .catch(err => res.status(500).json(serverError(err)))
    })

    router.get('/products/:id', function (req, res) {
        let { id } = req.params; // known as object destructring
        if (mongoose.Types.ObjectId.isValid(id)) {
            productModel.findOne({ _id: id })
                .then(product => res.status(200).json(successResult(product)))
                .catch(err => res.status(500).json(serverError(err)))
        } else {
            res.status(400).json(parameterMissing("Invalid id"))
        }

    })


    return router;
};