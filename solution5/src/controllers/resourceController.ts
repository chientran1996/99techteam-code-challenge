import { Request, Response } from "express";
import Resource from "../models/Resource";


// List with filters
export const listResources = async (req: Request, res: Response) => {
    try {
        const { type, name } = req.query;
        const filter: any = {};
        if (type) filter.type = type;
        if (name) filter.name = { $regex: name, $options: "i" };
        const resources = await Resource.find(filter);
        res.json(resources);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

// Create
export const createResource = async (req: Request, res: Response) => {
    try {
        const resource = await Resource.create(req.body);
        res.status(201).json(resource);
    } catch (err) {
        res.status(400).json({ error: err });
    }
};

// Get by ID
export const getResource = async (req: Request, res: Response) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) return res.status(404).json({ message: "Not found" });
        res.json(resource);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

// Update
export const updateResource = async (req: Request, res: Response) => {
    try {
        const updated = await Resource.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updated) return res.status(404).json({ message: "Not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err });
    }
};

// Delete
export const deleteResource = async (req: Request, res: Response) => {
    try {
        const deleted = await Resource.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};