import {
    IconBrandGithub,
    IconBrandX,
    IconHome,
    IconNewSection,
  } from "@tabler/icons-react";
  import { AiOutlineStock } from "react-icons/ai";
  import { RiStockFill } from "react-icons/ri";
  import { FaLinkedin } from "react-icons/fa";
  import { IoLogOut } from "react-icons/io5";


const navLinks = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },

    {
      title: "Top Stocks",
      icon: (
        <AiOutlineStock className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/top-stocks",
    },
    {
      title: "Buy/Sell",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/buy-sell",
    },
    {
      title: "Your Portfolio",
      icon: (
        <RiStockFill className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/portfolio",
    },

    
    {
      title: "LinkedIn",
      icon: (
        <FaLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/amaymanitripathi/",
    },
    {
      title: "Logout",
      icon: (
        <IoLogOut className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/logout",
    }
  ];

export default navLinks;