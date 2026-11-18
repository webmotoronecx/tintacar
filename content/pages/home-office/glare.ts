import type { PageData } from "@/types/sections";

export const homeTintGlarePage: PageData = {
  path: "/home-tint/glare/",
  seo: { title: "Reduce Glare with Home Tinting by Tint a Car", description: "With solar window film, you can reduce the glare coming through your home or office windows. See a difference in your power bills by calling us on 13TINT today!" },
  sections: [
    {
      type: "splitHero",
      title: "Specialised window film that dramatically cuts down glare.",
      eyebrow: "MEET MIKE.",
      quote: "“I struggled to see my computer screen due to glare from the afternoon sun, as my study windows face west.”",
      buttons: [
        { label: "Find your nearest store", href: "/contact-a-store/", variant: "outline-light" },
        { label: "Enquire now", href: "/contact-a-store/", variant: "solid" },
      ],
      image: { src: "/images/home-tint/glare-hero.png", alt: "Meet Mike", width: 650, height: 434 },
    },
    {
      type: "heading",
      title: "How window tint helped Mike with glare issues at home.",
      as: "h2",
      size: "md",
      bold: true,
      divider: false,
      align: "left",
      html: "<p>We installed a specific <strong>solar window film</strong> on Mike’s home/office windows ,designed to dramatically reduce the impact of glare on his screens. Now Mike can get his work done at any time of day, without distraction! Now Mike can get his work done at any time of day without that annoying glare that before film on his windows meant he had to pull down the blinds and lose his daytime view.</p>",
      spacing: "sm",
    },
    {
      type: "mediaText",
      decoration: "circle",
      image: { src: "/images/home-tint/glare-story.png", alt: "", width: 800, height: 533 },
      eyebrow: "WANT TO GET RID OF THAT ANNOYING GLARE?",
      title: "We have a solution for you.",
      html: "<p>Having Tint a Car apply Solar special window film designed to minimises glare on computer and TV screens means can watch without the distraction of annoying glare. AND, no need to close the blinds!</p>",
      buttons: [{ label: "Find your nearest store", href: "/contact-a-store/", variant: "outline" }],
      showPaymentLogos: true,
    },
    {
      type: "iconFeatures",
      variant: "circle",
      eyebrow: "DON’T LET GLARE RUIN THE PICTURE.",
      title: "Avoid glare on screens with solar window film.",
      divider: true,
      dividerColor: "accent",
      columns: 3,
      items: [
        { icon: "/images/home-tint/icon-window.png", title: "No need for blinds.", text: "Solar film minimises glare on TVs so you can watch without disturbance." },
        { icon: "/images/home-tint/icon-glare.png", title: "Remove distracting glare.", text: "Work without the distraction of glare on your computer screen." },
        { icon: "/images/home-tint/icon-window.png", title: "Provides daytime privacy.", text: "Window film provides daytime privacy without losing the view." },
      ],
      button: { label: "Find your nearest store", href: "/contact-a-store/", variant: "outline" },
    },
    { type: "testimonial", background: "navy", quote: "Thanks to the guys at Tint a Car for tinting the front of our house. Great job on time and price. Definitely looking forward to not having the glare come through anymore.", author: "Brent, WA" },
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
        { title: "HEAT", text: "Dramatically reduce the amount of heat entering your space without using blinds.", link: { label: "Learn More", href: "/home-tint/heat/" } },
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
