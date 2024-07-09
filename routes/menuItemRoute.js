const express = require("express")
const router = express.Router();
const menuItem = require("../models/MenuItem");
const MenuItem = require("../models/MenuItem");

router.post("/", async (req, res) => {
    try {
        const data = req.body
        const newItem = new menuItem(data);
        const response = await newItem.save();
        console.log("data  saved")
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        req.status(500).json({ error: "internal error" })
    }

})

router.get('/', async (req, res) => {
    try {
        const data = await menuItem.find();
        console.log("data fetched")
        res.status(200).json(data);

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "internal server error" })
    }
})

router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if (tasteType == "sweet" || tasteType == "sour" || tasteType == "spicy") {
            const response = await menuItem.find({ taste: tasteType });
            console.log("response fetched")
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: "invalid data" });
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "internal server error" })
    }

})

router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const updatedMenu = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenu, {
            new: true,
            runValidators: true,
        })
        if (!response) {
            return res.status(404).json({ error: "menu not found" })
        }
        console.log('data updated')
        res.status(200).json(response);

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "internal server error" })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);

        if (!response) {
            res.status(404).json({ error: "menuItem not found" })
        }
        console.log("data deleted")
        res.status(200).json({ message: "menuItem deleted successfully" })

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "internal server error" })
    }
})
module.exports = router