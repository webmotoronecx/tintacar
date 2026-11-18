import type { MediaTextSection, PageData } from "@/types/sections";

const findStore = { label: "Find your nearest store", href: "/contact-a-store/", variant: "outline" } as const;

const bullets = (items: string[]) => `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;

const productBlock = (block: Omit<MediaTextSection, "type" | "buttons" | "imagePosition">): MediaTextSection => ({
  type: "mediaText",
  imagePosition: "left",
  buttons: [findStore],
  ...block,
});

export const officePage: PageData = {
  path: "/office/",
  seo: {
    title: "Office Window Tinting with Tint a Home - Tint a Car",
    description:
      "See the benefits of tinting your office windows - reduce glare, added security, anti-graffiti, added privacy or decorative branding. Call 13TINT for a quote!",
  },
  sections: [
    {
      type: "splitHero",
      title: "Window Tint for Shops, Offices and Commercial Spaces",
      quote:
        "Window films can transform your office in both a creative and unique way plus help to increase privacy and comfort levels, improve safety and security and make a statement with clever use of decorative films.",
      buttons: [{ label: "Enquire now", href: "/contact-a-store/", variant: "solid" }],
      image: { src: "/images/office/office-hero.png", alt: "Modern office with glass partitions", width: 650, height: 434 },
    },
    {
      type: "heading",
      title: "There’s so much versatility and so many benefits from tinting your windows.",
      as: "h3",
      size: "sm",
      divider: false,
      spacing: "sm",
      html: "<p>The story starts with the enormous range of Solar films designed to help reduce heat with the knock-on benefits of lowering your buildings utility costs by helping reduce warm air escaping in winter and keeping the insides cooler in summer. Add to that you can choose privacy films for either office windows or for internal glass partitioning and a whole lot more.</p>",
    },
    productBlock({
      image: { src: "/images/office/solar-control.png", alt: "Reject heat and glare with solar control film", width: 800, height: 533 },
      eyebrow: "HAVING TROUBLE WITH HEAT OR GLARE?",
      title: "Solar Control Films.",
      html: bullets([
        "Offers ultimate sun control solutions at an affordable cost, a great substitute for high maintenance curtains or blinds.",
        "Blocks up to 99% of harmful, minimising UV rays to reduce fading of furnishings and floorings.",
        "Decrease environmental impact and maximise the efficiency of your glass by choosing from Tint a Car Commercials range of specialised films.",
      ]),
    }),
    productBlock({
      image: { src: "/images/office/frosted-decorative.png", alt: "Custom signage with decorative office film", width: 800, height: 533 },
      eyebrow: "LOOKING FOR SHOW-STOPPING DISPLAYS OR ADDED PRIVACY?",
      title: "Frosted or Decorative Films.",
      html: bullets([
        "Consider frosted or decorative film to meeting rooms, reception areas, internal glass partitions yet still allowing light to pass through.",
        "Choose from a large range of style, opacity and translucency or share your designs and we can print onto film.",
        "Ideal for corporate branding.",
        "Improves workplace productivity.",
      ]),
    }),
    productBlock({
      image: { src: "/images/office/security-film.png", alt: "Increase safety and welfare with security film", width: 800, height: 533 },
      eyebrow: "DETER BREAK-INS AND PROTECT YOUR PROPERTY.",
      title: "Security Window Film.",
      html: bullets([
        "Security films can help prevent Intruders from easily breaking your glass windows or doors and gaining entry to your building.",
        "Can be up to 10 times thicker than standard film and have been independently tested.",
        "Available in clear or tinted options.",
      ]),
    }),
    productBlock({
      image: { src: "/images/office/anti-graffiti.png", alt: "Protection from vandalism at a bus shelter", width: 800, height: 533 },
      eyebrow: "A COST-EFFECTIVE WAY TO DEAL WITH VANDALISM ON YOUR WINDOWS.",
      title: "Anti-Graffiti Film.",
      html: "<p><strong>Sacrificial anti-graffiti film</strong> is a quick, easy and cost-effective way to deal with vandalism and graffiti. Simply replacing a layer of film that’s been defaced is infinitely cheaper than replacing damaged glass.</p>",
    }),
    {
      type: "iconFeatures",
      variant: "circle",
      eyebrow: "HERE’S SOME REASONS TO CHOOSE",
      title: "‘Commercial’ Film from Tint a Car.",
      divider: true,
      dividerColor: "accent",
      columns: 3,
      items: [
        { icon: "/images/home-tint/icon-uv.png", title: "Rejects up to 70% heat", text: "and blocks out up to 99% of damaging UV rays." },
        { icon: "/images/home-tint/icon-glare.png", title: "Reduce glare on screens", text: "by up to 91% to reduce eyestrain and discomfort." },
        { icon: "/images/home-tint/icon-superior-heat.png", title: "Improve insulation", text: "to reduce energy costs and increase comfort levels of workforce." },
        { icon: "/images/home-tint/icon-2shades.png", title: "Prevent furniture deterioration", text: "such as carpet fade, timber floor fade and other furnishings." },
        { icon: "/images/home-tint/icon-durable.png", title: "Offers varying degrees of privacy", text: "with the choice to maintain clear views or choose total block-out." },
        { icon: "/images/home-tint/icon-certified.png", title: "Peace of mind", text: "Manufacturer’s warranty on commercial film up to 12 years*." },
      ],
    },
    {
      type: "ctaStrip",
      text: "Ready to get a quote?",
      buttons: [{ label: "Enquire now", href: "/contact-a-store/", variant: "outline" }],
      link: { label: "CALL 13 TINT", href: "tel:138468" },
    },
    {
      type: "testimonial",
      background: "navy",
      quote:
        "I rarely give reviews without asking, but Tint a Car Bendigo are just excellent that I have to say so! Excellent window tinting products and service (much more to offer than I thought). They are always so friendly and willing to do their best. Highly recommend!!!",
      author: "Yang, VIC",
    },
    {
      type: "accordion",
      title: "Some ==key reasons== to buy window film.",
      items: [
        {
          title: "Lifetime Warranty",
          html: "<p>Lifetime warranty for residential applications. Commercial warranty varies depending on film. On all our films, please refer to your individual warranty for warranty terms and conditions, or if you have any questions contact your nearest store.</p><p>All home and commercial tinting is non-transferable.</p>",
        },
        {
          title: "ARPANSA Certified",
          html: "<p>Tint a Car ensure that all of our window films across both automotive and home or office have been ARPANSA certified, meaning that you can trust that you’re getting the highest quality of film with true specifications. It’s just one of the reasons that Tint a Car is Australia’s most trusted tinting network!</p>",
        },
        {
          title: "Buy Now. Pay Later. Zero Interest.",
          html: '<p>Both Zip Pay and Open Pay are a fast, simple, and flexible service that allows you to easily manage your finances through an App. Get the right look, protection and privacy for your space sooner using <a href="/articles/afterpay/">Open Pay</a> or <a href="/articles/zip-pay/">Zip</a> to pay later!</p>',
        },
      ],
    },
    { type: "note", text: "*Terms and conditions apply.", align: "center", spacing: "sm" },
  ],
};
