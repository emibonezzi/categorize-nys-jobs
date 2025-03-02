const mongoose = require("mongoose");
const Vacancy = require("./schemas/vacancySchema");
const Filter = require("./schemas/filtersSchema");
const filtersList = require("./data/filtersList");
require("dotenv").config();

exports.handler = async (event, context) => {
  try {
    // connect to db
    await mongoose.connect(
      `mongodb+srv://admin:${process.env.MONGO_DB_PASS}@statejobsny.ghdod.mongodb.net/?retryWrites=true&w=majority&appName=StateJobsNY`
    );

    // pull all jobs
    const jobs = await Vacancy.find({});

    let filters = [];

    for (let filter of filtersList) {
      const allResults = jobs.map((job) => job[filter.filterName]);
      const uniqueResults = [...new Set(allResults)];
      filters.push({
        filterName: filter.filterName,
        filterValues: uniqueResults,
      });
    }

    for (let filter of filters) {
      // check if filter exists
      const filterName = await Filter.findOne({
        filter_name: filter.filterName,
      });
      if (filterName) {
        if (
          JSON.stringify(filterName.filters_values) ===
          JSON.stringify(filter.filterValues)
        ) {
          console.log("No changes to", filter.filterName);
          continue; // if no changes skip to next
        }
        filterName.filter_values = filter.filterValues; // update array of filter values
        await filterName.save();
      } else {
        const newFilter = new Filter({
          filter_name: filter.filterName,
          filters_values: filter.filterValues,
        }); // create new filter
        await newFilter.save();
      }
    }

    mongoose.connection.close();
  } catch (e) {
    console.log(e);
  }
};

// exports.handler();
