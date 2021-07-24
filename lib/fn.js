"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoDeduplication = void 0;
const path_1 = require("path");
const yarnlock_dedupe_1 = require("@yarn-tool/yarnlock-dedupe");
const fs_1 = require("fs");
const find_root_1 = require("@yarn-tool/find-root");
async function autoDeduplication(cwd) {
    const rootData = (0, find_root_1.findRootLazy)({
        cwd,
    });
    if (rootData === null || rootData === void 0 ? void 0 : rootData.root) {
        const file = (0, path_1.join)(rootData.root, 'yarn.lock');
        const data = (0, fs_1.readFileSync)(file, 'utf-8');
        let ret = (0, yarnlock_dedupe_1.yarnDedupe)(data);
        if (ret.yarnlock_changed) {
            (0, fs_1.writeFileSync)(file, ret.yarnlock_new);
        }
        return {
            ...ret,
            rootData,
            file,
        };
    }
}
exports.autoDeduplication = autoDeduplication;
//# sourceMappingURL=fn.js.map