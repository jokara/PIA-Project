"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    birthdate: {
        type: String
    },
    birthplace: {
        type: String
    },
    jmbg: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    type: {
        type: String
    },
    picture: {
        type: String
    }
});
exports.default = mongoose_1.default.model('User', User);
//# sourceMappingURL=user.js.map