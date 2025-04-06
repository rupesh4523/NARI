const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
    passengerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    pickupLocation: { type: String, required: true },
    destination: { type: String, required: true },
    status: { type: String, enum: ['requested', 'accepted', 'completed'], default: 'requested' }
});

module.exports = mongoose.model('Ride', RideSchema);