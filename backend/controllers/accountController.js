const con = require("../config/dbConnection");
const uuid = require("uuid");
const {
  HashPassword,
  mailSender,
  AddMinutesToDate,
  VerifyPassword
} = require("../helpers/helper");
const moment = require("moment");
var otpGenerator = require("otp-generator");
const {generateToken} = require("../helpers/generateToken");

// Function to validate email using regex
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function to validate password (minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character)
const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
  return passwordRegex.test(password);
};

// Function to validate phone number (assuming it's a numeric string)
const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\d+$/;
  return phoneRegex.test(phoneNumber);
};

exports.registerUser = async (req, res) => {
  try {
    let {
      fullName,
      email,
      password,
      countryCode,
      phoneNumber,
      gender,
      dob,
      provider,
    } = req.body;

    // Validation checks for name and gender
    if (!fullName.trim()) {
      return res.status(400).json({ error: "Invalid Name format" });
    }

    if (!["male", "female", "others"].includes(gender)) {
      return res.status(400).json({ error: "Invalid Gender format" });
    }

    // Validate email
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate password
    if (!validatePassword(password)) {
      return res.status(400).json({ error: "Invalid password format" });
    }

    // Validate phone number
    if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }

    // Validate date of birth
    let newdob = moment(dob).format("YYYY-MM-DD");
    if (!moment(newdob).isValid() || moment().diff(newdob, "years") < 13) {
      return res
        .status(400)
        .json({ error: "Invalid dob format or age must be at least 13 years" });
    }

    // Check if email already exists
    const [emailResult] = await con
      .promise()
      .query(`SELECT email FROM users WHERE email = ?`, [email]);
    if (emailResult.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password
    let hashedPassword = await HashPassword(password);
    let userId = uuid.v4();
    var CurrentDate = moment().format();

    // Insert user into database
    const [result] = await con
      .promise()
      .query(
        `INSERT INTO users (user_id,full_name, email, password, country_code, phone, profile_image, gender,  dob, is_verified, is_admin, created, provider,is_deleted,token,createdAt,updatedAt) VALUES (?, ?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)`,
        [
          userId,
          fullName,
          email,
          hashedPassword,
          countryCode,
          phoneNumber || null,
          "",
          gender,
          newdob,
          1,
          0,
          CurrentDate,
          provider || null,
          0,
          null,
          CurrentDate,
          CurrentDate,
        ]
      );

    // Check if the insertion was successful
    if (result.affectedRows === 1) {
      // Generate OTP and handle further actions
      const otp = otpGenerator.generate(6, {
        upperCase: false,
        specialChars: false,
      });
      const now = new Date();
      const expirationTime = AddMinutesToDate(now, 3);

      // Save OTP and expiration time to database or use it for further actions
      const data = {
        user_id: email,
        otp: otp,
        expire_DateTime: expirationTime,
      };

      // Send email, etc.
      // ...

      res.status(201).json({ message: "User added successfully" });
    } else {
      res.status(500).json({ error: "Failed to add user" });
    }
  } catch (error) {
    console.error("Error executing SQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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

exports.login = async (req, res) => {
  let { loginId, password } = req.body;

  try {
    if (loginId === "" || password === "") {
      res.status(400).json({ message: "Enter Both" });
    }

    if (!validateEmail(loginId)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    // console.log('email--',isEmail);
    //let user = null;
    // const [isEmail] = await con
    // .promise()
    // .query(`SELECT email FROM users WHERE email = ?`, [loginId]);
    // console.log('email--',isEmail);

    const [user] = await con
      .promise()
      .query(`SELECT * FROM users WHERE email = ?`, [loginId]);

      console.log("users 179--",user)
    if (user[0].length <=0) {
      return res.status(400).json({ error: "User doesn't exist" });
    }
    console.log("Users-- 183", user);
    if (user[0].is_verfied) {
      return res.status(400).json({ error: "Your email is not verified" });
    }

    //   else{
    //   user = await User.findOne({
    //     where: {
    //       phone: loginId,
    //     },
    //   });
    //   if (!user) {
    //     return errorFunc(res,400,noUser)
    //   }
    //   if (user.dataValues.is_verfied) {
    //     return errorFunc(res,400,"Your Phone Number is not verfied Yet")
    //   }
    // }
    // console.log(user.dataValues.password);
    // console.log("user22----",user);

    let pass = await VerifyPassword(password,user[0].password);
    console.log("pass 206--",pass)
    if (!pass) {
      return res.status(400).json({ error: "incorrect  password" });
    }

    const token = await generateToken(req, res, user.user_id);
    //let userUpdate = null;
    
      const [userUpdate] = await con
        .promise()
        .query(`UPDATE users SET token = ? WHERE email = ?`, [token, loginId]);
    

    console.log("User Update--217",userUpdate)
    if (!userUpdate) {
      return res.status(400).json({ error: "Something went wrong" });
    }
    return res.status(200).json({ error: "Success" });
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};
