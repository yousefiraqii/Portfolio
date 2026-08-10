export type Certificate = {
  id: number;
  title: string;
  issuer: string;
  description: string;
  image: string;
  badge: string;
};

export type Project = {
  id: number;
  title: string;
  poster: string;
  additionalPhotos: string[];
  description: string;
  pdf: string;
};

export type Achievement = {
  title: string;
  desc: string;
  photos: string[];
};

export type IsefEntry = {
  year: string;
  title: string;
  desc: string;
  photos: string[];
};

export type VolunteerItem = {
  title: string;
  organization: string;
  location: string;
  start: string;
  end: string;
  hours: string;
  description: string;
  photos: string[];
};

export type ResearchPaper = {
  title: string;
  authors: string;
  year: string;
  journal: string;
  volume: string;
  publisher: string;
  doi: string;
  date: string;
  image: string;
  description: string;
};

export type Sport = {
  title: string;
  desc: string;
  image: string;
};

export const certificates: Certificate[] = [
  {
    id: 1,
    title: "Egypt Science and Engineering Fair (ESEF 2026)",
    issuer: "Intel ISEF | Issued 2026",
    description:
      "Egypt Science and Engineering Fair (ESEF 2026) - Participation with Aquapure project",
    image: "images/certificates/certificate1/1.jfif",
    badge: "Water Treatment",
  },
  {
    id: 2,
    title: "Winner - 7th International Innovation Exhibition",
    issuer: "Academy of Scientific Research and Technology | Issued 2023",
    description:
      "Won for his innovation Treatment of Carbon Emissions from Coal at the exhibition held in the New Administrative Capital.",
    image: "images/certificates/certificate2/1.jfif",
    badge: "Climate Action",
  },
  {
    id: 3,
    title: "2nd Place 🥈 | Sustainability and Climate Change – Tech Innovation Challenge 2026",
    issuer:
      "Arab Academy for Science, Technology and Maritime Transport (AASTMT) | Issued 2026",
    description:
      "Won 2nd Place in the Sustainability and Climate Change category at the 5th Tech-Innovation Challenge 2026. Project: AquaPure – A multi-stage filtration system for rural water security.",
    image: "images/certificates/certificate3/1.jfif",
    badge: "Water Treatment",
  },
  {
    id: 4,
    title: "IEEE CASS Competition (High School Track)",
    issuer: "IEEE Circuits and Systems Society (CASS) | Issued 2026",
    description:
      "IEEE CASS Competition (High School Track) Participation with project AquaPure.",
    image: "images/certificates/certificate4/1.jfif",
    badge: "Water Treatment",
  },
  {
    id: 5,
    title: "Zpreneurs Competition (Participation)",
    issuer: "BYF - BUILD YOUR FUTURE | Issued 2025",
    description:
      "Zpreneurs Competition (Participation) with project AquaPure.",
    image: "images/certificates/certificate5/1.jfif",
    badge: "Water Treatment",
  },
  {
    id: 6,
    title: "Blue Ocean Student Entrepreneurs Mini-Course",
    issuer: "Blue Ocean Student Entrepreneur Competition | Issued 2026",
    description:
      "Certificate of Completion for Blue Ocean Strategy and developing innovative business ideas.",
    image: "images/certificates/certificate6/1.jfif",
    badge: "Business Innovation",
  },
  {
    id: 7,
    title: "State Award for the Young Creator",
    issuer: "Ministry of Culture - Supreme Council of Culture | Issued 2021",
    description:
      "Distinguished participation and advancement to the final stage of the State Award for the Young Creator (Scientific Innovations branch).",
    image: "images/certificates/certificate7/1.jfif",
    badge: "Innovation",
  },
  {
    id: 8,
    title: "Certificate of Appreciation",
    issuer: "EGY STEM | Issued June 2026",
    description:
      "Successfully completed training in EGY STEM robotics and programming course (Arduino) Level 1",
    image: "images/certificates/certificate8/1.jpg",
    badge: "Robotics",
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Aquapure",
    poster: "images/projects/project1/1.jpg",
    additionalPhotos: [
      "images/projects/project1/2.jpg",
      "images/projects/project1/3.jpg",
    ],
    description:
      "A multi-stage filtration system for rural water security. Combines natural coagulants, activated carbon, Tested on canal water with 99% bacteria removal.",
    pdf: "images/projects/project1/poster.pdf",
  },
  {
    id: 2,
    title: "From Coal to Chemistry",
    poster: "images/projects/project2/1.jpg",
    additionalPhotos: ["images/projects/project2/2.jpg"],
    description: "The Role of Destructive Distillation in Toluene Production",
    pdf: "images/projects/project2/poster.pdf",
  },
  {
    id: 3,
    title: "Intelligent Automated Greenhouse Control System",
    poster: "images/projects/project3/1.jpg",
    additionalPhotos: [
      "images/projects/project3/2.jpg",
      "images/projects/project3/photo_3_2026-04-24_20-55-04.jpg",
    ],
    description:
      "Making full automated greenhouse system using arduino and full sensing system, and acutation system, to adjust temperature, light intesity adn soil moisture",
    pdf: "images/projects/project3/poster.pdf",
  },
  {
    id: 4,
    title: "Recycled E-Waste Miniature Climate Chamber",
    poster: "images/projects/project4/1.jpg",
    additionalPhotos: ["images/projects/project4/2.jpg"],
    description:
      "This project presents a low-cost, recycled climate chamber designed to control and monitor temperature and humidity for laboratory experiments.",
    pdf: "images/projects/project4/poster.pdf",
  },
  {
    id: 5,
    title: "Eco micro hydropower station to produce energy",
    poster: "images/projects/project5/1.jpg",
    additionalPhotos: ["images/projects/project5/2.jpg"],
    description:
      "Micro-hydropower system that generates electricity from small water flows using a turbine and generator.",
    pdf: "images/projects/project5/poster.pdf",
  },
  {
    id: 6,
    title: "Constructing Warren Truss Bridge for Solving Urban Congestion",
    poster: "images/projects/project6/1.jpg",
    additionalPhotos: ["images/projects/project6/2.jpg"],
    description:
      "A Vertical-lift Warren Truss bridge designed as a cost-effective infrastructure solution for Egypt.",
    pdf: "images/projects/project6/poster.pdf",
  },
];

