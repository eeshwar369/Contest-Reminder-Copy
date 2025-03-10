const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (req, res) => {
  // console.log("getting into this block!!");
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db('users').insert({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await db('users').where({ email }).first();
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  };

exports.subscribeUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    // Check if user exists
    const user = await db("users").where({ email }).first();
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update subscription status
    await db("users").where({ email }).update({ subscribed: 1 });
    

    res.json({ message: "You are now subscribed to contest notifications!" });
  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).json({ message: "Error subscribing" });
  }
};

  