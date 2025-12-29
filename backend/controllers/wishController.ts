import express from "express";

import Wish from "../models/Wish.ts";

export async function getAllWishes(_req: express.Request, res: express.Response) {
    try {
        const wishes = await Wish.find(); 

        res.status(200).json(wishes);

    } catch (error) {
        console.error("Error on GETting all wishes: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function getWishById(req: express.Request, res: express.Response) {
    try {
        const { id } = req.params;

        const wish = await Wish.findById(id); 

        if (!wish) return res.status(404).json({ error: `No wish found with id: ${id}` });

        res.status(200).json(wish);

    } catch (error) {
        console.error("Error on GETting wish: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function createWish(req: express.Request, res: express.Response) {
    try {
        const { title, link } = req.body;
        const newWish = new Wish({ title, link });

        await newWish.save();

        res.status(201).json({ success: `Wish created succesfully with _id: ${newWish._id}` });

    } catch (error) {
        console.error("Error on creating a wish: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function updateWish(req: express.Request, res: express.Response) {
    try {
        const { id } = req.params;
        const { title, link } = req.body;

        const filter = { _id: id };
        const update = { title, link}

        const wish = await Wish.findOneAndUpdate(filter, update);

        if (!wish) return res.status(404).json({ error: `No wish found with id: ${id}` });
        
        res.status(200).json({ success: `Wish updated succesfully with _id: ${wish._id}` })

    } catch (error) {
        console.error("Error on creating a wish: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function deleteWish(req: express.Request, res: express.Response) {
    try {
        const { id } = req.params;

        const filter = { _id: id };

        const wish = await Wish.findOneAndDelete(filter);

        if (!wish) return res.status(404).json({ error: `No wish found with id: ${id}` });
        
        res.status(200).json({ success: `Wish deleted succesfully with _id: ${wish._id}` })

    } catch (error) {
        console.error("Error on creating a wish: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}