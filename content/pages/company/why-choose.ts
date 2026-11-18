import type { PageData } from "@/types/sections";

export const whyChoosePage: PageData = {
  path: "/why-choose/",
  seo: {
    title: "Why Choose Tint a Car? - Tint a Car",
    description:
      "Read our 10+ reasons why you should choose Tint a Car for your window tinting needs. Contact your local store for a free measure & quote!",
  },
  sections: [
    {
      type: "heading",
      title: "Why choose Tint a Car?",
      as: "h1",
      divider: false,
      spacing: "sm",
    },
    {
      type: "richText",
      title: "You’ve made the ==right choice!==",
      as: "h3",
      size: "sm",
      spacing: "sm",
      html: '<ol><li>30 day money back guarantee on car tints, no questions asked*</li><li>Peace of mind lifetime Warranties at all stores, Australia-wide^</li><li>Australia’s most trusted tinting network for home, office and car tinting</li><li>More than just tinting, offering state-of-the-art <a href="/protection-products/elitex-surface-protection/">Paint Protection</a>, <a href="/protection-products/paint-protection-film/">Paint Protection Film</a>, &amp; <a href="/car-care/">Car Care Products</a></li><li>Buy now, Pay Later payment options with <a href="/articles/afterpay/">Afterpay</a> or <a href="/articles/zip-pay/">Zip Pay</a></li><li>All Tint a Car films are government certified by ARPANSA to ensure highest quality</li><li>(When available) Free Courtesy Cars whilst we tint your vehicle</li><li>Members of the Window Film Association of Australia</li><li>Exclusive products from the largest supplier of window film in the world</li><li>Installation by professionally trained Installers</li></ol>',
    },
    {
      type: "accordion",
      title: "Some ==key reasons== to choose Tint a Car.",
      items: [
        {
          title: "Lifetime Warranty",
          html: "<p>^Tint a Car have been supplying Australians with all their tinting needs for almost 50 years, but if that isn’t convincing enough we’re now making the commitment and offering a Lifetime Warranty on all of our films. This gives you complete peace of mind on your tint for your vehicle, home or office.</p><p>Black Panther is the <strong>only</strong> tint with a transferable warranty. Octane and Spectre tints do <strong>not</strong> have transferable warranties.</p>",
        },
        {
          title: "Interest Free",
          html: '<p>Tint a Car offers <a href="/articles/afterpay/">Afterpay</a> and <a href="/articles/zip-pay/">ZIP Pay</a> which means you can split your purchase over various payment schedules with ZERO interest. Get the right look, protection and privacy for your Car Home or Office sooner using one of our associated Buy Now, Pay Later partners!</p>',
        },
        {
          title: "30 Day Money Back Guarantee",
          html: "<p>*If you’re not completely satisfied with your automotive tint from any Tint a Car store, we’ll remove the tint and give you your money back. Must claim within 30 days of sale.</p>",
        },
      ],
    },
    { type: "note", text: "^Warranty terms, conditions and exclusions apply *Where available", spacing: "sm" },
  ],
};
