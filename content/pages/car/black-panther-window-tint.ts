import type { PageData } from "@/types/sections";
import { arpansaItem, buyNowPayLaterItem, ceramicBundle, lifetimeWarrantyItem, moneyBackItem, quoteStrip, warrantyNote } from "./shared";

const IMG = "/images/car-window-tint";
const STORE_PATH = "/contact-a-store/";

const faq = [
  ["Why is Black Panther better than Spectre?", "This latest technology matrix construction traps the heat between the layers and disperses it outwards, keeping the vehicle cabin cooler. It’s the nano-ceramic particles that will cool you down faster, and stay cool for longer."],
  ["Like Spectre, Black Panther is also a ceramic film, what makes it more expensive?", "BP also stands for ‘Better Performance’, and just one of the many performance deliverables and differentials is its ability to deliver zero signal interference from electronic devices including phones and GPS."],
  ["Why is this film called Black Panther. Is the tint ‘black’?", "We called this tint Black Panther for two reasons. As mentioned above, Black Panther abbreviated to BP, which also stands for ‘Better Performance’, and secondly, the Black Panther of animal kingdom fame is both ‘rare’, and pound for pound, one of if not <strong>‘the’</strong> strongest animal on the planet. Stronger than lion, a leopard, a tiger and so on. And yes black because the black panther is a melanistic cat, a condition that sees an excess of black pigment, and the trending window tint of all time is dark and legal. Black Panther fits that requirement."],
  ["So all ceramic tints have the ability to reject the sun’s most heat-causing infrared rays. What part of the ceramic story gives Black Panther the edge?", "There are two parts to this. Firstly, if you demand top-level performance combined with a custom look, you’ve found your answer in latest ceramic window tint. Although it starts with the same ultra-thin material as other tint it’s then coated with microscopic nano-ceramic particles invisible to the eye, powerful enough to reduce significant glare, maximum blockage of damaging UV rays, and handle the sun’s most heat-generating infrared rays.</p><p>Secondly, simply using the latest technology, advanced ceramic tint like BP pushes that power into new territory. BP has more concentrated nano-ceramic particles, boosting infrared blocking capabilities to higher levels, and because of this, newer ceramic innovations are sometimes called infrared tint or IR-blocking film. It’s this that sets BP apart."],
];

const faqHtml = [
  ...faq.map(([q, a]) => `<p><strong>Q: ${q}</strong></p><p><strong>A:</strong> ${a}</p>`),
  "<p><strong>Q: What warranty can I expect from Black Panther?</strong></p><p>A: Limited Lifetime, for as long as you own the vehicle.</p>",
].join("");

