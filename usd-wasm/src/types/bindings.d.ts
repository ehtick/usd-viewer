
declare type FSNode = {
    contents: ArrayLike,
    id: number,
    mode: number,
    name: string,
    timestamp: number,
    isFolder: boolean,
    isDevice: boolean,
    read: boolean,
    write: boolean,
}

declare type USD = {
    FS_createDataFile: (parent: string, filepath: string, data: Uint8Array, canRead: boolean, canWrite: boolean, canOwn: boolean) => FSNode,
    FS_createPath: (parent: string, path: string, canRead: boolean, canWrite: boolean) => FSNode,
    FS_unlink: (path: string) => void,
    FS_readdir: (path: string) => string[],
    FS_rmdir: (path: string) => void,
    FS_analyzePath: (path: string) => FSNode,
    HdWebSyncDriver: new (delegate: hydraDelegate, filepath: string) => HdWebSyncDriver,
    flushPendingDeletes: () => void,
    ready: Promise<any>,
    debug: boolean;
    calledRun: boolean;
    stderr: any;
    stdin: any;
    stdout: any;
};

declare type USDStage = {
    GetStartTimeCode(): number,
    GetEndTimeCode(): number,
    GetTimeCodesPerSecond(): number,
    GetUpAxis(): number,
}

declare type HdWebSyncDriver = {
    getFile: (path: string, cb: (loadedFile: ArrayBufferLike) => void) => void,
    GetStage: () => USDStage,
    SetTime(timecode: number): void,
    GetTime(): number,
    Draw(): void,

    /** ??? */
    clone(): HdWebSyncDriver,
    /** ??? */
    delete(): void,
    /** ??? */
    deleteLater(): void,
    isDeleted(): boolean,
    /** ??? */
    isAliasOf(): boolean,
}

export type GetUsdModuleOptions = {
    debug?: boolean,
    mainScriptUrlOrBlob?: string,
    wasmBinary?: ArrayBufferLike,
    locateFile?: (path: string) => string,
    getPreloadedPackage?: (file: string, size: number) => ArrayBuffer | null,
    setStatus?: (status: string) => void,
    onDownloadProgress?: (downloaded: number, total: number) => void,
    /** Returns a transferable object that can be resolved to an ArrayBuffer, 
     *  or an URL that can be fetched to get an ArrayBuffer.
    */
    urlModifier?: (url: string) =>
        Promise<
            ArrayBuffer | File | FileSystemFileHandle | FileSystemFileEntry | string
        > | ArrayBuffer | File | FileSystemFileHandle | FileSystemFileEntry | string,
}

/**
 * Loads the USD Module.
 * @example
 * ```javascript
 * getUsdModule({ mainScriptUrlOrBlob: "/emHdBindings.js" }).then(USD => { ... })
 * ```
 */
export function getUsdModule(opts?: GetUsdModuleOptions): Promise<USD>;

export type USDRoot = {}