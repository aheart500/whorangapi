"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Complain = new mongoose_1.Schema({
    username: String,
    email: String,
    mobile: String,
    subject: String,
    content: String,
});
exports.default = mongoose_1.model("Complain", Complain);
