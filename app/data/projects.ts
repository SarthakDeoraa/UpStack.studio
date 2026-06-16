export interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

export const projects: Project[] = [
  {
    title: "Legacy Chain",
    description: "Sleek landing page for a web3 startup",
    image: "/Frame 1.jpg", // Add image path here
    link: "#", // Add URL here
  },
  {
    title: "Beyond Design",
    description: "Website for a design agency",
    image: "/beyond design.png",
    link: "#",
  },
  {
    title: "AutoX",
    description: "Landing page for a business automations provider",
    image: "/Frame 2.png",
    link: "#",
  },
  {
    title: "Pkoin",
    description: "Revamp of Pkoin crypto asset",
    image: "/pkoin.png",
    link: "#",
  },
  {
    title: "Dreelio",
    description: "Landing page for a dashboard provider",
    image: "dreelio.jpeg",
    link: "#",
  },
  {
    title: "Dashboards",
    description: "User dashboard for a web3 asset management platform",
    image: "dashboard.png",
    link: "#",
  },
];
