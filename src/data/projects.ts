/* ------------------------------------------------------------------
   Static project data + simple video URL system.
   Each project has a `videoUrl` field that supports:
   YouTube (youtu.be / youtube.com), Vimeo, direct MP4/WebM and
   any cloud-hosted video URL. No backend, no storage — safe for
   GitHub Pages / Cloudflare static deployment.
------------------------------------------------------------------- */

export interface Project {
  slug: string;
  title: string;
  category: "Motion Graphics" | "3D Animation";
  type: string;
  label: string;
  client: string;
  year: string;
  role: string;
  tools: string[];
  videoUrl: string;
  about: string[];
  myRole: string;
}

export const PROJECTS: Project[] = [
  /* ---------------------- MOTION GRAPHICS ---------------------- */
  {
    slug: "royalton-international",
    title: "Royalton International",
    category: "Motion Graphics",
    type: "Motion Graphics Animation",
    label: "Motion Graphics Animation",
    client: "Royalton International",
    year: "2025",
    role: "Motion Graphics Animator",
    tools: ["Adobe After Effects", "Adobe Illustrator"],
    videoUrl: "https://youtu.be/MKPwCvDD2Io",
    about: [
      "A motion graphics animation created for Royalton International, combining custom icons, illustrations, and animated graphic elements to communicate the message clearly and engagingly. The animation follows the client's TTX requirements with clean visuals, smooth transitions, and effective visual storytelling.",
    ],
    myRole:
      "Motion graphics design, animation, visual storytelling, transitions, and development of animated graphic elements.",
  },
  {
    slug: "data-privacy",
    title: "Data Privacy",
    category: "Motion Graphics",
    type: "Motion Graphics Animation",
    label: "Motion Graphics Animation",
    client: "Personal Project",
    year: "2025",
    role: "Motion Graphics Animator",
    tools: ["Adobe After Effects", "Adobe Illustrator", "Envato"],
    videoUrl: "https://youtu.be/Lm2DeGZLRUU",
    about: [
      "A motion graphics animation focused on data privacy awareness, using icons, Envato assets, and custom illustrations to present key concepts in a clear and engaging way. The project combines smooth transitions, visual storytelling, and animated graphic elements to make the subject easy to understand.",
    ],
    myRole:
      "Motion graphics design, visual asset arrangement, animation, transitions, and visual storytelling.",
  },
  {
    slug: "k-electric-cyber-security",
    title: "K-Electric",
    category: "Motion Graphics",
    type: "Cyber Security Awareness Animation",
    label: "Cyber Security Awareness Animation",
    client: "K-Electric",
    year: "2026",
    role: "Motion Graphics Animator",
    tools: ["Adobe Illustrator", "Adobe After Effects", "SCORM"],
    videoUrl: "https://youtu.be/qEfbEWIcCV8",
    about: [
      "A short animated dialogue created for K-Electric to promote cyber security awareness through a simple conversation between two colleagues. The animation was designed to communicate the subject clearly and engagingly and was later converted into an interactive SCORM package for integration into the client's learning platform.",
    ],
    myRole:
      "Visual asset design in Adobe Illustrator, animation in Adobe After Effects, motion graphics, storytelling, and preparation of the animation for SCORM conversion.",
  },
  {
    slug: "lego-2d-animation-video-series",
    title: "LEGO — 2D Animation Video Series",
    category: "Motion Graphics",
    type: "2D Animation",
    label: "2D Animation",
    client: "LEGO",
    year: "2026",
    role: "Motion Graphics Animator",
    tools: ["After Effects"],
    videoUrl: "https://youtu.be/pcsNRcQ6XM4",
    about: [
      "Created a series of 8 animated videos for LEGO, managing the complete project independently from concept development and video production to final delivery and client communication.",
      "Using After Effects, I developed the 2D visuals, animation, and environments while maintaining a consistent visual style across the entire series and ensuring the work aligned with the client's requirements.",
      "I also managed client communication, feedback, revisions, production coordination, and overall project delivery, taking the project from the initial concept and production stage through to final delivery.",
    ],
    myRole:
      "As the Motion Graphics Animator, I handled the project independently across the full production process. My responsibilities included concept development, 2D visual development, animation, environment creation, revisions, client communication, feedback implementation, and final delivery.",
  },

  /* ------------------------ 3D ANIMATION ------------------------ */
  {
    slug: "3d-environment-animation",
    title: "3D Environment & Animation",
    category: "3D Animation",
    type: "3D Environment & Animation",
    label: "3D Environment & Animation",
    client: "Client Project",
    year: "2025",
    role: "3D Artist / Animator",
    tools: ["Blender", "CapCut"],
    videoUrl: "https://youtu.be/5AH_6nrykkU",
    about: [
      "A 3D environment and animation project focused on scene composition, texturing, lighting, and environment design. The scene was modeled and animated in Blender, then edited in CapCut with background voice-over to create a polished final presentation.",
    ],
    myRole:
      "3D modeling, texturing, lighting, scene composition, animation, video editing, and final presentation.",
  },
  {
    slug: "festive-3d-commercial-street",
    title: "Festive 3D Commercial Street",
    category: "3D Animation",
    type: "3D Environment & Animation",
    label: "3D Environment & Animation",
    client: "Personal Project",
    year: "2025",
    role: "3D Artist / Animator",
    tools: ["Blender"],
    videoUrl: "https://youtu.be/XR03azF04e4",
    about: [
      "A festive 3D commercial street scene featuring detailed houses, food carts, environmental elements, and animated characters. The project focuses on creating a lively urban atmosphere with detailed modeling, texturing, composition, and smooth cinematic camera movement.",
    ],
    myRole:
      "3D modeling, texturing, scene composition, character animation, environment design, and camera animation.",
  },
  {
    slug: "3d-animated-story",
    title: "3D Animated Story",
    category: "3D Animation",
    type: "3D Animated Story",
    label: "Thesis Project",
    client: "Academic / Thesis Project",
    year: "2024",
    role: "3D Artist / Animator",
    tools: ["Blender"],
    videoUrl: "https://youtu.be/MicFTZSCLFI",
    about: [
      "A complete 3D animated story developed as a thesis project, covering character creation, environment design, modeling, texturing, animation, and rendering. The project demonstrates an end-to-end 3D production workflow, from initial story development and concept planning to final production.",
    ],
    myRole:
      "Story development, concept planning, character creation, 3D modeling, environment design, texturing, animation, and rendering.",
  },
  {
    slug: "floating-islands-3d-environment",
    title: "Floating Islands — 3D Environment",
    category: "3D Animation",
    type: "3D Environment",
    label: "3D Environment",
    client: "Personal Project",
    year: "2026",
    role: "3D Artist",
    tools: ["Blender"],
    videoUrl: "https://youtu.be/G8HsfyRaiLg",
    about: [
      "Designed and textured an original 3D environment in Blender, featuring floating islands connected by a vine-covered bridge and a warmly lit, secluded house. The scene focuses on creating a surreal and atmospheric environment through detailed modeling, texturing, lighting, and composition.",
    ],
    myRole:
      "This project allowed me to explore creative environment design while strengthening my skills in 3D modeling, texturing, lighting, and visual storytelling.",
  },
];

export const MOTION_PROJECTS = PROJECTS.filter(
  (p) => p.category === "Motion Graphics"
);
export const THREE_D_PROJECTS = PROJECTS.filter(
  (p) => p.category === "3D Animation"
);

export const getProject = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);

export const getNextProject = (slug: string) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
};
