export type ElementConfig = [
    string,
    Record<string, string>?,
    (string | ElementConfig[])?,
];
