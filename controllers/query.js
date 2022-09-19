const City = require('../models/city');
const Country = require('../models/country');
const Region = require('../models/region');

module.exports.postQuery = async (req, res, next) => {
    let { queryOption, name, sortOption } = req.body;
    sortOption = sortOption === "popularity" ? `-${sortOption}` : `${sortOption}`;

    if (queryOption === "country") {
        let cities = await City.aggregate([
            {
                $lookup: {
                    from: "regions",
                    localField: "regionId",
                    foreignField: "_id",
                    as: "cityRegionTable"
                }
            },
            {
                $unwind: "$cityRegionTable"
            },
            {
                $lookup: {
                    from: "countries",
                    localField: 'cityRegionTable.countryId',
                    foreignField: "_id",
                    as: "countryCityTable"
                }
            },
            {
                $unwind: "$countryCityTable"
            },
            {
                $match: {
                    'countryCityTable.name': name
                }
            }

        ]).sort(sortOption).exec();
        res.json(cities)

    } else if (queryOption === "region") {

        let cities = await City.aggregate([
            {
                $lookup: {
                    from: "regions",
                    localField: "regionId",
                    foreignField: "_id",
                    as: "cityRegionTable"
                }
            },
            {
                $unwind: "$cityRegionTable"
            },
            {
                $match : {
                    'cityRegionTable.name' : name
                }
            }
        ]).sort(sortOption).exec();


        console.log(cities);

        res.json(cities)

    } else {
        res.json({ message: "Not correct input" })
    }

}


module.exports.postCity = async (req, res, next) => {

    try {
        let { name, regionId, popularity } = req.body;
        popularity = Number.parseInt(popularity);
        const newCity = new City({
            name,
            regionId,
            popularity
        });
        await newCity.save();
        res.json(newCity);

    } catch (error) {
        res.json(error)
    }

}

module.exports.postRegion = async (req, res, next) => {
    try {
        const { name, country_id } = req.body;
        const newRegion = new Region({
            name,
            countryId: country_id
        });
        await newRegion.save();
        res.json(newRegion)

    } catch (error) {
        res.json(error)
    }
}

module.exports.postCountry = async (req, res, next) => {

    try {
        const { name } = req.body;
        const newCountry = new Country({
            name
        });
        await newCountry.save();
        res.json(newCountry);

    } catch (error) {
        res.json(error)
    }


}