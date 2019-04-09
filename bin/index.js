#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
var commander = require("commander");
var open = require("open");
var chalk = require("chalk");
var puppeteer = require("puppeteer");
var mkdirp = require("mkdirp");
var Progress = require("progress");
var fs = require("fs");
commander
    .arguments("<number>")
    .description("원하는 백준 문제 번호를 입력해주세요.\n폴더가 생성될 곳에서 명령어를 실행해 주세요")
    .option("-p, --path <path>", "원하는 path를 설정해주세요. 안넣는다면 현재 디렉토리에 생성됩니다.")
    .action(function (number) {
    return __awaiter(this, void 0, void 0, function () {
        var bar, path, browser, page, sizeElement, height, response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bar = new Progress("running [:bar] :percent :etas", {
                        complete: "=",
                        incomplete: " ",
                        width: 20,
                        total: 10
                    });
                    path = commander.path ? commander.path : ".";
                    mkdirp.sync(path + "/" + number);
                    bar.tick();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, puppeteer.launch()];
                case 2:
                    browser = _a.sent();
                    bar.tick();
                    return [4 /*yield*/, browser.newPage()];
                case 3:
                    page = _a.sent();
                    bar.tick();
                    return [4 /*yield*/, page.goto("https://www.acmicpc.net/problem/" + number)];
                case 4:
                    _a.sent();
                    bar.tick();
                    return [4 /*yield*/, page.$(".content .row")];
                case 5:
                    sizeElement = _a.sent();
                    bar.tick();
                    return [4 /*yield*/, sizeElement.boundingBox()];
                case 6:
                    height = (_a.sent()).height;
                    bar.tick();
                    return [4 /*yield*/, page.screenshot({
                            path: path + "/" + number + "/problem.png",
                            clip: { x: 0, y: 308, height: height - 160, width: 800 }
                        })];
                case 7:
                    _a.sent();
                    bar.tick();
                    bar.tick();
                    fs.copyFileSync("./bin/main.cpp", path + "/" + number + "/main.cpp");
                    bar.tick();
                    return [4 /*yield*/, open("https://www.acmicpc.net/submit/" + number, { wait: false })];
                case 8:
                    response = _a.sent();
                    if (response instanceof Error) {
                        console.log(chalk.default.red(response.message));
                    }
                    else {
                        bar.tick();
                        console.log(chalk.default.yellow("Complete Hack Your Code! on " + number));
                        process.exit(1);
                    }
                    return [3 /*break*/, 10];
                case 9:
                    err_1 = _a.sent();
                    console.log(chalk.default.red(err_1));
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
})
    .parse(process.argv);
//# sourceMappingURL=index.js.map