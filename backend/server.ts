// ========== Imports ========== //
import connectDB from './config/db.ts';
import dotenv from 'dotenv'
import express from 'express'

// Routes
import wishRoutes from './routes/wishRoutes.ts'
import rateLimiter from './middleware/rateLimiter.ts';

// ========== dotenv ============ //
dotenv.config();

// ========== Server set up ========== //
const app = express();
const PORT = process.env.PORT || 3000;

// ========== Middleware ========== //
app.use(express.urlencoded({ extended: true }));

// Log the request
app.use((req: express.Request, _res: express.Response, next) => {
    const date = new Intl.DateTimeFormat('en-GB', {
        dateStyle: "medium",
        timeStyle: "long"
    }).format(new Date());
    
    console.log(`${req.method} ${req.url} @ ${date}`);
    next();
});

// Authenticate user

// Rate limiter
app.use(rateLimiter);

// ========== Routes ========== //
app.use("/api/wish", wishRoutes);

// ========== Connect to DB and listen to port ========== //
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port: ${PORT}`)
    });
});