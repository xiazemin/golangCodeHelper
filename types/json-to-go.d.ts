export = jsonToGo;
declare function jsonToGo(json: any, typename: any, flatten?: boolean, example?: boolean, allOmitempty?: boolean): {
    go: string;
    error: any;
} | {
    go: string;
    error?: undefined;
};
declare namespace jsonToGo {
    export { jsonToGo };
}
