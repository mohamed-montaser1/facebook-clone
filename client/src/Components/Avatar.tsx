import React from "react";

interface Props {
  src: string;
  className?: string;
  width: number | string;
  height: number | string;
}

export default function Avatar({ src, className, width, height }: Props) {
  return (
    <img
      src={src}
      className={`${className}`}
      width={width}
      height={height}
      alt="avatar"
    />
  );
}
