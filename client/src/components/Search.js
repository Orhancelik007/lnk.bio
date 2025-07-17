"use server";
import { Page } from "@/models/Page";
import mongoose from "mongoose";

export default async function Search(search) {
  mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({ uri: search });
  if (page) {
    return true;
  }
  return false;
}
