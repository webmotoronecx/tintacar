import type { PageData } from "@/types/sections";

export const homeTintPage: PageData = {
  path: "/home-tint/",
  seo: {
    title: "Home Tinting - Tint a Car",
    description:
      "Home Tinting by Tint a Car has the largest range of window films for your home, office or shop. Transform the look, functionality, comfort and energy efficiency of your windows.",
  },
  sections: [
    {
      type: "heading",
      title: "Affordable Home Window Tinting Solutions",
      as: "h1",
      subtitle: "Increase the comfort in your home with window tint",
      divider: true,
      dividerColor: "brand",
      buttons: [
        { label: "Find your nearest store", href: "/contact-a-store/", variant: "solid" },
        { label: "Quick quote", href: "/contact-a-store/", variant: "outline" },
      ],
    },
    {
      type: "tileGrid",
      variant: "story",
      columns: 3,
      gap: "md",
      items: [
        {
          image: { src: "/images/home-tint/story-privacy.png", alt: "Privacy window film home tinting", width: 1080, height: 1080 },
          href: "/home-tint/privacy/",
          title: "Need more privacy at home?",
          text: "View Melanie\u2019s Story",
          button: { label: "View", href: "/home-tint/privacy/", variant: "outline" },
        },
        {
          image: { src: "/images/home-tint/story-heat.png", alt: "heat reduction window film solar home window tint", width: 1080, height: 1080 },
          href: "/home-tint/heat/",
          title: "Is heat a problem in your home?",
          text: "View Simon\u2019s Story",
          button: { label: "View", href: "/home-tint/heat/", variant: "outline" },
        },
        {
          image: { src: "/images/home-tint/story-safety.png", alt: "Family having fun near windows. window tint", width: 1080, height: 1080 },
          href: "/home-tint/safety/",
          title: "Keep family safe from broken glass.",
          text: "View Maria\u2019s Story",
          button: { label: "View", href: "/home-tint/safety/", variant: "outline" },
        },
        {
          image: { src: "/images/home-tint/story-fade.png", alt: "window tint helps avoid fading furniture", width: 1080, height: 1080 },
          href: "/home-tint/fade/",
          title: "Concerned about furniture fading?",
          text: "View Carol\u2019s Story",
          button: { label: "View", href: "/home-tint/fade/", variant: "outline" },
        },
        {
          image: { src: "/images/home-tint/story-decorative-film.png", alt: "decorative design on bathroom window", width: 1080, height: 1080 },
          href: "/home-tint/decorative-film/",
          title: "After a unique window design?",
          text: "View Rick & Sue\u2019s Story",
          button: { label: "View", href: "/home-tint/decorative-film/", variant: "outline" },
        },
        {
          image: { src: "/images/home-tint/story-glare.png", alt: "Living room with professional window tint", width: 1080, height: 1080 },
          href: "/home-tint/glare/",
          title: "Have annoying glare at home?",
          text: "View Mike\u2019s Story",
          button: { label: "View", href: "/home-tint/glare/", variant: "outline" },
        },
        {
          image: { src: "/images/home-tint/story-security.png", alt: "Security home window tint", width: 1080, height: 1080 },
          href: "/home-tint/security/",
          title: "Concerned about home security?",
          text: "View Tracey\u2019s Story",
          button: { label: "View", href: "/home-tint/security/", variant: "outline" },
        },
      ],
    },
  ],
};
