require('dotenv').config();

const Profile = require('./model/profile');
const User = require('./model/user');
const express = require('express');
const multer = require('multer');
const path = require('path');

const cors = require('cors');
const connectDB = require('./db/connect');
const jwt = require('jsonwebtoken');
const Routine = require('./model/routine')

const ClassTest = require('./model/classTest');
const Assignment = require('./model/assignment');
const LabQuiz = require('./model/labQuiz');
// const Schedule = require('./model/schedule');

const bcrypt = require('bcrypt');
const profile = require('./model/profile');
const labQuiz = require('./model/labQuiz');

const app = express();


app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());





// set up multer storage 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define the destination folder for uploaded files
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Define the filename for uploaded files
        cb(null, Date.now() + '-' + file.originalname);
    }
});


// Create a Multer instance with the defined storage
const upload = multer({ storage: storage });

// Use the Multer middleware for a specific route

app.patch('/profile', authenticateToken, async (req, res) => {
    try {
        const { name, dob, mobile, roll, blood, nickname, favPersonality, pov, candle, favMoment, favQoute, facebook, instagram, github, gender, bio } = req.body;
        const profile = await Profile.findOne({ roll: req.student.id });
        if (!profile) {
            return res.status(400).json({ error: 'no profile found or unauthorized' });
        }
        profile.name = name;
        profile.dob = dob;
        profile.mobile = mobile;
        profile.blood = blood;
        profile.nickname = nickname;
        profile.favMoment = favMoment;
        profile.favPersonality = favPersonality;
        profile.pov = pov;
        profile.candle = candle;
        profile.favQoute = favQoute;
        profile.facebook = facebook;
        profile.instagram = instagram;
        profile.github = github;
        profile.gender = gender;
        profile.bio = bio;
        await profile.save();
        res.status(200).json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ succces: false });
    }
})


app.patch('/profile/imageurl', authenticateToken, async (req, res) => {
    try {
        const { imageUrl } = req.body;
        const profile = await Profile.findOne({ roll: req.student.id });
        if (!profile) {
            return res.status(400).json({ error: 'no profile found or unauthorized' });
        }
        profile.profilePicture = imageUrl; 
        await profile.save();
        res.status(200).json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ succces: false });
    }
})



app.patch('/upload', upload.single('myFile'), authenticateToken, async (req, res) => {
    try {
        const file = req.file;
        console.log(file);
        if (!file) {
            return res.status(400).json({ error: 'no profile picture found or unauthorized' });
        }
        const profile = await Profile.findOne({ roll: req.student.id });
        if (!profile) {
            return res.status(400).json({ error: 'no profile found or unauthorized' });
        }
        profile.profilePicture = file.path;
        await profile.save();
        res.status(200).json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ succces: false });
    }
})










app.get('/', (req, res) => {
    console.log("Server is runnning at http:localhost:3000")
    res.send('Hey this is my API running 🥳');
})


app.get('/profile/all', async (req, res) => {
    try {
        const profiles = await Profile.find();
        if (!profiles) {
            return res.status(404).json({ msg: 'no profile found' });
        }
        res.status(200).json(profiles);
    } catch (error) {
        return res.json({ message: error });
    }
})



// classtest schedules

app.post('/classtest', async (req, res) => {
    try {
        const { title, venue, date, teacher, from, to } = req.body;
        const ct = new ClassTest();
        ct.title = title;
        ct.venue = venue;
        ct.date = date;
        ct.teacher = teacher;
        ct.from = from;
        ct.to = to;
        await ct.save();
        res.status(201).json(ct);
    } catch (error) {
        res.json({ message: error.message });
    }
})

app.get('/classtest', async (req, res) => {
    try {
        const ct = await ClassTest.find();
        if (!ct) {
            return res.json({ message: 'no routine found' });
        }
        res.status(200).json(ct);
    } catch (error) {
        res.json({ message: error.message });
    }
})

app.patch('classtest', async (req, res) => {
    try {
        const { completed } = req.body;

    } catch (error) {

    }
})




// assignment schedules 

app.post('/assignment', async (req, res) => {
    try {
        const { title, venue, date, teacher, from, to } = req.body;
        const ct = new Assignment();
        ct.title = title;
        ct.venue = venue;
        ct.date = date;
        ct.teacher = teacher;
        ct.from = from;
        ct.to = to;
        await ct.save();
        res.status(201).json(ct);
    } catch (error) {
        res.json({ message: error.message });
    }
})

app.get('/assignment', async (req, res) => {
    try {
        const ct = await Assignment.find();
        if (!ct) {
            return res.json({ message: 'no routine found' });
        }
        res.status(200).json(ct);
    } catch (error) {
        res.json({ message: error.message });
    }
})



