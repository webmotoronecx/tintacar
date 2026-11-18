import type { PageData } from "@/types/sections";

export const homeTintSecurityPage: PageData = {
  path: "/home-tint/security/",
  seo: { title: "Security Window Film with Home Tinting by Tint a Car", description: "Our security window films help prevent break-ins & keeps your family safe. Find out more by contacting your nearest store & get a free measure & quote!" },
  sections: [
    {
      type: "splitHero",
      title: "Security Window Film for protection.",
      eyebrow: "MEET TRACEY.",
      quote: "“After my neighbours were broken into, I was concerned about the security of my home during the day.”",
      buttons: [
        { label: "Find your nearest store", href: "/contact-a-store/", variant: "outline-light" },
        { label: "Enquire now", href: "/contact-a-store/", variant: "solid" },
      ],
      image: { src: "/images/home-tint/security-hero.png", alt: "Meet Tracey", width: 650, height: 434 },
    },
    {
      type: "heading",
      title: "How home window tinting helped Tracey secure her home.",
      as: "h2",
      size: "md",
      bold: true,
      divider: false,
      align: "left",
      html: "<p>We installed <strong>security window film</strong> to her front entrance windows, which not only gives her peace of mind while at work, but helps to protect her belongings at home. Now Tracey can continue to focus on what she does best.</p>",
      spacing: "sm",
    },
    {
      type: "mediaText",
      decoration: "circle",
      image: { src: "/images/home-tint/security-story.png", alt: "", width: 800, height: 533 },
      eyebrow: "CONCERNED ABOUT KEEPING YOUR HOME SECURE?",
      title: "We have a solution for you.",
      html: "<p><strong>Security window film</strong> is up to up to 7 times thicker than standard films and when hit with force, will help keep shattered glass in place.</p><p>It helps to deter break-ins as it slows access to the home or office. Enjoy the peace of mind that the contents of your home and your family will be safe and secure.</p>",
      buttons: [{ label: "Find your nearest store", href: "/contact-a-store/", variant: "outline" }],
      showPaymentLogos: true,
    },
    {
      type: "iconFeatures",
      variant: "circle",
      eyebrow: "HELP DETER HOME BREAK-INS",
      title: "Installing security window film to your windows can make them up to 7x stronger.",
      divider: true,
      dividerColor: "accent",
      columns: 3,
      items: [
        { icon: "/images/home-tint/icon-shatter.png", title: "Glass is prevented from shattering.", text: "Security film holds glass together in the event of severe weather or accidental breakage." },
        { icon: "/images/home-tint/icon-secure-home.png", title: "Keep your home & valuables secure.", text: "Provides an added layer of protection to your windows to help deter intrusion and smash and grabs." },
        { icon: "/images/home-tint/icon-window.png", title: "Added daytime privacy.", text: "Tinted security film provides daytime privacy without losing the view and light." },
      ],
      button: { label: "Find your nearest store", href: "/contact-a-store/", variant: "outline" },
    },
    { type: "testimonial", background: "navy", quote: "Dealing with Andy was bliss, right from book the appointment to getting the tinting done. Andy definitely knows what he’s doing. He took his time to explain to us the different types of tints and patiently cleared all my doubts. Amazing job and highly recommended.", author: "Wasim, VIC" },
    {
      type: "ctaStrip",
      text: "Ready to get a quote?",
      buttons: [{ label: "Enquire now", href: "/contact-a-store/", variant: "outline" }],
      link: { label: "CALL 13 TINT", href: "tel:138468" },
    },
    {
      type: "infoCards",
      title: "Security film is also great for…",
      items: [
        { title: "HEAT", text: "Dramatically reduce the amount of heat entering your space without using blinds.", link: { label: "Learn More", href: "/home-tint/heat/" } },
        { title: "SAFETY", text: "Get peace of mind when your children are playing near windows.", link: { label: "Learn More", href: "/home-tint/safety/" } },
        { title: "GLARE", text: "Dramatically reduce the impact of glare on screens eliminating obstruction.", link: { label: "Learn More", href: "/home-tint/glare/" } },
      ],
    },
    {
      type: "accordion",
      title: "Some ==key reasons== to buy home window tint.",
      items: [
        {
          title: "Why should you get Home Window Tint?",
          html: "<p>Home window tinting can help to reduce heat, glare, and UV entering your home. You can also, increase privacy into rooms like bathrooms and bedrooms. The benefits of home window tint range from reducing harmful UV entering your home, which can not only protect you, but also potentially reduce the furniture and flooring from fading in your home.*</p><p>Tinted and frosted films can help stop prying eyes from seeing into your home keeping your home private. Safety and security films can add an extra layer of peace of mind by helping to protect the most vulnerable entry point in your home, windows.</p><p>Our home tinting films aren’t just limited to homes! You can tint your office, retail store or workspace as well.</p><p>At Tint a Car, we have a large variety of window film options and to find the perfect solution for you, ‘find your nearest store’ and ask for a free quote today.</p><p><em>*Multiple factors can affect fading; fading does not constitute warranty.</em></p>",
        },
        {
          title: "Lifetime Warranty",
          html: "<p>Lifetime warranty for residential applications. Commercial warranty varies depending on film. On all our films, please refer to your individual warranty for warranty terms and conditions, or if you have any questions contact your nearest store. All home and commercial tinting is non-transferable.</p>",
        },
        {
          title: "ARPANSA Certified",
          html: "<p>Tint a Car ensure that all of our window films across both automotive and home or office have been ARPANSA certified, meaning that you can trust that you’re getting the highest quality of film with true specifications. It’s just one of the reasons that Tint a Car is Australia’s most trusted tinting network!</p>",
        },
        {
          title: "Buy Now. Pay Later. Zero Interest.",
          html: "<p>Tint a Car offers Afterpay and ZIP Pay which means you can split your purchase over various payment schedules with ZERO interest. Get the right look, protection and privacy for your Car Home or Office sooner using one of our associated Buy Now, Pay Later partners!</p>",
        },
      ],
    },
  ],
};
