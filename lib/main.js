"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core = (0, tslib_1.__importStar)(require("@actions/core"));
const fn_1 = require("./fn");
const yarnlock_diff_1 = (0, tslib_1.__importDefault)(require("@yarn-tool/yarnlock-diff"));
async function run() {
    try {
        core.debug(new Date().toTimeString());
        await (0, fn_1.autoDeduplication)()
            .then(data => {
            if (!(data === null || data === void 0 ? void 0 : data.file)) {
                core.error(`yarn.lock not exists`);
            }
            else if (data === null || data === void 0 ? void 0 : data.yarnlock_changed) {
                core.info('\n' + (0, yarnlock_diff_1.default)(data.yarnlock_old, data.yarnlock_new));
            }
            else {
                core.info(`yarn.lock is good`);
            }
            core.setOutput('yarnlock_changed', !!(data === null || data === void 0 ? void 0 : data.yarnlock_changed));
        });
        core.debug(new Date().toTimeString());
        core.setOutput('time', new Date().toTimeString());
    }
    catch (error) {
        core.setFailed(error.message);
    }
}
exports.default = run();
//# sourceMappingURL=main.js.map