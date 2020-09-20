"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var Complains_1 = __importDefault(require("./models/Complains"));
var Contact_1 = __importDefault(require("./models/Contact"));
var PORT = process.env.PORT || 3002;
var MONGODB_URI = process.env.MONGO;
console.log(MONGODB_URI);
var app = express_1.default();
app.use(express_1.default.json());
mongoose_1.default
    .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(function () { return console.log("MongoDB connected sucessfully"); })
    .catch(function (err) { return console.log(err.message); });
app.post("/contacts", function (req, res) {
    var _a;
    var _b = req.body, owner = _b.owner, contacts = _b.contacts, by = _b.by, value = _b.value;
    if (contacts) {
        var contactsToSave = contacts;
        if (owner) {
            contactsToSave = contacts.map(function (contact) { return (__assign(__assign({}, contact), { owner: owner })); });
        }
        Contact_1.default.insertMany(contactsToSave);
    }
    Contact_1.default.find((_a = {}, _a[by] = { $regex: value, $options: "i" }, _a))
        .select("name number owner")
        .limit(15)
        .then(function (contacts) { return res.send(contacts); })
        .catch(function () { return res.status(400).send("Error"); });
});
app.get("/contacts/:by/:value/:offset", function (req, res) {
    var _a;
    console.log(req.params);
    var _b = req.params, by = _b.by, value = _b.value, offset = _b.offset;
    Contact_1.default.find((_a = {}, _a[by] = { $regex: value, $options: "i" }, _a._id = { $gt: offset }, _a))
        .select("name number owner")
        .limit(20)
        .then(function (contacts) { return res.send(contacts); })
        .catch(function () { return res.status(400).send("Error"); });
});
app.post("/complains", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, Complains_1.default.create(req.body)];
            case 1:
                _a.sent();
                res.send("done");
                return [3, 3];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
app.listen(PORT, function () {
    console.log("App is listening on " + PORT);
});
