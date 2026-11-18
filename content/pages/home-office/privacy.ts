import type { PageData } from "@/types/sections";

export const homeTintPrivacyPage: PageData = {
  path: "/home-tint/privacy/",
  seo: { title: "Privacy Films with Home Tinting by Tint a Car", description: "Privacy window film helps provide daytime privacy without losing your view! See a difference in your power bills. Contact your nearest store or call 13TINT!" },
  sections: [
    {
      type: "splitHero",
      title: "Privacy Window Film for your home.",
      eyebrow: "MEET MELANIE.",
      quote: "“My large living room windows were the main reason for buying my home, but I feel quite uneasy about the visibility from the street.”",
      buttons: [
        { label: "Find your nearest store", href: "/contact-a-store/", variant: "outline-light" },
        { label: "Enquire now", href: "/contact-a-store/", variant: "solid" },
      ],
      image: { src: "/images/home-tint/privacy-hero.png", alt: "Meet Melanie", width: 650, height: 434 },
    },
    {
      type: "heading",
      title: "How window tint helped Melanie create privacy in her home.",
      as: "h2",
      size: "md",
      bold: true,
      divider: false,
      align: "left",
      html: "<p>We installed window film to her front windows, helping to provide privacy during the day and comfort in knowing that the view from outside-in had been eliminated. Now Melanie can relax in her home while enjoying the view.</p>",
      spacing: "sm",
    },
    {
      type: "mediaText",
      decoration: "circle",
      image: { src: "/images/home-tint/privacy-story.png", alt: "", width: 800, height: 533 },
      eyebrow: "DO YOU HAVE AN ISSUE WITH PRYING EYES INTO YOUR HOME?",
      title: "We have a solution for you.",
      html: "<p>Our range of <strong>privacy window films</strong> allow you to maintain maximum daytime privacy while allowing natural light in your home.</p><p>Privacy film is perfect for homes overlooking neighbours and street facing living rooms.</p>",
      buttons: [{ label: "Find your nearest store", href: "/contact-a-store/", variant: "outline" }],
      showPaymentLogos: true,
    },
    {
      type: "iconFeatures",
      variant: "circle",
      eyebrow: "INCREASE PRIVACY IN YOUR HOME",
      title: "No need to use blinds or curtains during the day in your home when you install privacy window film.",
      divider: true,
      dividerColor: "accent",
      columns: 3,
      items: [
        { icon: "/images/home-tint/icon-window.png", title: "Increase privacy in your home.", text: "Provide an added layer to deter prying eyes and keep your home private." },
        { icon: "/images/home-tint/icon-brightness.png", title: "Keep your home light & bright.", text: "Obscure the view into your home without the need to close your blinds." },
        { icon: "/images/home-tint/icon-family.png", title: "Added safety feature", text: "Get peace of mind when your children are playing near windows." },
      ],
      button: { label: "Find your nearest store", href: "/contact-a-store/", variant: "outline" },
    },
    { type: "testimonial", background: "navy", quote: "Thank you tint a car for your excellent service!! I had some home tinting done, there is one room in our house that gets so hot, the sun is always directly facing it!! I felt a huge difference in the room as soon as the tint was put on and I am so happy with the result. Also the tint helps with any privacy issues during the day too!! Would definitely recommend tint a car for anyone who needs any home tinting done.", author: "Sabrina, NSW" },
    {
      type: "ctaStrip",
      text: "Ready to get a quote?",
      buttons: [{ label: "Enquire now", href: "/contact-a-store/", variant: "outline" }],
      link: { label: "CALL 13 TINT", href: "tel:138468" },
    },
    {
      type: "infoCards",
      title: "Solar film is also great for…",
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
