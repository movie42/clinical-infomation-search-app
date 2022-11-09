import React from "react";
import * as svg from "./svg";

export type IconType = keyof typeof svg;
interface IconProps {
  name: IconType;
}

const Icon = ({ name }: IconProps) => {
  return React.createElement(svg[name]);
};

export default Icon;
