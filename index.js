const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Spirit = require('./models/Spirit'); // המודל החדש שיצרנו
const auth = require('./middleware/auth'); // ה-middleware החדש

// הגדרות אפליקציה
const app = express();
app.use(express.json());
app.use(cors());

// קונפיגורציה
const JWT_SECRET = 'your-secret-key';
const PORT = 5000;

// חיבור ל-MongoDB
mongoose.connect('mongodb://localhost:27017/my_spirits_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// --- מסלולי אימות ---
// מסלול הרשמה
app.post('/api/auth/register', async (req, res) => {
    // קוד ההרשמה נשאר ללא שינוי
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(400).json({ message: 'Error registering user', error: err.message });
    }
});

// מסלול התחברות
app.post('/api/auth/login', async (req, res) => {
    // קוד ההתחברות נשאר ללא שינוי
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Logged in successfully!', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// --- מסלולים עבור הבקבוקים (עם הגנה) ---

// הוספת בקבוק חדש (דורש אימות)
app.post('/api/spirits', auth, async (req, res) => {
    try {
        const { name, type, producer, country, alcohol_percentage, volume_ml, quantity, image_url, status, notes, purchase_date, purchase_price, specifics } = req.body;

        const spirit = new Spirit({
            name, type, producer, country, alcohol_percentage, volume_ml, quantity, image_url, status, notes, purchase_date, purchase_price, specifics,
            user: req.user.id // לקיחת ה-ID של המשתמש מה-middleware
        });

        const newSpirit = await spirit.save();
        res.status(201).json(newSpirit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// קבלת כל הבקבוקים של המשתמש המחובר (דורש אימות)
app.get('/api/spirits', auth, async (req, res) => {
    try {
        const spirits = await Spirit.find({ user: req.user.id }); // סינון לפי המשתמש המחובר
        res.json(spirits);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// הפעלת השרת
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});