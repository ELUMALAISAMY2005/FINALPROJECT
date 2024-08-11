import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userModel from "./schema.js";
import bcrypt from "bcrypt";

userModel
const app = express();
mongoose.connect("mongodb+srv://ELUMALAISAMY2005:password2005@cluster0.4p9v8n6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
  console.log("Connected to MongoDB");
}).catch((err) => console.log(err))

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'home.html'));
});

app.get('/recipe', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'recipe.html'));
});

app.post('/signup', async (req, res) => {
  try {
      const { name, email, password } = req.body;

      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password

      // Create a new user
      const newUser = new userModel({
          name,
          email,
          password,
      });

      // Save the user to the database
      await newUser.save();
      res.status(200).json({ message: 'Signup data received' });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Signup failed' });
  }
});
app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await userModel.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the stored password directly
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Sign-in successful
        return res.status(200).json({ message: 'Sign in successful' });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Sign in failed' });
    }
});

  

app.use((req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'error404.html'));
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});

