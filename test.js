"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
// test.ts
var serverless_1 = require("@neondatabase/serverless");
var sql = (0, serverless_1.neon)(process.env.DATABASE_URL);
var res = await sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT 1"], ["SELECT 1"])));
console.log(res);
var templateObject_1;
