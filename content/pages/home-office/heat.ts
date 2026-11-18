import type { PageData } from "@/types/sections";

export const homeTintHeatPage: PageData = {
  path: "/home-tint/heat/",
  seo: { title: "Reduce Heat with Window Film from Tint a Home - Tint a Car", description: "With solar window film, your home or office stays cooler in the summer and cosier in winter. See a difference in your power bills by calling us on 13TINT today!" },
  sections: [
    {
      type: "splitHero",
      title: "Window Film that reflects heat for cooler summers.",
      eyebrow: "MEET SIMON.",
      quote: "“I love entertaining but I’m finding my living area is getting too hot in the summer months when I host dinner parties.”",
      buttons: [
        { label: "Find your nearest store", href: "/contact-a-store/", variant: "outline-light" },
        { label: "Enquire now", href: "/contact-a-store/", variant: "solid" },
      ],
      image: { src: "/images/home-tint/heat-hero.png", alt: "Meet Simon", width: 650, height: 434 },
    },
    {
      type: "heading",
      title: "How window tinting helped Simon reduce the heat in his home.",
      as: "h2",
      size: "md",
      bold: true,
      divider: false,
      align: "left",
      html: "<p>We installed solar window film on the glass bi-fold doors to his living-dining area to dramatically reduce the amount of heat entering the space. Now Simon can entertain his friends at any time of year without worrying about the heat.</p>",
      spacing: "sm",
    },
    {
      type: "mediaText",
      decoration: "circle",
      image: { src: "/images/home-tint/heat-story.png", alt: "Solar Film Overlooking Kitchen", width: 800, height: 533 },
      eyebrow: "DO YOU HAVE LARGE EXPANSES OF GLASS IN YOUR HOME?",
      title: "We have a solution for you.",
      html: "<p>With <strong>solar window films</strong> you’ll notice a substantial reduction in solar heat entering your home and a potential difference in your power bills without the need to run the air conditioner overtime.^</p><p>You’ll also have the added benefit of reducing UV rays and preventing premature fading of your furnishings.</p>",
      buttons: [{ label: "Find your nearest store", href: "/contact-a-store/", variant: "outline" }],
      showPaymentLogos: true,
    },
    {
      type: "iconFeatures",
      variant: "circle",
      eyebrow: "REDUCE THE HEAT INSIDE YOUR HOME",
      title: "Your home will be cooler and more comfortable all year-round.",
      divider: true,
      dividerColor: "accent",
      columns: 3,
      items: [
        { icon: "/images/home-tint/icon-superior-heat.png", title: "UV is rejected by up to 99%.", text: "Protecting you and your family from harmful rays. While also looking great on your home." },
        { icon: "/images/home-tint/icon-save-money.png", title: "Potential Savings.", text: "Window film can help reduce the amount of time you need to run your air-conditioner." },
        { icon: "/images/home-tint/icon-fading.png", title: "Reduce premature fading", text: "Prevent premature fading of your flooring and furniture.*" },
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
