import React from "react";
import SidebarItem from "./SidebarItem";
import { HomeMinor } from "@shopify/polaris-icons";
export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-section">
          <SidebarItem home={true} icon={require("../images/Home.svg")}>
            hello
          </SidebarItem>
          <SidebarItem icon={require("../images/profile pic.jpg")}>
            Mohamed Montaser
          </SidebarItem>
        </div>
        <div className="sidebar-section">
          <SidebarItem
            icon={
              "https://static.xx.fbcdn.net/rsrc.php/v3/yg/r/IDuJShpKhav.png"
            }
          >
            friends
          </SidebarItem>
          <SidebarItem icon={require("../images/seeAll.svg")}>
            see all
          </SidebarItem>
        </div>
        <div className="sidebar-section">
          <SidebarItem
            icon={
              "https://scontent.fcai20-5.fna.fbcdn.net/v/t1.6435-9/154511984_3075081989395779_4894286282551063745_n.png?stp=c16.0.34.34a_cp0_dst-png_p34x34&_nc_cat=100&ccb=1-7&_nc_sid=70495d&_nc_ohc=wVCQ9JMKYY0AX9q-swA&_nc_ht=scontent.fcai20-5.fna&oh=00_AfCN_XRdwcZRN5L-UCr_uqRjCYZ3J1uGKS89Yuag2M9KnA&oe=64427B9E"
            }
          >
            Mohamed Montaser Group
          </SidebarItem>
          <SidebarItem
            icon={
              "https://scontent.fcai20-5.fna.fbcdn.net/v/t1.6435-9/154511984_3075081989395779_4894286282551063745_n.png?stp=c16.0.34.34a_cp0_dst-png_p34x34&_nc_cat=100&ccb=1-7&_nc_sid=70495d&_nc_ohc=wVCQ9JMKYY0AX9q-swA&_nc_ht=scontent.fcai20-5.fna&oh=00_AfCN_XRdwcZRN5L-UCr_uqRjCYZ3J1uGKS89Yuag2M9KnA&oe=64427B9E"
            }
          >
            Mohamed Montaser Group
          </SidebarItem>
          <SidebarItem
            icon={
              "https://scontent.fcai20-5.fna.fbcdn.net/v/t1.6435-9/154511984_3075081989395779_4894286282551063745_n.png?stp=c16.0.34.34a_cp0_dst-png_p34x34&_nc_cat=100&ccb=1-7&_nc_sid=70495d&_nc_ohc=wVCQ9JMKYY0AX9q-swA&_nc_ht=scontent.fcai20-5.fna&oh=00_AfCN_XRdwcZRN5L-UCr_uqRjCYZ3J1uGKS89Yuag2M9KnA&oe=64427B9E"
            }
          >
            Mohamed Montaser Group
          </SidebarItem>
        </div>
        <div className="sidebar-section copyright">
          <p>
            Copy Right &copy; 2021 - {new Date().getFullYear()} By Mohamed
            Montaser
          </p>
        </div>
      </div>
    </>
  );
}
