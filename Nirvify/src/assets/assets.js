//---Logo & Icons---
import main_logo from "./main-logo.png";
import nirvify_logo from "./nirvify-logo.png";
import home_icon from "./home.png";
import search_icon from "./search.png";
import play_icon from "./play.png";
import pause_icon from "./pause.png";
import next_icon from "./next.png";
import prev_icon from "./prev.png";
import library_icon from "./library.png";
import upload_icon from "./upload.png";
import play_button from "./play-button.png";
import upload_area from "./upload_area.png";
import upload_audio from "./upload_audio.png";
import uploaded_audio from "./uploaded_audio.jpg";

//---Immages & Audio---

import Ithihasa_ep1 from "./Ithihasa_ep1.mp3";
import Motivation_ep1 from "./Motivation_ep1.mp3";
import Tech_ep1 from "./Tech_ep1.mp3";
import TheQuran_ep1 from "./TheQuran.mp3";
import TheMahabharat_ep1 from "./TheMahabharat_ep1.mp3";
import Travel_ep1 from "./Travel_ep1.mp3";

import mahabharat_img1 from "./images/mahabharat-img1.jpg";
import mahabharat_img2 from "./images/mahabharat-img2.jpg";
import mahabharat_img3 from "./images/mahabharat-img3.jpg";
import mahabharat_img4 from "./images/mahabharat-img4.jpg";
import mahabharat_img5 from "./images/mahabharat-img5.jpg";
import ithihasa_img1 from "./images/Ithihasa-img1.jpg";
import ithihasa_img2 from "./images/Ithihasa-img2.jpg";
import ithihasa_img3 from "./images/Ithihasa-img3.jpg";
import ithihasa_img4 from "./images/Ithihasa-img4.jpg";
import ithihasa_img5 from "./images/Ithihasa-img5.jpg";
import ithihasa_img6 from "./images/Ithihasa-img6.jpg";
import quran_img1 from "./images/quran-img1.jpg";
import quran_img2 from "./images/quran-img2.jpg";
import quran_img3 from "./images/quran-img3.jpg";
import quran_img4 from "./images/quran-img4.jpg";
import quran_img5 from "./images/quran-img5.jpg";
import quran_img6 from "./images/quran-img6.jpg";
import tech_img1 from "./images/tech-img1.jpg";
import tech_img2 from "./images/tech-img2.jpg";
import tech_img3 from "./images/tech-img3.jpg";
import tech_img4 from "./images/tech-img4.jpg";
import tech_img5 from "./images/tech-img5.jpg";
import tech_img6 from "./images/tech-img6.jpg";
import motivation_img1 from "./images/motivation-img1.jpg";
import travel_img1 from "./images/travel-img1.jpg";
import travel_img2 from "./images/travel-img2.jpg";
import travel_img3 from "./images/travel-img3.jpg";
import travel_img4 from "./images/travel-img4.jpg";
import travel_img5 from "./images/travel-img5.jpg";
import travel_img6 from "./images/travel-img6.jpg";

export const assets = {
  main_logo,
  nirvify_logo,
  home_icon,
  search_icon,
  play_icon,
  pause_icon,
  next_icon,
  prev_icon,
  library_icon,
  upload_icon,
  play_button,
  upload_area,
  upload_audio,
  uploaded_audio,
};

export const podcastData = [
  {
    id: 0,
    name: "Mahabharat",
    image: mahabharat_img1,
    podcaster: "It's Me!",
    desc: "Explore the epic tale of the Mahabharat, where ancient wisdom meets the complexities of human life, politics, and spirituality. Unravel the lessons from the great war of Kurukshetra, deep philosophical insights, and the timeless teachings of the Bhagavad Gita.",
    bgColor: "#2a4365",
  },
  {
    id: 1,
    name: "Ithihasa - A Story of India",
    image: ithihasa_img1,
    podcaster: "It's Me!",
    desc: "Journey through India's rich historical narratives, where mythology and history intertwine to shape the cultural and spiritual heritage. Discover the ancient stories of kings, sages, and civilizations that laid the foundation for Indian traditions and values.",
    bgColor: "#22543d",
  },
  {
    id: 2,
    name: "Think Quran",
    image: quran_img1,
    podcaster: "It's Me!",
    desc: "Delve into the teachings of the Quran, exploring its guidance on faith, spirituality, and human behavior. Understand the deeper meanings of the verses, their historical context, and their relevance to modern-day challenges.",
    bgColor: "#742a2a",
  },
  {
    id: 3,
    name: "What The Tech",
    image: tech_img1,
    podcaster: "It's Me!",
    desc: "Stay updated with the latest technological innovations, breakthroughs, and trends shaping our digital world. From AI to blockchain, explore how technology is transforming industries and impacting everyday life.",
    bgColor: "#44337a",
  },
  {
    id: 4,
    name: "Start where you are",
    image: motivation_img1,
    podcaster: "It's Me!",
    desc: "Find inspiration through stories of resilience, determination, and success from individuals who have overcome challenges. Explore strategies for personal growth, self-discipline, and staying motivated in the face of adversity.",
    bgColor: "#234e52",
  },
  {
    id: 5,
    name: "Frome Here to There",
    podcaster: "It's Me!",
    image: travel_img1,
    desc: "Embark on journeys to breathtaking destinations, uncovering hidden gems and unique experiences from around the world. Learn travel tips, cultural insights, and stories that inspire adventure and exploration beyond your comfort zone.",
    bgColor: "#744210",
  },
];

