const Alert = require('../models/Alert');

exports.addAlert = async (req, res) => {
    try {
        const { asset, targetPrice } = req.body;
        const alert = await Alert.create({ user: req.user.id, asset, targetPrice });
        res.status(201).json(alert);
    } catch (error) {
        res.status(400).json({ error: 'Could not create alert' });
    }
};

exports.getAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find({ user: req.user.id });
        res.status(200).json(alerts);
    } catch (error) {
        res.status(400).json({ error: 'Could not fetch alerts' });
    }
};

exports.removeAlert = async (req, res) => {
    try {
        const { id } = req.params;
        await Alert.findByIdAndDelete(id);
        res.status(200).json({ message: 'Alert removed' });
    } catch (error) {
        res.status(400).json({ error: 'Could not remove alert' });
    }
};
