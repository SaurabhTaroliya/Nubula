import React from 'react'
import { assets } from "../assets/assets"
import { TbMessageQuestion } from "react-icons/tb";
import { GiRollingEnergy } from "react-icons/gi";
import { ImMagicWand } from "react-icons/im";
import { FaRoad } from "react-icons/fa";






export const cards = [
  {
    "Heading": "Road Trip Destinations" ,
    "shortPrompt": "Discover beautiful places to visit on your next road trip",
    "detailedPrompt":"Suggest beautiful places to see on an upcoming road trip",
    "icon":<FaRoad />

  },
  {
    "Heading": "Stand out on socials",
    "shortPrompt": "What are some tips for writing a great LinkedIn post?",
    "detailedPrompt":"What are some tips for writing a great LinkedIn post? Give strong examples for posts in various scenarios and explain how each strategy will help me stand out.",
    "icon":<TbMessageQuestion />},
  {
    "Heading": "Interview warning sign" ,
    "shortPrompt": "What are the some red flags to watch out for during an interview",
    "detailedPrompt":"What are 5 warning signs to watch out for during an interview? For each, give examples and suggest what they might reveal about a job. Then help me understand how I can prepare better to spot these red flags.",
    "icon":<ImMagicWand />
   },
  {
    "Heading": "Create a pop art image" ,
    "shortPrompt": "Create a pop art image of a woman wearing sunglasses and a beret",
    "detailedPrompt":"Create a pop art image of a woman wearing sunglasses and a beret",
    "icon":<GiRollingEnergy />
  }    
]
export const data = () => {
  return (
    <></>
  )
}


