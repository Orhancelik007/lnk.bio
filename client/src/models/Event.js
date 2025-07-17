const { Schema, model, models } = require("mongoose");

const EventSchema = new Schema({
    type: String, //click or view
    page: String, // 'yuaud'
    uri: String, // /yuaud | https://...

}, {timestamps: true});

export const Event = models?.Event || model('Event', EventSchema);