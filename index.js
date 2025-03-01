const mongoose = require("mongoose");
const Vacancy = require("./schemas/vacancy");

exports.handler = async (event, context) => {
  try {
    // connect to db
    await mongoose.connect(
      `mongodb+srv://admin:${process.env.MONGO_DB_PASS}@statejobsny.ghdod.mongodb.net/?retryWrites=true&w=majority&appName=StateJobsNY`
    );

    // pull all jobs
    const jobs = await Vacancy.find({});

    // for every job
  } catch (e) {
    console.log(e);
  }
};
