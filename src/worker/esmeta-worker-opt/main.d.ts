declare interface Mocking {
    state: {
        isMocking: boolean;
    }
}
declare const ESMetaDebugger: Promise<Mocking>;