export const blackPantherWindowTintPage: PageData = {
  path: "/car-window-tint/black-panther-window-tint/",
  seo: {
    title: "Black Panther Car Tint - Ceramic Technology - Tint a Car",
    description:
      "Get superior ceramic film technology with the highest infrared heat rejection. Contact your local store to find out more & call 13TINT today!",
  },
  sections: [
    {
      type: "heroBanner",
      minHeight: "sm",
      image: { src: `${IMG}/black-panther-hero.jpg`, alt: "Black Panther Window Film", width: 1920, height: 750 },
    },
    {
      type: "heading",
      background: "black",
      spacing: "md",
      as: "h1",
      eyebrow: "EXPERIENCE EXTRAORDINARY",
      title: "A Window Film That’s World’s Apart",
      html: "<p><strong>High Performance Window Film.</strong></p>",
      divider: false,
      buttons: [
        { label: "Find your nearest store", href: STORE_PATH, variant: "outline-light" },
        { label: "Enquire now", href: "/contact-a-store/", variant: "white" },
      ],
    },
    {
      type: "heading",
      background: "black",
      spacing: "sm",
      as: "h3",
      size: "sm",
      align: "center",
      title: "Tint a Car’s Black Panther is the ==World’s Leading Hybrid-Matrix Technology Film.==",
      highlightColor: "brand",
      html: "<p>Black Panther Window Film is constructed with multiple heat absorbing nano-ceramic layers all dynamically working together to trap infrared heat that results in keeping warm air out of your vehicle. Plus, it comes with a fully transferable lifetime warranty.</p>",
      divider: false,
    },
    {
      type: "richText",
      background: "black",
      spacing: "sm",
      title: "Technical Specs",
      as: "h3",
      size: "sm",
      html: [
        "<ul><li>Total Solar Energy Rejection: 60%</li><li>Infrared Energy Rejection*: 99%</li><li>UV Protection: 99%</li><li>Glare Reduction: 81%</li></ul>",
        "<p><em>The above specifications are based on Black Panther 20VLT Window Film.<br>*SIRR.</em></p>",
        '<p><strong>Get Black Panther Window Tint Interest Free with <a href="/articles/afterpay/">Afterpay</a> or <a href="/articles/zip-pay/">ZIP Pay</a>!</strong></p>',
        "<h4>Come and feel the difference in store!</h4>",
      ].join(""),
    },
    {
      type: "buttonGroup",
      background: "black",
      spacing: "sm",
      align: "left",
      buttons: [{ label: "Find your nearest store", href: STORE_PATH, variant: "white" }],
    },
    {
      type: "infoCards",
      background: "black",
      spacing: "md",
      items: [
        { title: "Heat Absorption", text: "Exclusive heat-absorbing nano-ceramic technology delivers Extraordinary driver comfort. Black Panther using Hybrid-Matrix Nano-Ceramic technology delivers maximum heat rejection and zero signal interference from your favourite electronic devices" },
        { title: "Safety First", text: "Molecular technology distinctly engineered to reinforce vehicle glass in the event of the vehicle’s windows shattering in an accident. Advanced nano-ceramic technology reduces road glare by up to 81%. Our most prodigious window film with ultra-high grade UV protection, boosting both visibility and clarity through cutting-edge hybrid-matrix technology" },
        { title: "Nano-Ceramic Durability", text: "Black Panther nano-technology infused film provides unprecedented heat protection, exceptional UV protection and naturally, Black Panther ‘scratch resistance’!" },
      ],
    },
    { type: "video", youtubeId: "WQ43PjaQVpQ", title: "Black Panther window film" },
    { type: "ctaStrip", ...quoteStrip },
    { type: "promoCard", ...ceramicBundle },
    { type: "note", text: "*Prices vary depending on tint selection & vehicle size, T&C’s apply ask in store for details." },
    {
      type: "heading",
      background: "black",
      spacing: "md",
      align: "center",
      title: "==Black Panther Window Film:==\n==Stops You In Your Tracks==",
      highlightColor: "brand",
      html: "<p>Infused with multiple nano-ceramic layers all dynamically working together, Black Panther Window Film traps infrared heat delivering extraordinary driver comfort.</p>",
      size: "sm",
      divider: false,
    },
    {
      type: "tileGrid",
      background: "black",
      spacing: "sm",
      columns: 4,
      gap: "md",
      items: [
        { image: { src: `${IMG}/black-panther-spec-1.png`, alt: "99% solar infrared rejection - amazing heat reduction", width: 304, height: 300 } },
        { image: { src: `${IMG}/black-panther-spec-2.png`, alt: "65% total solar energy rejected - for a much cooler interior", width: 304, height: 300 } },
        { image: { src: `${IMG}/black-panther-spec-3.png`, alt: ">99% UV rejection - providing maximum protection", width: 304, height: 300 } },
        { image: { src: `${IMG}/black-panther-spec-4.png`, alt: "81% glare reduction - reduces risk of interrupted vision", width: 304, height: 300 } },
      ],
    },
    { type: "note", background: "black", text: "* The specifications above represent Black Panther VLT 20." },
    {
      type: "buttonGroup",
      background: "black",
      spacing: "sm",
      align: "center",
      buttons: [{ label: "Find your nearest store", href: STORE_PATH, variant: "outline-light" }],
    },
    {
      id: "questions",
      type: "heading",
      background: "black",
      spacing: "md",
      align: "center",
      title: "Want to know more about\n==Black Panther Window Film?==",
      highlightColor: "brand",
      size: "sm",
      divider: false,
    },
    { type: "richText", background: "black", spacing: "sm", width: "narrow", html: faqHtml },
    {
      type: "buttonGroup",
      background: "black",
      spacing: "md",
      align: "center",
      buttons: [
        { label: "Find your nearest store", href: STORE_PATH, variant: "outline-light" },
        { label: "Go back to top", href: "/car-window-tint/black-panther-window-tint/", variant: "muted" },
      ],
    },
    {
      type: "accordion",
      title: "Some ==key reasons== to buy Black Panther Window Film.",
      highlightColor: "accent",
      defaultOpen: 2,
      items: [
        lifetimeWarrantyItem("almost 50"),
        arpansaItem("/wp-content/uploads/2025/10/Black-Panther-35.pdf"),
        buyNowPayLaterItem,
        moneyBackItem,
      ],
    },
    { type: "note", text: warrantyNote },
  ],
};
