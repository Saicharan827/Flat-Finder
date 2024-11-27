const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    roomsAvailable: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    electricityBillPaidBy: {
        type: String,
        enum: ['owner', 'customer'],
        required: true,
    },
    ownerDetails: {
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        area: {
            type: String,
            required: true,
        },
    },
    parking: {
        type: Boolean,
        required: true,
    },
    groundWaterSupply: {
        type: Boolean,
        required: true,
    },
    images: {
        type: String,
        required:false
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
