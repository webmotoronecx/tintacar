import type { PageData } from "@/types/sections";

export const homeTintFadePage: PageData = {
  path: "/home-tint/fade/",
  seo: { title: "Avoid Fading Furniture with Home Tinting by Tint a Car", description: "Solar window film can help reduce fading furniture and floors & see a difference in your power bills. Contact your nearest store or call 13TINT today!" },
  sections: [
    {
      type: "splitHero",
      title: "Anti Fade Window Film for furniture.",
      eyebrow: "MEET CAROL.",
      quote: "“I love the morning sunlight coming through my windows, but am afraid that my new couch might fade over time.”",
      buttons: [
        { label: "Find your nearest store", href: "/contact-a-store/", variant: "solid" },
        { label: "Enquire now", href: "/contact-a-store/", variant: "outline-light" },
      ],
      image: { src: "/images/home-tint/fade-hero.png", alt: "Meet Carol", width: 650, height: 434 },
    },
    {
      type: "heading",
      title: "How window tint helped Carol avoid premature fading of her furnishings.",
      as: "h2",
      size: "md",
      bold: true,
      divider: false,
      align: "left",
      html: "<p>We installed <strong>solar window film</strong> on her living room windows, which will help prevent potential fading without losing light through her windows. Now Carol can enjoy the sunlight and her new couch without the worry.</p>",
      spacing: "sm",
    },
    {
      type: "mediaText",
      decoration: "circle",
      image: { src: "/images/home-tint/fade-story.png", alt: "", width: 800, height: 533 },
      eyebrow: "WANT TO AVOID FADING FURNITURE AND FLOORING?",
      title: "We have a solution for you.",
      html: "<p>With solar window film, you’ll see a dramatic reduction in UV that could fade your carpets, floorboards, furniture and artwork.</p><p>You’ll also notice that your home stays cooler during the summer, and you’ll potentially see a difference in your power bills.^</p>",
      buttons: [{ label: "Find your nearest store", href: "/contact-a-store/", variant: "outline" }],
      showPaymentLogos: true,
    },
    {
      type: "iconFeatures",
      variant: "circle",
      eyebrow: "PROTECT THE FURNISHINGS IN YOUR HOME.",
      title: "Keep your interior in pristine condition with window film.",
      divider: true,
      dividerColor: "accent",
      columns: 3,
      items: [
        { icon: "/images/home-tint/icon-fading.png", title: "Reduce potential fade.", text: "Solar film blocks up to 99% of harmful UVA & UVB rays which can cause premature fading of furnishings." },
        { icon: "/images/home-tint/icon-furniture.png", title: "Protect your belongings.", text: "Have peace of mind knowing your artwork and photos are protected from fading." },
        { icon: "/images/home-tint/icon-window.png", title: "Provides daytime privacy.", text: "Window film provides daytime privacy without losing the view." },
      ],
      button: { label: "Find your nearest store", href: "/contact-a-store/", variant: "outline" },
    },
    { type: "testimonial", background: "navy", quote: "Thanks for your all round fantastic service and workmanship Scott. Special thanks to Jules who was extremely meticulous and worked in a very neat manner. It makes a huge difference to our living area, and I'm looking forward to the protection from the sun during the summer months. Quality is important to me, and it was a pleasure dealing with you guys.", author: "Robin, VIC" },
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
        { title: "PRIVACY", text: "Window film provides daytime privacy without losing the view and light.", link: { label: "Learn More", href: "/home-tint/privacy/" } },
        { title: "SAFETY", text: "Get peace of mind when your children are playing near windows.", link: { label: "Learn More", href: "/home-tint/safety/" } },
        { title: "GLARE", text: "Dramatically reduce the impact of glare on screens eliminating obstruction.", link: { label: "Learn More", href: "/home-tint/glare/" } },
      ],
    },
    {
      type: "accordion",
      title: "Some ==key reasons== to buy window film.",
      items: [
        {
          title: "Why should you get Home Window Tint?",
          html: "<p>Home window tinting can help to reduce heat, glare, and UV entering your home. You can also, increase privacy into rooms like bathrooms and bedrooms. The benefits of home window tint range from reducing harmful UV entering your home, which can not only protect you, but also potentially reduce the furniture and flooring from fading in your home.*</p><p>Tinted and frosted films can help stop prying eyes from seeing into your home keeping your home private. Safety and security films can add an extra layer of peace of mind by helping to protect the most vulnerable entry point in your home, windows.</p><p>Our home tinting films aren’t just limited to homes! You can tint your office, retail store or workspace as well.</p><p>At Tint a Car, we have a large variety of window film options and to find the perfect solution for you, ‘find your nearest store’ and ask for a free quote today.</p><p><em>^Multiple factors can affect power bills; reduction is not guaranteed.*Multiple factors can affect fading; fading does not constitute warranty.</em></p>",
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
