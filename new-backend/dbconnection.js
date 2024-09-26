const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;
const MONGODB_URI = "mongodb://localhost:27017/userinfo";

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log("Database connected"))
    .catch(err => console.error("Database connection error:", err));

// User Schema and Model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true }
},
    { collection: "newCustomUser" }
);

const User = mongoose.model("User", userSchema);

//Get User
app.get("/getUser", (req, res) => {
    User.find({})
        .then((userList) => res.json(userList))
        .catch((err) => res.json(err))
});

// Post User
app.post("/userInfo", async (req, res) => {
    try {
        const { name, role } = req.body;
        const newUser = new User({ name, role });
        await newUser.save();
        res.status(201).send("User added successfully");
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).send("Internal server error");
    }
});

//Update User
app.put("/updateuser/:id", async (req, res) => {
    try {
        const { id } = req.params
        const body = req.body
        let updatedUser = await User.findByIdAndUpdate(id, body,)
        if (!updatedUser) {
            return res.send("User not found")
        }
        res.send("User updated sucessfully")
    } catch (error) {
        console.error("Error in updating user")
        res.send("Unable to update user info")
    }
})

// Delete User
app.delete("/deleteData/:id", async (req, res) => {
    try {
        const { id } = req.params
        let deleteUser = await User.findByIdAndDelete(id)
        if (!deleteUser) {
            res.send("User not found")
        }
        res.send("User deleted successfully")
    } catch (error) {
        console.error("Error in deleting user")
        res.send("Unable to delete user")
    }
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