export const achievements: Achievement[] = [
  {
    title: "Third Place - 6th Scientific Exhibition",
    desc: "Awarded third place for the project Water is the Basis of Life (Water Purification Using Moringa Seeds).",
    photos: [
      "images/achievements/achievements1/1.jpg",
      "images/achievements/achievements1/2.jpg",
      "images/achievements/achievements1/3.jpg",
    ],
  },
  {
    title: "State Award for the Young Creator",
    desc: "Reached the final stage of the State Award for the Young Creator (Scientific Innovations branch) 2021.",
    photos: [
      "images/achievements/achievements2/1.jpg",
      "images/achievements/achievements2/2.jpg",
    ],
  },
  {
    title: "7th International Innovation Exhibition",
    desc: "Won for his innovation Treatment of Carbon Emissions from Coal at the exhibition held in the New Administrative Capital.",
    photos: [
      "images/achievements/achievements3/1.jpg",
      "images/achievements/achievements3/2.jpg",
      "images/achievements/achievements3/3.jpg",
      "images/achievements/achievements3/4.jpg",
      "images/achievements/achievements3/5.jpg",
    ],
  },
  {
    title: "2nd Place 🥈 | Sustainability and Climate Change – Tech Innovation Challenge 2026",
    desc: "Won 2nd Place in Sustainability and Climate Change category for AquaPure project.",
    photos: [
      "images/achievements/achievements4/1.jpg",
      "images/achievements/achievements4/2.jpg",
      "images/achievements/achievements4/3.jpg",
      "images/achievements/achievements4/4.jpg",
    ],
  },
];