export const episodeData = [
  {
    id: 0,
    name: "What The Tech",
    ep: "Episode 1:",
    image: tech_img2,
    file: Tech_ep1,
    desc: "Effective Strategies: Engage and inspire students.",
    duration: "20:00",
  },
  {
    id: 1,
    name: "Ithihasa - A Story of India",
    ep: "Episode 3:",
    image: ithihasa_img2,
    file: Ithihasa_ep1,
    desc: "Key Characters: Heroes and villains explored.",
    duration: "2:20",
  },
  {
    id: 2,
    name: "Mahabharat",
    ep: "Episode 2:",
    image: mahabharat_img3,
    file: TheMahabharat_ep1,
    desc: "Moral Dilemmas: Complex choices in the epic.",
    duration: "2:32",
  },
  {
    id: 3,
    name: "The Thoughtful Travel",
    ep: "Episode 4:",
    image: travel_img2,
    file: Travel_ep1,
    desc: "Sustainable Travel: Explore with minimal impact.",
    duration: "2:50",
  },
  {
    id: 4,
    name: "Think Quran",
    ep: "Episode 2:",
    image: quran_img2,
    file: TheQuran_ep1,
    desc: "Life Teachings: Daily guidance from the Quran.",
    duration: "3:10",
  },
  {
    id: 5,
    name: "What The Tech",
    ep: "Episode 4:",
    image: tech_img3,
    file: Tech_ep1,
    desc: "Tech in Teaching: Embrace digital education.",
    duration: "2:45",
  },
  {
    id: 6,
    name: "Mahabharat",
    ep: "Episode 5:",
    image: mahabharat_img2,
    file: TheMahabharat_ep1,
    desc: "Cultural Legacy: Impact on Indian thought.",
    duration: "2:18",
  },
  {
    id: 7,
    name: "Ithihasa - A Story of India",
    ep: "Episode 5:",
    image: ithihasa_img3,
    file: Ithihasa_ep1,
    desc: "Cultural Impact: Influence on Indian values.",
    duration: "2:35",
  },
];

export const mahabharat_ep = [
  {
    id: 0,
    name: '"Mahabharat Unveiled - The Epic Begins."',
    ep: "Episode 1:",
    image: mahabharat_img1,
    file: "",
    desc: "In this episode, we dive into the origins of the Mahabharat, one of the greatest epics in human history. Discover the story’s background, key families, and the legendary events that set the stage for the epic tale of duty, conflict, and destiny. This is where the timeless saga begins.",
    duration: "10:30",
  },
  {
    id: 1,
    name: "Mahabharat:",
    ep: "Episode 2",
    image: mahabharat_img2,
    file: "",
    desc: "Moral Dilemmas: Complex choices in the epic.",
    duration: "2:32",
  },
  {
    id: 2,
    name: "Mahabharat:",
    ep: "Episode 3",
    image: mahabharat_img3,
    file: "",
    desc: "Moral Dilemmas: Complex choices in the epic.",
    duration: "2:32",
  },
  {
    id: 3,
    name: "Mahabharat:",
    ep: "Episode 4",
    image: mahabharat_img4,
    file: "",
    desc: "Moral Dilemmas: Complex choices in the epic.",
    duration: "2:32",
  },
  {
    id: 4,
    name: "Mahabharat:",
    ep: "Episode 5",
    image: mahabharat_img5,
    file: "",
    desc: "Moral Dilemmas: Complex choices in the epic.",
    duration: "2:32",
  },
];
