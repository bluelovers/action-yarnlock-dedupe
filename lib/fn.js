"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoDeduplication = void 0;
const path_1 = require("path");
const yarnlock_dedupe_1 = require("@yarn-tool/yarnlock-dedupe");
const promises_1 = require("fs/promises");
const find_root_1 = require("@yarn-tool/find-root");
async function autoDeduplication(cwd) {
    const rootData = (0, find_root_1.findRootLazy)({
        cwd,
    });
    if (rootData === null || rootData === void 0 ? void 0 : rootData.root) {
        const file = (0, path_1.join)(rootData.root, 'yarn.lock');
        return (0, promises_1.readFile)(file, 'utf-8')
            .then(async (data) => {
            let ret = (0, yarnlock_dedupe_1.yarnDedupe)(data);
            if (ret.yarnlock_changed) {
                await (0, promises_1.writeFile)(file, ret.yarnlock_new);
            }
            return {
                ...ret,
                rootData,
                file,
            };
        });
    }
}
exports.autoDeduplication = autoDeduplication;
//# sourceMappingURL=fn.js.map