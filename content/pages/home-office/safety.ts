import type { PageData } from "@/types/sections";

export const homeTintSafetyPage: PageData = {
  path: "/home-tint/safety/",
  seo: { title: "Safety Window Film with Home Tinting by Tint a Car", description: "Our safety window films help prevent break-ins & keeps your family safe. Find out more by contacting your nearest store & get a free measure & quote!" },
  sections: [
    {
      type: "splitHero",
      title: "Safety Window Film to protect the family.",
      eyebrow: "MEET MARIA.",
      quote: "“With 2 (very active) young kids, I was concerned about the potential risk of broken windows from a rogue ball or rough play.”",
      buttons: [
        { label: "Find your nearest store", href: "/contact-a-store/", variant: "outline-light" },
        { label: "Enquire now", href: "/contact-a-store/", variant: "solid" },
      ],
      image: { src: "/images/home-tint/safety-hero.png", alt: "Meet Maria", width: 650, height: 434 },
    },
    {
      type: "heading",
      title: "How home window tint helped Maria with her safety concerns.",
      as: "h3",
      size: "sm",
      divider: false,
      align: "left",
      html: "<p>We installed a <strong>safety window film</strong> to provide extra strength to the window panes, helping hold glass together in the event of an accident. Now the kids can play without Maria having to worry about serious injury.</p>",
      spacing: "sm",
    },
    {
      type: "mediaText",
      decoration: "circle",
      image: { src: "/images/home-tint/safety-story.jpeg", alt: "safety window film at home", width: 800, height: 533 },
      eyebrow: "CONCERNED ABOUT SAFETY IN THE HOME?",
      title: "We have a solution for you.",
      html: "<p>Safety window film is thicker than standard films and when hit with force, will help keep shattered glass in place.</p><p>In the case of accidental glass breakage, such as children playing ball games near windows, you can rest assured that the shattered glass will not harm anyone, as the film will keep all glass shards together.</p>",
      buttons: [{ label: "Find your nearest store", href: "/contact-a-store/", variant: "outline" }],
      showPaymentLogos: true,
    },
    {
      type: "iconFeatures",
      variant: "circle",
      eyebrow: "SAFETY WINDOW FILM",
      title: "Keep your family safe by avoiding glass shattering.",
      divider: true,
      dividerColor: "accent",
      columns: 3,
      items: [
        { icon: "/images/home-tint/icon-broken-glass.png", title: "Glass is prevented from shattering.", text: "Safety film holds shattered glass together should it break, preventing injury." },
        { icon: "/images/home-tint/icon-family.png", title: "Know your family is safe around windows.", text: "Get peace of mind when your children are playing near windows." },
        { icon: "/images/home-tint/icon-affordable.png", title: "An affordable & safe solution for families.", text: "Can you ever put a price on safety? You’d be surprised how affordable our safety film is." },
      ],
      button: { label: "Find your nearest store", href: "/contact-a-store/", variant: "outline" },
    },
    { type: "testimonial", background: "navy", quote: "I rarely give reviews, but Tint a Car Bendigo are just excellent that I have to say so! Excellent home window tinting products and service (much more to offer than I thought). They are always so friendly and willing to do their best. Highly recommend!!!", author: "Yang Lin, Bendigo" },
    {
      type: "ctaStrip",
      text: "Ready to get a quote?",
      buttons: [{ label: "Enquire now", href: "/contact-a-store/", variant: "outline" }],
      link: { label: "CALL 13 TINT", href: "tel:138468" },
    },
    {
      type: "infoCards",
      title: "Safety film is also great for…",
      items: [
        { title: "PRIVACY", text: "Window film provides daytime privacy without losing the view and light.", link: { label: "Learn More", href: "/home-tint/privacy/" } },
        { title: "HEAT", text: "Dramatically reduce the amount of heat entering your space without using blinds.", link: { label: "Learn More", href: "/home-tint/heat/" } },
        { title: "GLARE", text: "Dramatically reduce the impact of glare on screens eliminating obstruction.", link: { label: "Learn More", href: "/home-tint/glare/" } },
      ],
    },
    {
      type: "accordion",
      title: "Some ==key reasons== to buy safety window film for your home.",
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
