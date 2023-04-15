declare module "*.jpg";
declare module "*.png";

// Icons

declare module "@iconscout/react-unicons" {
  import { SVGProps } from "react";

  export type IconProps = {
    color?: string;
    size?: string | number;
  } & SVGProps<SVGElement>;

  export type Icon = (props: IconProps) => JSX.Element;

  export const UilEye: Icon;
  export const UilEyeSlash: Icon;
}

declare module "*.svg" {
  const content: string;
  export default content;
}
