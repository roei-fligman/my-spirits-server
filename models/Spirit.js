const mongoose = require('mongoose');

const spiritSchema = new mongoose.Schema({
    // שדות בסיסיים שרלוונטיים לכל סוגי המשקאות
    name: { type: String, required: true },
    type: { type: String, required: true }, // לדוגמה: Whisky, Wine, Gin
    producer: { type: String },
    country: { type: String },
    alcohol_percentage: { type: Number },
    volume_ml: { type: Number },
    quantity: { type: Number, default: 1 },
    image_url: { type: String }, // כתובת ה-URL לתמונה
    status: { type: String, enum: ['new', 'open', 'finished'], default: 'new' },
    notes: { type: String },
    purchase_date: { type: Date },
    purchase_price: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // קשר למשתמש שיצר את הבקבוק

    // שדות דינמיים המותאמים לסוג המשקה
    specifics: {
        // המבנה הגמיש של MongoDB מאפשר לנו לשמור כאן מידע ספציפי
        // לדוגמה:
        // {
        //     age: 12,
        //     bottler: "Gordon & MacPhail",
        //     natural_color: true
        // }
    }
}, { timestamps: true });

module.exports = mongoose.model('Spirit', spiritSchema);