const express = require("express");
const userAuth = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/adminMiddleware");
const { handleErrors } = require("../utils/helper");
const Location = require("../models/Location");

const locationRouter = express.Router();

locationRouter.get(
  "/get-locations",
  userAuth,
  adminMiddleware,
  async (req, res) => {
    try {
      const location = await Location.find({ isActive: true });
      if (!location)
        return res.status(400).json({ message: "No location found" });

      return res.status(200).json({ data: location });
    } catch (err) {
      handleErrors(err, res);
    }
  }
);

locationRouter.post(
  "/add-location",
  userAuth,
  adminMiddleware,
  async (req, res) => {
    try {
      const { locationName, latitude, longitude, employees } = req.body;
      if (!locationName)
        return res.status(400).json({ message: "location name is required" });
      if (!latitude)
        return res.status(400).json({ message: "latitude required" });
      if (!longitude)
        return res.status(400).json({ message: "longitude required" });
      if (!employees.length)
        return res.status(400).json({ message: "employees is required" });

      const employeeIds = employees.map((el) => el.toString());
      const uniqueEmployeeIds = new Set(employeeIds);

      if (employeeIds.length !== uniqueEmployeeIds.size)
        return res
          .status(400)
          .json({ message: "Duplicate employee ids are not allowed" });

      const locationAlreadyExists = await Location.findOne({
        $or: [{ locationName }, { latitude, longitude }],
        isActive: true,
      });

      if (locationAlreadyExists)
        return res.status(400).json({ message: "location already exists" });

      const employeeAlreadyInOtherLocation = await Location.findOne({
        employees: { $in: employees },
        isActive: true,
      });

      if (employeeAlreadyInOtherLocation)
        return res.status(400).json({
          message: "One or more employee is already added at another location",
        });

      await Location.create({
        locationName,
        latitude,
        longitude,
        employees,
        startDate: new Date().setUTCHours(0, 0, 0, 0),
        isActive: true,
      });

      res.status(201).json({ message: "location added successfully" });
    } catch (err) {
      handleErrors(err, res);
    }
  }
);

locationRouter.patch(
  "/remove-location/:id",
  userAuth,
  adminMiddleware,
  async (req, res) => {
    try {
      const locationId = req.params.id;

      const location = await Location.findByIdAndUpdate(
        locationId,
        {
          isActive: false,
        },
        { new: true }
      );
      if (!location)
        return res
          .status(400)
          .json({ message: "Location with this id doesn't exists" });

      res
        .status(200)
        .json({ message: "Location removed successfully", data: location });
    } catch (err) {
      handleErrors(err, res);
    }
  }
);

locationRouter.patch(
  "/location/edit-employee",
  userAuth,
  adminMiddleware,
  async (req, res) => {
    try {
      const { locationId, employee, action } = req.body;

      if (!["add", "remove"].includes(action))
        res.status(400).json({ message: "Invalid action" });

      const employeeAlreadyInOtherLocation = await Location.findOne({
        employees: { $in: [employee] },
        isActive: true,
      });

      if (employeeAlreadyInOtherLocation && action === "add")
        return res.status(400).json({
          message: "employee already added at another location",
        });

      const location = await Location.findById(locationId);

      if (!location)
        return res.status(400).json({
          message: "location with this id doesn't exist",
        });

      if (action === "add") {
        location.employees.push(employee);
      } else {
        location.employees.pull(employee);
      }
      if (location.employees.length === 0) location.isActive = false;

      await location.save({ validateModifiedOnly: true });

      res.status(200).json({
        message: `employee ${
          action === "add" ? " added " : " removed "
        } successfully`,
        data: location,
      });
    } catch (err) {
      handleErrors(err, res);
    }
  }
);

module.exports = locationRouter;