// lab quiz schedules 
app.post('/labquiz', async (req, res) => {
    try {
        const { title, venue, date, teacher, from, to } = req.body;
        const ct = new LabQuiz();
        ct.title = title;
        ct.venue = venue;
        ct.date = date;
        ct.teacher = teacher;
        ct.from = from;
        ct.to = to;
        await ct.save();
        res.status(201).json(ct);
    } catch (error) {
        res.json({ message: error.message });
    }
})

app.get('/labquiz', async (req, res) => {
    try {
        const ct = await LabQuiz.find();
        if (!ct) {
            return res.json({ message: 'no routine found' });
        }
        res.status(200).json(ct);
    } catch (error) {
        res.json({ message: error.message });
    }
})








app.get('/schedules/:date', async (req, res) => {
    try {
        const requestedDate = new Date(req.params.date);

        // Find schedules that match the requested date
        const schedules = await Schedule.find({
            deadline: {
                $gte: requestedDate, // Greater than or equal to the requested date
                $lt: new Date(requestedDate.getTime() + 24 * 60 * 60 * 1000) // Less than the next day
            }
        });

        res.json(schedules);
    } catch (error) {
        res.json({ message: error.message });
    }
});

app.get('/schedules', async (req, res) => {
    try {
        const allSchedules = await Schedule.find();
        if (!allSchedules) {
            return res.json({ message: 'no schedules found' });
        }
        res.json(allSchedules);
    } catch (error) {
        res.json({ message: error.message });
    }
});












app.post('/scedules', async (req, res) => {
    try {
        const { title, body, deadline } = req.body;
        if (!title || !body) {
            return res.json({ message: 'please provide title and body' })
        }
        const schedule = new Schedule();
        schedule.title = title;
        schedule.body = body;
        schedule.deadline = deadline;
        await schedule.save();
    } catch (error) {
        res.json({ message: error });
    }
})



app.post('/routines', async (req, res) => {
    try {
        const routines = new Routine(req.body);
        await routines.save();
        res.json({ routines });
    } catch (error) {
        res.json({ message: error });
    }
})

app.patch('/routines/:sec', async (req, res) => {
    try {
        const updateRoutine = await Routine.updateOne({ section: req.params.sec }, req.body);
        if (updateRoutine.nModified === 0) {
            return res.json({ message: 'Section is invalid' });
        }
        res.json({ message: 'update successful' });
    } catch (error) {
        res.json({ message: error });
    }
})

app.delete('/routines/:sec', async (req, res) => {
    try {
        const deleteRoutine = await Routine.deleteOne({ section: req.params.sec })
        if (deleteRoutine.deletedCount === 0) {
            return res.json({ message: 'invalid section name' });
        }
        res.json({ message: 'delete successful' });
    } catch (error) {
        res.json({ message: error });
    }
})



































///authorized user only 




app.get('/protected', authenticateToken, async (req, res) => {
    try {
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(401);
    }
})

















app.get('/profile', authenticateToken, async (req, res) => {
    try {
        const profile = await Profile.find({ roll: req.student.id });
        if (!profile) {
            return res.json({ message: 'No profile found' });
        }
        res.json(profile);
    } catch (error) {
        return res.json({ message: error })
    }
})

app.get('profile/all', async (req, res) => {
    try {
        const profiles = await Profile.find();
        if (!profiles) {
            return res.status(404).json({ msg: 'no profile found' });
        }
        res.status(200).json(profiles);
    } catch (error) {
        return res.json({ message: error });
    }
})




app.get('/routines', authenticateToken, async (req, res) => {
    try {
        const roll = req.student.id;
        if (Number(roll) < 2007061) {
            const section = 'A';
            const routine = await Routine.find({ section: section });
            if (!routine) {
                return res.sendStatus(404);
            }
            res.json(routine);
        } else {
            const section = 'B';
            const routine = await Routine.find({ section: section });
            if (!routine) {
                return res.sendStatus(404);
            }
            res.json(routine);
        }
    } catch (error) {
        res.json({ message: error });
    }
})








