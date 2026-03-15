import { SVGProps } from '../../../node_modules/react';
type IconPath = Partial<SVGProps<SVGPathElement>> & {
    d: string;
};
export interface IconDefinition {
    viewBox: string;
    paths: readonly IconPath[];
}
export declare const ICON_NAMES_BY_SOURCE: {
    readonly antd: string[];
    readonly bootstrap: string[];
    readonly fontAwesome: string[];
    readonly material: string[];
    readonly vt: string[];
};
export type IconSourceName = keyof typeof ICON_NAMES_BY_SOURCE;
export declare const SOURCE_ICON_NAMES: string[];
export declare const LEGACY_ICON_NAMES: readonly ["alert", "arrowDown", "arrowLeft", "arrowRight", "arrowUp", "bell", "calendar", "check", "checkCircle", "chevronDown", "chevronLeft", "chevronRight", "chevronUp", "clock", "close", "closeCircle", "copy", "dotsHorizontal", "dotsVertical", "download", "edit", "externalLink", "eye", "eyeOff", "file", "filter", "folder", "heart", "home", "info", "link", "location", "lock", "mail", "menu", "minus", "moon", "pause", "phone", "play", "plus", "question", "refresh", "search", "settings", "star", "stop", "sun", "tag", "trash", "unlock", "upload", "user", "users", "warningCircle"];
export type LegacyIconName = (typeof LEGACY_ICON_NAMES)[number];
export type IconName = string;
export declare const ICON_NAMES: IconName[];
export declare function getIconDefinition(name: IconName): IconDefinition;
export declare const icons: Record<"link" | "search" | "alert" | "menu" | "download" | "location" | "copy" | "filter" | "arrowDown" | "arrowLeft" | "arrowRight" | "arrowUp" | "bell" | "calendar" | "check" | "checkCircle" | "chevronDown" | "chevronLeft" | "chevronRight" | "chevronUp" | "clock" | "close" | "closeCircle" | "dotsHorizontal" | "dotsVertical" | "edit" | "externalLink" | "eye" | "eyeOff" | "file" | "folder" | "heart" | "home" | "info" | "lock" | "mail" | "minus" | "moon" | "pause" | "phone" | "play" | "plus" | "question" | "refresh" | "settings" | "star" | "stop" | "sun" | "tag" | "trash" | "unlock" | "upload" | "user" | "users" | "warningCircle", IconDefinition>;
export {};
//# sourceMappingURL=icon-sources.d.ts.map