const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to MongoDB using Mongoose"))
.catch(err => console.log("Could not connect to MongoDB", err));

passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username: username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Incorrect username or password.' })
    }
    return done(null, user);
}));

passport.serializeUser((user, done) => { done(null, user.id); });
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', userSchema);

const courseSchema = new mongoose.Schema({
    name: String,
    teacher: String,
    description: String,
    semester: String,
    timing: String,
    classNumber: String,
    isFull: Boolean,
});
const Course = mongoose.model('Course', courseSchema);

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
    return next();
};



app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/register', (req, res)=>{
    res.render('register');
})

app.post('/api/register', async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const newUser = new User({ username: req.body.username, password: hashedPassword });
        await newUser.save();
        res.redirect('/api/login');
    } catch (error) {
        console.error(error, "Error has occurred while registering");
        res.status(500).json({ message: "Error during registration" });
    }
});

app.get('/login', (req, res)=>{
    res.render('login')
});


app.post('/api/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ success: false, message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ success: true, message: 'Login successful', token, user: { username: user.username } });
        });
    })(req, res, next);
});


app.post('/api/logout', (req, res) => {
    req.logout();
    res.status(200).send('Logged out');
});

app.get('/api/protected-route', verifyToken, (req, res) => {
    res.send('This is a protected route');
});

  app.get('/api/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).send('Error fetching from database');
    }
});

app.get('/api/courses/:id', async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      res.json(course);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

app.post('/api/courses', async (req, res) => {
    const { name, teacher, description, semester, timing, classNumber, isFull } = req.body;
  
    const course = new Course({ name, teacher, description, semester, timing, classNumber, isFull });
  

    try {
        const result = await course.save();
        console.log("Saved to the database", result);
        res.status(201).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error saving to database');
    }
});

app.delete('/api/courses/:id', async (req, res) => {
    const courseID = req.params.id;
    try {
        await Course.findByIdAndDelete(courseID);
        res.send(`Course with ID ${courseID} has been deleted.`);
    } catch (err) {
        console.error(err);
        res.status(404).send(`Course with ID ${courseID} not found.`);
    }
});

app.put('/api/courses/:id', async (req, res) => {
    try {
      const updatedCourse = await Course.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true }
      );
      res.json(updatedCourse);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

app.use(express.static(path.join(__dirname, 'course-frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'course-frontend/build', 'index.html'));
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
