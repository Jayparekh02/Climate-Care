import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useMediaQuery, useTheme } from "@mui/material";

interface SidebarProps {
  position: "left" | "right";
  items: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ position, items }) => {
  const isLeft = position === "left";
  const [activeHash, setActiveHash] = useState(window.location.hash);
  const token = useAppSelector((state) => state.login.token);
  const navigate = useNavigate();
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleItemClick = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>,
    item: string
  ) => {
    // Check if user is logged in (i.e., token exists)
    if (
      !token &&
      ["Resources", "Events", "Petition", "Emission"].includes(item)
    ) {
      event.preventDefault(); // Prevent navigation
      navigate("/login"); // Redirect to login page
    }
  };
  const isLargeScreen = useMediaQuery(useTheme().breakpoints.up("lg"));

  const renderLinkItem = (item: string, index: number) => {
    const itemId = `#${item.toLowerCase()}`;

    if (isLeft) {
      // For the left sidebar, use anchor tags for hash-based navigation
      return (
        <a
          href={itemId}
          style={{
            textDecoration: "none",
            color: activeHash === itemId ? "#99cccc" : "rgb(70, 70, 70)", // Active color red
          }}
          key={index}
        >
          <motion.div style={{ margin: "1rem" }}>{item}</motion.div>
        </a>
      );
    } else {
      // For the right sidebar, use NavLink for react-router-dom navigation
      return (
        <NavLink
          to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
          onClick={(event) => handleItemClick(event, item)}
          key={index}
          style={({ isActive }) => ({
            margin: "1rem",
            color: isActive ? "red" : "rgb(70, 70, 70)",
          })}
        >
          {item}
        </NavLink>
      );
    }
  };

  if (!isLargeScreen) {
    return null; // Hide Sidebar component for XL screens and above
  }
  return (
    <motion.div
      initial={{ x: isLargeScreen && isLeft ? -100 : 0, opacity: 1 }} // Adjust initial x position based on screen size and position
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",
        top: 0,
        [position]: isLargeScreen ? "2%" : "5%", // Adjust position based on screen size
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "start",
        zIndex: 100,
        marginTop: "4rem",
        fontSize: "18px",
      }}
    >
      {items.map(renderLinkItem)}
    </motion.div>
  );
};

export default Sidebar;
