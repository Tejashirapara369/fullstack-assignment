const mongoose = require("mongoose");
const { formatDate } = require('../utility');
const Schema = mongoose.Schema;

const licenseSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    licenseNo: {
        type: String,
        unique: true,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
        get: function (value) {
            return formatDate(value);
        }
    },
    carDetails: {
        ieMake: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
            min: [4, 'Must be at least 4 digit, got {VALUE}'],
        },
        platNumber: {
            type: String,
            unique: true,
            required: true,
        },
    },
});

const LicenseModel = mongoose.model("LicenseModel", licenseSchema);
module.exports = LicenseModel;
