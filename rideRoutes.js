const express = require('express');
const Ride = require('../models/Ride');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Request a ride
router.post('/request', authMiddleware, async (req, res) => {
    try {
        const { pickupLocation, destination } = req.body;
        const newRide = new Ride({ passengerId: req.user.id, pickupLocation, destination });
        await newRide.save();

        res.status(201).json({ message: "Ride Requested" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Driver accepts ride
router.post('/accept/:rideId', authMiddleware, async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.rideId);
        if (!ride) return res.status(404).json({ message: "Ride Not Found" });

        ride.driverId = req.user.id;
        ride.status = "accepted";
        await ride.save();

        res.json({ message: "Ride Accepted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