export const isefJourney: IsefEntry[] = [
  {
    year: "2020",
    title: "Natural Coagulation with Moringa Seeds",
    desc: "I was grade 5, i qualified for the local exhibition in Dakahlia",
    photos: [
      "images/isef/year1/1.jpg",
      "images/isef/year1/2.jpg",
      "images/isef/year1/3.jpg",
      "images/isef/year1/4.jpg",
    ],
  },
  {
    year: "2022",
    title: "Natural Coagulation with Moringa Seeds",
    desc: "I made some improvements, so i qualified for the Republican Exhibition Online (grade 7)",
    photos: ["images/isef/year2/1.jpg"],
  },
  {
    year: "2023",
    title: "From coal to Chemistry: Carbon Emission Treatment",
    desc: "I qualified for the local exhibition in Dakahlia (grade 8)",
    photos: [
      "images/isef/year3/1.jpg",
      "images/isef/year3/2.jpg",
      "images/isef/year3/3.jpg",
      "images/isef/year3/4.jpg",
    ],
  },
  {
    year: "2024",
    title: "From coal to Chemistry: Carbon Emission Treatment",
    desc: "I made some improvements, but also qualified for the local exhibition in Dakahlia (grade 9)",
    photos: ["images/isef/year4/1.jpg", "images/isef/year4/2.jpg"],
  },
  {
    year: "2025",
    title: "From coal to Chemistry: Carbon Emission Treatment",
    desc: "In grade 10, my colleague Abdullah Khafaja and I developed the project, but we only made it to the local exhibition in Ismailia.",
    photos: ["images/isef/year5/1.jpg", "images/isef/year5/2.jpg"],
  },
  {
    year: "2026",
    title: "Aquapure: multi-stage filtration system for rural water security",
    desc: "In grade 11, my colleague Mokhtar and I worked on a project to purify canal water, and we qualified for the national stage.",
    photos: [
      "images/isef/year6/1.jpg",
      "images/isef/year6/2.jpg",
      "images/isef/year6/3.jpg",
      "images/isef/year6/4.jpg",
    ],
  },
];

export const volunteerItems: VolunteerItem[] = [
  {
    title: "Volunteer - 57357",
    organization: "Children's Cancer Hospital Foundation 57357",
    location: "Hospital 57357, Egypt",
    start: "May 13, 2025",
    end: "July 27, 2025",
    hours: "37 hours and 11 minutes",
    description:
      "Supporting the cause of children with cancer through volunteer work at Hospital 57357. Recognized as a hardworking and dedicated team member.",
    photos: [
      "images/volunteer/57357/volunteer.jpg",
      "images/volunteer/57357/foundation.jpg",
    ],
  },
];

export const researchPapers: ResearchPaper[] = [
  {
    title:
      "AquaPure: A Low-Cost, Multi-Stage Natural Filtration System Using Local and Recycled Materials for Sustainable Rural Water Security in Egypt",
    authors: "A. Hegazy, M. Mahmoud, M. Shaaban, & Y. Al Iraqi",
    year: "2026",
    journal:
      "International Journal of Scientific and Research Publications (IJSRP)",
    volume: "Vol. 16, No. 06, pp. 13–15 (Version 2.0)",
    publisher: "Zenodo",
    doi: "https://doi.org/10.5281/zenodo.20690644",
    date: "June 14, 2026",
    image: "images/research/aquapure-paper.jpg",
    description:
      "A peer-reviewed paper documenting AquaPure, a low-cost, multi-stage natural filtration system built from local and recycled materials to deliver affordable, safe drinking water to rural communities across Egypt. Published June 14, 2026.",
  },
];

export const sports: Sport[] = [
  {
    title: "Karate",
    desc: "Started at age 7 until I got Brown 1 Belt",
    image: "images/sports/karate-child.jpg",
  },
  {
    title: "Current Training",
    desc: "Just to keep fit.",
    image: "images/sports/gym-recent.jpg",
  },
];

export const stats = [
  { value: 7, label: "YEARS" },
  { value: 6, label: "PROJECTS" },
  { value: 8, label: "CERTIFICATES" },
  { value: 37, label: "HOURS" },
];

export const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yousef-al-iraqi-b55a403b1/",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/yousef_al3raky?igsh=MXgwZW53cHFnZmxjag==",
  },
];
