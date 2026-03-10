import { SVGProps } from '../../../node_modules/react';
declare const paths: {
    readonly search: "M11.5 3a8.5 8.5 0 1 0 5.38 15.08l3.52 3.52 1.6-1.6-3.53-3.52A8.5 8.5 0 0 0 11.5 3Zm0 2.25a6.25 6.25 0 1 1 0 12.5 6.25 6.25 0 0 1 0-12.5Z";
    readonly close: "M6.2 4.6 12 10.4l5.8-5.8 1.6 1.6L13.6 12l5.8 5.8-1.6 1.6L12 13.6l-5.8 5.8-1.6-1.6L10.4 12 4.6 6.2l1.6-1.6Z";
    readonly check: "m9.8 16.9-5.3-5.3 1.6-1.6 3.7 3.7 8-8 1.6 1.6-9.6 9.6Z";
    readonly chevronDown: "m6 9 6 6 6-6-1.6-1.6L12 11.8 7.6 7.4 6 9Z";
    readonly info: "M12 2.5A9.5 9.5 0 1 0 12 21.5 9.5 9.5 0 0 0 12 2.5Zm1.2 14h-2.4v-6h2.4v6Zm0-8h-2.4V6h2.4v2.5Z";
    readonly sun: "M11 1h2v3h-2V1Zm6.4 2.2 1.4 1.4-2.1 2.1-1.4-1.4 2.1-2.1ZM20 11v2h-3v-2h3ZM7.1 6.7 5 4.6l1.4-1.4 2.1 2.1-1.4 1.4ZM4 11v2H1v-2h3Zm2.4 8.8-1.4-1.4 2.1-2.1 1.4 1.4-2.1 2.1ZM13 23h-2v-3h2v3Zm5.8-3.2-2.1-2.1 1.4-1.4 2.1 2.1-1.4 1.4ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z";
    readonly moon: "M15.5 3.5a8.5 8.5 0 1 0 5 15.5 9 9 0 1 1-5-15.5Z";
    readonly alert: "M12 3 2 20.5h20L12 3Zm1.1 13.8h-2.2v-2.2h2.2v2.2Zm0-3.9h-2.2V8.7h2.2V13Z";
};
export type IconName = keyof typeof paths;
export interface IconProps extends SVGProps<SVGSVGElement> {
    name: IconName;
    size?: number;
}
export declare function Icon({ name, size, className, ...props }: IconProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Icon.d.ts.map