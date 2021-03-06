"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./apis/agendas/helpers");
var getConfig = require("./config").getConfig;
var logger = require("./util/logger");
var __updateTimeoutTasksIntervalHandler = null;
var __checkRetailerServicesHealthIntervalHandler = null;
var __removeTimeoutTaskJobIntervalHandler = null;
function setupIntervalAgendas() {
    return __awaiter(this, void 0, void 0, function () {
        var taskTimeout_1, intervalCheckAS, timeoutCreatedAt_1, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, helpers_1.updateTimeoutTasks()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, helpers_1.checkRetailerServicesHealth()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, helpers_1.removeTimeoutTaskJob()];
                case 3:
                    _a.sent();
                    clearInterval(__updateTimeoutTasksIntervalHandler);
                    clearInterval(__checkRetailerServicesHealthIntervalHandler);
                    clearInterval(__removeTimeoutTaskJobIntervalHandler);
                    taskTimeout_1 = getConfig("TASK_TIMEOUT_CHECK_TIME");
                    intervalCheckAS = getConfig("RETAILER_STATE_CHECK_TIME");
                    timeoutCreatedAt_1 = getConfig("TASK_JOB_TIMEOUT") * 0.2;
                    __updateTimeoutTasksIntervalHandler = setInterval(function () {
                        logger.info("start updateTimeoutTasks ... ", {
                            function: "setupIntervalAgendas",
                            taskTimeout: taskTimeout_1,
                        });
                        helpers_1.updateTimeoutTasks();
                    }, taskTimeout_1);
                    __checkRetailerServicesHealthIntervalHandler = setInterval(function () {
                        logger.info("start checkRetailerServicesHealth ... ", {
                            function: "setupIntervalAgendas",
                            taskTimeout: taskTimeout_1,
                        });
                        helpers_1.checkRetailerServicesHealth();
                    }, intervalCheckAS);
                    __removeTimeoutTaskJobIntervalHandler = setInterval(function () {
                        logger.info("start removeTimeoutTaskJob ... ", {
                            function: "setupIntervalAgendas",
                            timeoutCreatedAt: timeoutCreatedAt_1,
                        });
                        helpers_1.removeTimeoutTaskJob();
                    }, timeoutCreatedAt_1);
                    logger.info("successful setupIntervalAgendas", {
                        function: "setupIntervalAgendas",
                        taskTimeout: taskTimeout_1,
                        intervalCheckAS: intervalCheckAS,
                    });
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    logger.error("setupIntervalAgendas fail. Error: " + err_1.message, {
                        function: "setupIntervalAgendas",
                        error: err_1,
                    });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.setupIntervalAgendas = setupIntervalAgendas;
