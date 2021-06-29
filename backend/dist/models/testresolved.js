"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Testresolved = new Schema({
    UsernameUser: {
        type: String
    },
    NameUser: {
        type: String
    },
    SurnameUser: {
        type: String
    },
    Birthdate: {
        type: String
    },
    Name: {
        type: String
    },
    StartDate: {
        type: String
    },
    EndDate: {
        type: String
    },
    About: {
        type: String
    },
    Id: {
        type: String
    },
    Creator: {
        type: String
    },
    Locked: {
        type: String
    },
    Time: {
        type: String
    },
    QuestionsByPage: {
        type: String
    },
    Questions: {
        type: Array()
    }
});
exports.default = mongoose_1.default.model('Testresolved', Testresolved);
//# sourceMappingURL=testresolved.js.map