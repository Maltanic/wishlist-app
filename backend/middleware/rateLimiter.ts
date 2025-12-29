import express from "express"
import ratelimit from "../config/upstash.ts";

const rateLimiter = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { success } = await ratelimit.limit("my-limit-key")

        if (!success) return res.status(429).json({ error: "Too many requests, please try again later" });

        next();
    } catch (error) {
        console.log("Rate limit error: ", error);
        next(error);
    }

    next();
}

export default rateLimiter;