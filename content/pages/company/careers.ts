import type { Cta, PageData } from "@/types/sections";

const enquire: Cta = { label: "Enquire today", href: "mailto:joinus@tintacar.com.au", variant: "solid" };

const whyList =
  "<ul><li>50 Years of industry experience and knowledge</li><li>Almost 100 other franchisee’s you can connect with</li><li>Head Office support, such as marketing and business operations</li><li>Grow and develop, with the opportunity to own more than one location</li></ul>";

export const careersPage: PageData = {
  path: "/careers/",
  seo: {
    title: "Careers - Tint a Car",
    description:
      "Join the Tint a Car franchise network! Opportunities for experienced and trainee tinters. Franchise opportunities are also available. Contact Tint a Car today!",
  },
  sections: [
    {
      type: "heroBanner",
      image: { src: "/images/company/careers-banner.png", alt: "Join the Tint a Car Network", width: 1920, height: 750 },
      spacing: "none",
    },
    {
      type: "mediaText",
      image: { src: "/images/company/careers-franchisee.webp", alt: "", width: 900, height: 800 },
      imagePosition: "left",
      title: "Become a Franchisee!",
      as: "h1",
      size: "lg",
      html: `<h4>Join Australia’s best window tinting network, Tint a Car.</h4><p>With over 50 years of history and almost 100 locations across Australia and we want you to join us! Whether you have a passion for cars, a love for excellent customer service or are ready for your next step, Tint a Car have both existing and new franchise options for you!</p><p><strong>Why Tint a Car?</strong></p>${whyList}`,
      buttons: [enquire],
    },
    {
      type: "mediaText",
      background: "panel",
      image: { src: "/images/company/careers-tinter.webp", alt: "", width: 900, height: 800 },
      imagePosition: "right",
      title: "Join us as a tinter!",
      as: "h1",
      size: "lg",
      html: "<p>Whether you’re an experienced tinter looking for the next step in their career or inexperienced wanting to learn a new skill, Tint a Car has opportunities for you in every state and capital city.</p><p><strong>With almost 100 stores nationwide Tint a Car is always looking for:</strong></p><ul><li>Trainee Automotive Tinters</li><li>Trainee Home window tinting Tinters</li><li>Experienced Tinters for Cars, Home and Office</li><li>Management Roles</li></ul>",
      buttons: [enquire],
    },
    {
      type: "mediaText",
      image: { src: "/images/company/careers-tint-shop.webp", alt: "", width: 900, height: 800 },
      imagePosition: "left",
      title: "Convert your existing tint shop!",
      as: "h1",
      size: "lg",
      html: `<h4>Converting your existing tint shop to a Tint a Car is easier than it seems!</h4><p>With local support from Franchise Managers and internal marketing teams, continued support from an established brand and training professionals that help you to reach your business goals.</p><p><strong>Why Tint a Car?</strong></p>${whyList}<p>Join us as a Franchisee!</p>`,
      buttons: [enquire],
    },
  ],
};
