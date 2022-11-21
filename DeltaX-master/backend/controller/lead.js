const Status = require("../model/status");
const Lead = require('../model/lead');

exports.createStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const isPresent = await Status.findOne({status});

        if(isPresent) {
            res.status(409).json({
                error: 'try adding another status'
            })
        } else {
            const newStatus = new Status({status});
            newStatus.save();
            res.status(200).json({
                message: "Status saved"
            })
        }

    } catch (error) {
        res.status(404).json({ error })
    }
}

exports.readStatus = async (req, res) => {
    try {
        const status = await Status.find();
        res.status(200).json({
            status
        })
    } catch (error) {
        res.status(404).json({ error })
    }
}

exports.getStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const status = await Status.findById(id);
        res.status(200).json({
            status
        })
    } catch (error) {
        res.status(404).json({ error })
    }
}

exports.createLead = async (req, res) => {
    try {
        const { email } = req.body;
        const lead = await Lead.findOne({email});

        if(lead) {
            res.status(409).json({
                error: "Consider updating status"
            })
        } else {
            const newLead = new Lead(req.body);
            newLead.save();
            res.status(200).json({
                message: "Lead added successfully"
            })
        }
    } catch (error) {
        res.status(404).json({ error })
    }
}

exports.lead = async (req, res) => {
    try {
        const { id } = req.params;
        const lead = await Lead.findById(id);
        res.status(200).json({
            lead
        })
    } catch (error) {
        res.status(404).json({ error })
    }
}

exports.leads = async(req, res) => {
    try {
        const leads = await Lead.find();
        res.status(200).json({
            leads
        })
    } catch (error) {
        res.status(404).json({ error })
    }
}

exports.updateLead = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.body)
        
        const updatedLead = await Lead.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            message: "Lead updated successfully"
        })
        
    } catch (error) {
        res.status(404).json({ error })
    }
}

exports.deleteLead = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(404).json({ error })
    }
}