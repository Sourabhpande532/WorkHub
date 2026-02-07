const Job = require("../model/Jobs");
const createError = require("../utils/createError");

exports.obtainedJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    if (jobs.length != 0) {
      res.status(200).json({
        success: true,
        message: "Fetched Jobs",
        data: { jobs },
      });
    } else {
      res.status(404).json({ success: false, message: "job not found." });
    }
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
};

exports.postedJobs = async (req, res, next) => {
  try {
    const { title, companyName, location, type, salary } = req.body;
    if (!title || !companyName || !location || !type || !salary) {
      return next(
        createError({
          status: 400,
          message: "required missing fields.",
        }),
      );
    }
    const newJob = new Job(req.body);
    await newJob.save();
    return res.status(201).json({
      success: true,
      message: "Added Successfully",
      data: { jobs: newJob },
    });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

exports.findJobDetails = async (req, res, next) => {
  try {
    const jobs = await Job.findById(req.params.id);
    res.status(200).json({ success: true, data: { jobs } });
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
};

exports.deleteJobs = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
};
