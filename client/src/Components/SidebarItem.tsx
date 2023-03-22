import { Icon } from "@shopify/polaris";
import React from "react";

interface Props {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | string;
  children: string;
  home?: boolean;
}

export default function SidebarItem({ icon, children, home }: Props) {
  return (
    <>
      <div
        className={`sidebar-item ${children === "see all" ? "see-all" : ""} ${
          home ? "home" : ""
        }`}
      >
        {typeof icon === "function" ? (
          <Icon source={icon} color="base" />
        ) : (
          <img src={icon} />
        )}
        <p>{children}</p>
      </div>
    </>
  );
}
