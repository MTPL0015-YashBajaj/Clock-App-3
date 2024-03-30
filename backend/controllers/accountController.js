const con = require('../config/dbConnection')

exports.registerUser = async (req,res)=>{
    try {
        const { username, email } = req.body; // Assuming request body contains username and email

        // Execute SQL query to insert new user
        const [result] = await con.promise().query(`INSERT INTO users (username, email) VALUES ('${username}', '${email}')`);
        
        // Check if the insertion was successful
        if (result.affectedRows === 1) {
            res.status(201).json({ message: "User added successfully" });
        } else {
            res.status(500).json({ error: "Failed to add user" });
        }
    } catch (error) {
        console.error("Error executing SQL query:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.getUsers = async (req, res) => {
    try {
        // Execute SQL query to fetch users
        const [rows, fields] = await con.promise().query("SELECT * FROM users");
        console.log(rows, fields);
        res.json(rows); // Send fetched users as JSON response
    } catch (error) {
        console.error("Error executing SQL query:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
