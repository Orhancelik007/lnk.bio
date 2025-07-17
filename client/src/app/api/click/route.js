import { Event } from "@/models/Event";
import mongoose from "mongoose";

export async function POST(req){
    mongoose.connect(process.env.MONGO_URI);
    const url = new URL(req.url);
    const clickedLink = atob(url.searchParams.get('url'));
    const page = url.searchParams.get('page');
    await Event.create({type:'click', page, uri: clickedLink});
    return Response.json(true);
}