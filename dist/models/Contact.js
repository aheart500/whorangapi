"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Contact = new mongoose_1.Schema({
    name: String,
    number: String,
    owner: String,
});
exports.default = mongoose_1.model("Contact", Contact);
