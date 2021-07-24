export declare function autoDeduplication(cwd?: string): Promise<{
    rootData: import("@yarn-tool/find-root").IFindRootReturnType;
    file: string;
    yarnlock_old: string;
    yarnlock_new: string;
    yarnlock_changed: boolean;
}>;
