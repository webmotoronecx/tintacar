import type { PageData } from "@/types/sections";

export const homeTintDecorativeFilmPage: PageData = {
  path: "/home-tint/decorative-film/",
  seo: { title: "Decorative Films with Tint a Home - Tint a Car", description: "Enjoy the freedom of private personal spaces with frosted film or customised designs on your home or office. Contact your local Tint a Home store for a free quote!" },
  sections: [
    {
      type: "splitHero",
      title: "Decorative & Frosted Window film to style your home.",
      eyebrow: "MEET RICK & SUE.",
      quote: "“We wanted to put the final touches on our new house by adding a unique design to the bathroom.”",
      buttons: [
        { label: "Enquire now", href: "/contact-a-store/", variant: "solid" },
      ],
      image: { src: "/images/home-tint/decorative-film-hero.png", alt: "Meet Rick & Sue", width: 650, height: 434 },
    },
    {
      type: "heading",
      title: "How Tint a Home helped Rick & Sue enhance their bathroom.",
      as: "h3",
      size: "sm",
      divider: false,
      align: "left",
      html: "<p>We printed and installed window film from the design they chose, giving the bathroom a personalised style which helps break up the expanse of plain glass. Now they can enjoy using their bathroom in style.</p>",
      spacing: "sm",
    },
    {
      type: "mediaText",
      decoration: "circle",
      image: { src: "/images/home-tint/decorative-film-story.png", alt: "", width: 800, height: 533 },
      eyebrow: "WANT TO MAKE A CREATIVE IMPACT?",
      title: "We have a solution for you.",
      html: "<p>A unique alternative to <strong>frosted film</strong>, customised designs allow you to bring the creative flair to your home. It can offer privacy, act as a divider in your bathroom or you can even customise designs to suit your style.</p><p>Using digital graphics and computer cut technology, decorative window film is created to transform plain glass into an inspiring artistic expression.</p>",
      buttons: [{ label: "Find your nearest store", href: "/contact-a-store/", variant: "outline" }],
      showPaymentLogos: true,
    },
    {
      type: "iconFeatures",
      variant: "circle",
      eyebrow: "ENHANCE THE LOOK AND FEEL OF YOUR HOME",
      title: "Decorative window film can transform plain glass into an inspiring artistic expression with our range of designs.",
      divider: true,
      dividerColor: "accent",
      columns: 3,
      items: [
        { icon: "/images/home-tint/icon-style.png", title: "Add creativity, style & privacy.", text: "We have a range of styles available as well as the option to create customised designs to suit your space." },
        { icon: "/images/home-tint/icon-save-money.png", title: "Affordable decorative solution to kids bedrooms.", text: "An affordable solution to decorating kids rooms and updating the designs as they grow." },
        { icon: "/images/home-tint/icon-frosted.png", title: "Frosted film is great for added privacy.", text: "Decorative film can be used for a unique look or simple for privacy with frosted film." },
      ],
      button: { label: "Find your nearest store", href: "/contact-a-store/", variant: "outline" },
    },
    { type: "testimonial", background: "navy", quote: "I rarely give reviews without asking, but Tint a Car Bendigo are just excellent that I have to say so! Excellent home window tinting products and service (much more to offer than I thought). They are always so friendly and willing to do their best. Highly recommend!!!", author: "Yang, VIC" },
    {
      type: "ctaStrip",
      text: "Ready to get a quote?",
      buttons: [{ label: "Enquire now", href: "/contact-a-store/", variant: "outline" }],
      link: { label: "CALL 13 TINT", href: "tel:138468" },
    },
    {
      type: "infoCards",
      title: "Decorative film is also great for…",
      items: [
        { title: "HEAT", text: "Dramatically reduce the amount of heat entering your space without using blinds.", link: { label: "Learn More", href: "/home-tint/heat/" } },
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