app.patch('/attendance/:logic/:courseCode', authenticateToken, async (req, res) => {
    try {
        const profile = await Profile.findOne({ roll: req.studentID });
        if (!profile) {
            return res.json({ message: 'No profile found' });
        }
        const courseCode = req.params.courseCode;
        if (req.params.logic === 'true') {
            const currentCount = profile.attendance.get(courseCode) || 0;
            profile.attendance.set(courseCode, currentCount + 1);
            await profile.save();
            res.json({ message: 'Attendance updated successfully' });
        } else {
            res.json({ message: 'Attendance not updated' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



app.post('/refresh', async (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        return res.sendStatus(401);
    }

    const user = await User.findOne({ refreshToken: req.body.refreshToken });
    if (!user) {
        return res.sendStatus(401);
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, student) => {
        if (err) {
            return res.sendStatus(403);
        }
        const accessToken = jwt.sign(student, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
        res.status(200).json({ accessToken: accessToken });
    });
});




app.delete('/logout', async (req, res) => {
    try {
        const { refreshToken } = req.query;
        console.log(refreshToken);
        if (!refreshToken) {
            return res.status(401).json({ msg: `refreshToken is not sent to the database` });
        }

        const user = await User.findOneAndUpdate(
            { refreshToken: refreshToken },
            { $unset: { refreshToken: 1 } }, // Remove the refreshToken field
            { new: true } // To return the updated user
        );

        if (!user) {
            return res.status(401).json({ msg: `no user found` });
        }
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/register', async (req, res) => {
    try {
        const { name, mobile, dob, blood, studentID, password, gender } = req.body;
        if (!studentID || !password || !name || !mobile || !dob || !blood || !gender) {
            return res.status(400).json({ message: 'please enter all the details' })
        }
        const userExist = await User.findOne({ studentID: req.body.studentID });
        if (userExist) {
            return res.status(409).json({ message: `user already exists with the given student ID ${req.body.studentID}` })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User();
        user.password = hashedPassword;
        user.studentID = studentID;
        await user.save();

        const profile = new Profile();
        profile.roll = studentID;
        profile.name = name;
        profile.mobile = mobile;
        profile.dob = dob;
        profile.blood = blood;
        profile.gender = gender;
        if (gender.toLowerCase() === 'male') {
            profile.profilePicture = "https://res.cloudinary.com/dabzeeh4f/image/upload/v1697584315/eq2hr4y2ftatoiioufth.jpg"
        }
        else if (gender.toLowerCase() === 'female') {
            profile.profilePicture = "https://res.cloudinary.com/dabzeeh4f/image/upload/v1697584441/bdb4w00gkyvkqkq90azd.jpg"
        }
        else {
            profile.profilePicture = "https://res.cloudinary.com/dabzeeh4f/image/upload/v1697584315/eq2hr4y2ftatoiioufth.jpg"
        }
        await profile.save();

        // now authorize the user with a token 
        const student = { id: studentID }; // this is the payload 
        const accessToken = jwt.sign(student, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
        const refreshToken = jwt.sign(student, process.env.REFRESH_TOKEN_SECRET);
        user.refreshToken = refreshToken;
        await user.save();
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (error) {
        return res.json({ message: error });
    }
})



app.post('/login', async (req, res) => {
    try {
        const { studentID, password } = req.body;
        if (!studentID || !password) {
            return res.sendStatus(400);
        }
        const userExist = await User.findOne({ studentID: req.body.studentID });
        if (!userExist) {
            return res.sendStatus(404);
        }
        const isPasswordMatched = await bcrypt.compare(password, userExist.password);
        if (!isPasswordMatched) {
            return res.sendStatus(401);
        }
        const student = { id: studentID };
        const accessToken = jwt.sign(student, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
        const refreshToken = jwt.sign(student, process.env.REFRESH_TOKEN_SECRET);
        userExist.refreshToken = refreshToken;
        await userExist.save();
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (error) {
        res.json({ message: error });
    }
})



function isAccessTokenExpired(accessToken) {
    try {
        // Decode the access token
        const decodedToken = jwt.decode(accessToken, { complete: true });

        // Check if the token has an expiration time
        if (decodedToken && decodedToken.payload && decodedToken.payload.exp) {
            // Get the expiration timestamp (in seconds)
            const expirationTime = decodedToken.payload.exp;

            // Get the current time (in seconds)
            const currentTime = Math.floor(Date.now() / 1000);

            // Compare the expiration time with the current time
            return expirationTime < currentTime;
        }

        // If the token doesn't have an expiration time, consider it expired
        return true;
    } catch (error) {
        console.error('Error decoding or checking expiration of access token:', error);
        // If there's an error, you might want to consider the token expired to be cautious
        return true;
    }
}






function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) {
        return res.sendStatus(401);
    }

    if (isAccessTokenExpired(token)) {
        console.log('you have a accessToken expired but is expired');
        return res.status(401).json({ msg: `you have a accessToken but it is expired` });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, student) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.student = student;
        next();
    });
}

async function start() {
    try {
        await connectDB(process.env.MONGO_URI)
    } catch (error) {
        console.log(error);
    }
}

start();
const port = 3000 || process.env.port
app.listen(3000,()=>{
    console.log("Server is running at http://localhost:3000/")
});
