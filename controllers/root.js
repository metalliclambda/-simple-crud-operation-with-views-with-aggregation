const City = require('../models/city');
const Country = require('../models/country');
const Region = require('../models/region');

module.exports.getRoot = async (req, res, next) => {
    const countries = await Country.find().exec();
    const regions = await Region.find().exec();


    res.render('index' , {
        regions ,
        countries
    });
}