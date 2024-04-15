const con = require("../config/dbConnection");

const moment = require('moment');

exports.insertClock = async (req, res) => {
  const { userId } = req.body;

  try {
    // console.log("hi")
    const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');

    const [insertResult] = await con
      .promise()
      .query(
        `INSERT INTO clock (user_id, createdAt, updatedAt, login_time) VALUES (?, ?, ?, ?)`,
        [userId, currentDate, currentDate, currentDate]
      );

    // Handle successful insertion
    res.status(200).json({ message: 'Clock entry inserted successfully.' });
  } catch (error) {
    // Handle errors
    console.error('Error inserting clock entry:', error);
    res.status(500).json({ error: 'An error occurred while inserting clock entry.' });
  }
};


exports.getClock = async (req, res) => {
  let { user } = req.body;
  if (!user) return res.status(400).json({ error: "Invalid User" });
  try {
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {};
