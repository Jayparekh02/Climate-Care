import { Landing } from "../components/sections/Landing";
import About from "../components/sections/About";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import DrawerAppBar from "../components/Navbar";
import { navItems } from "../utils/constants";
import DifferentLength from "../components/sections/Chart";
import Sidebar from "../components/Sidebar";
import CarbonCalculator from "../components/sections/CarbonCalculator";
import { useMediaQuery, useTheme } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import Footer from "../components/sections/Footer";
const Root = () => {
  const { user } = useAppSelector((state) => state.login);
  const [isSecondPage, setIsSecondPage] = useState(false);
  const scrollY = useMotionValue(0);
  const scaleY = useTransform(scrollY, [window.innerHeight, 6000], [0, 2]); // Adjust these values as needed

  const sectionRef = useRef(null);
  const isMediumScreen = useMediaQuery(useTheme().breakpoints.down("lg"));

  useEffect(() => {
    const updateScroll = () => {
      scrollY.set(window.scrollY);
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, [scrollY]);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setIsSecondPage(position >= window.innerHeight - 50); // Assuming second page starts after 100vh
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <>
      {isSecondPage ? (
        <>
          <Sidebar position="left" items={navItems} />
          <Sidebar position="right" items= {["Emission Calculator", "Resources", "Events"]} />
          <motion.div
            style={{
              position: "fixed",
              top: 0,
              left: isMediumScreen ? "3%" : "15%",
              width: "4px",
              bottom: 0,
              transformOrigin: "top",
              zIndex: 99,
              background: "#99cccc",
              scaleY,
            }}
          />
        </>
      ) : (
        <DrawerAppBar />
      )}
      <div id="home">
        <Landing />
      </div>
      <div id="about" ref={sectionRef}>
        <About />
      </div>
      <div id="dashboard">
        <DifferentLength />
      </div>
      
        <div id="calculator" ref={sectionRef}>
          <CarbonCalculator />
        </div>
      <Footer/>
    </>
  );
};

export default Root;
