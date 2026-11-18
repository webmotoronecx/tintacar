import type { PageData } from "@/types/sections";
import { FIND_STORE } from "./shared";

const CERAMIC_LINK = '<a href="/protection-products/elitex-surface-protection/">Elite X Ceramic Paint Protection</a>';

export const carCarePage: PageData = {
  path: "/car-care/",
  seo: {
    title: "Car Care – Maintain Your Product Warranty- Tint a Car",
    description: "What you need to maintain your product warranty! 11 essential steps for maintaining your vehicle.",
  },
  sections: [
    {
      type: "heading",
      title: "Elite X Car Care Range",
      as: "h1",
      subtitle: "The ultimate in vehicle maintenance is now available at your nearest store!",
      spacing: "sm",
    },
    {
      type: "imageBanner",
      width: "narrow",
      spacing: "sm",
      image: { src: "/images/protection/car-care-range-banner.jpg", alt: "Tint a Car car care product range bundle pack", width: 1000, height: 550 },
    },
    {
      type: "heading",
      title: "Our car care products can be purchased at your nearest store.",
      as: "h3",
      size: "sm",
      align: "center",
      divider: false,
      spacing: "sm",
      buttons: [{ ...FIND_STORE, variant: "solid" }],
    },
    {
      type: "mediaText",
      imagePosition: "left",
      spacing: "sm",
      image: { src: "/images/protection/car-care-shampoo-gallery.png", alt: "Elite X Shampoo and Ceramic Rejuvenator and WindowCleaner by Tint a Car", width: 1044, height: 1035 },
      html: `<p><strong>Elite X Shampoo</strong><br>Specially formulated to be used after ${CERAMIC_LINK} application, Elite X Shampoo enhances and maintains the high gloss finish, hydrophobic and UV protective qualities, in addition to being a high performing car shampoo for any car.<br><em>Best paired with <strong>Elite X Ceramic Rejuvenator.</strong></em></p>`,
    },
    {
      type: "mediaText",
      imagePosition: "right",
      spacing: "sm",
      image: { src: "/images/protection/car-care-ceramic-rejuvenator-gallery.png", alt: "Elite X Ceramic Rejuvenator by Tint a Car", width: 1044, height: 1035 },
      html: `<p><strong>Elite X Ceramic Rejuvenator</strong><br>Using Elite X Ceramic Rejuvenator when washing your car helps to not only detail your car to showroom quality, but build upon the protective ceramic qualities of Elite X.<br><em>For best results, use after <strong>${CERAMIC_LINK}</strong> has been applied, in conjunction with the microfibre cloth and twist drying towel.</em></p>`,
    },
    {
      type: "tileGrid",
      variant: "card",
      columns: 3,
      items: [
        {
          image: { src: "/images/protection/car-care-tyre-magic.jpg", alt: "EliteX Tyre Magic car care product", width: 800, height: 793 },
          title: "Elite X Tyre Magic",
          text: "A water based gel that is applied to the tyre producing a dry film that prevents messy application. Comes with free applicator sponge.",
        },
        {
          image: { src: "/images/protection/car-care-interior-rejuvenator.jpg", alt: "EliteX Interior Rejuvenator Product", width: 800, height: 793 },
          title: "Elite X Interior Rejuvenator",
          text: "Formulated for vinyl, rubber and plastic trims to clean, rejuvenate & protect against harmful UV Rays. For the perfect application, use in conjunction with our microfibre cloth.",
        },
        {
          image: { src: "/images/protection/car-care-protection-pack.jpg", alt: "EliteX Bundle+Bucket car care pack", width: 800, height: 793 },
          title: "Elite X Protection Pack",
          text: "Get the full range of car care products, plus our 15L Elite X Bucket!",
        },
        {
          image: { src: "/images/protection/car-care-drying-towel.jpg", alt: "Tint a Car car care products Black Twist Towel", width: 800, height: 793 },
          title: "Drying Towel",
          text: "Scratch-free super-soft microfibre weave, dries quickly without getting too heavy. 90 x 60cm, machine washable.",
        },
        {
          image: { src: "/images/protection/car-care-wash-mitt.jpg", alt: "Tint a Car car care products Noodle Mit", width: 800, height: 793 },
          title: "Microfibre Wash Mitt",
          text: "Deep-pile microfibre noodles absorb dirt and grime, to prevent dragging across the paintwork. Machine washable.",
        },
        {
          image: { src: "/images/protection/car-care-microfibre-cloth.jpg", alt: "tint a car Blue Microfibre cloth", width: 800, height: 793 },
          title: "Microfibre Cloth",
          text: "Perfect for product application, and buffing. 50x50cm, machine washable.",
        },
      ],
    },
    {
      type: "heading",
      title: "Found something you fancy? Contact your local store and make a purchase today!",
      as: "h3",
      size: "sm",
      align: "center",
      divider: false,
      spacing: "sm",
      buttons: [{ ...FIND_STORE, variant: "solid" }],
    },
    {
      type: "heading",
      title: "Here’s some tips and tricks on how to maintain your vehicle’s brilliant new shine.",
      as: "h4",
      size: "sm",
      align: "center",
      divider: false,
      spacing: "sm",
    },
    {
      type: "accordion",
      spacing: "sm",
      defaultOpen: -1,
      items: [
        {
          title: "Ensure you do the most to protect your tint",
          html: '<p><strong>Following application of all <a href="/car-window-tint/">Car Tints</a>.</strong></p><p>1. When it does come to cleaning tinted windows, we recommend using our approved Window Tint Cleaner for cars, homes, and office films. (Please note, not all window cleaners are safe for car, home, and office tint – But ours is! *).</p><p>2. After having your car tinted by Tint a Car, we ask that you <strong>do not</strong> wind down windows for 48 hours.</p><p>3. Following car tinting, <strong>do not</strong> clean the glass for 21 days (the drying period).</p>',
        },
        {
          title: "Avoid damaging your Ceramic Coating with these simple steps",
          html: '<p><strong>Following all <a href="/protection-products/elitex-surface-protection/">Elite X Exterior Ceramic Surface Coating – (Paint Protection)</a></strong></p><p>1. Using paint and ceramic coating friendly vehicle cleaning products (available from our Elite X After Care Range*) helps to prevent scratches and swirls from appearing on the surface of your vehicle.</p><p>2. For the first 3 days after application avoid washing your ceramic coated car. Please follow care instructions provided with your warranty.</p><p>3. Post this curing period, please use our recommended Elite X Shampoo*, designed to provide longevity and a consistent shine to your <a href="/protection-products/elitex-surface-protection/">Elite X Ceramic Surface Coating.</a></p>',
        },
        {
          title: "Get the ultimate protection from your PPF",
          html: '<p><strong>Following all <a href="/protection-products/paint-protection-film/">PPF (Paint Protection Film</a>) Installation</strong></p><p>1. Allow a minimum of 7 days following the installation of the film (curing period) before washing or waxing your vehicle.</p><p>2. Following the initial curing period, wash your car using paint and ceramic coating friendly vehicle cleaning products (available from our Elite X After Care Range*). This helps to prevent, scratches and swirls from appearing on the surface of your vehicle.</p>',
        },
        {
          title: "Keep the inside of your car looking brand new",
          html: '<p><strong>Following application of all <a href="/protection-products/elitex-surface-protection/">Elite X Interior Protection</a>!</strong></p><p>1. Vinyl and leather should be cleaned regularly using a damp cloth and provided cleaner in our Car Care Range*. Should a spill occur, ensure a non-coloured cloth is used to absorb any liquid.</p><p>2. The curing period for your Car Interior Protection is 24 hours. Do not clean your car’s interior during this time.</p><p>3. Fabric and Carpets should be vacuumed regularly to maintain protection. If a spill occurs, absorb it with a non-coloured microfibre cloth and clean using our recommended cleaner (available from our <a href="/car-care/">Elite X Car Care Range*</a>).</p><p><a href="/car-care/"><strong>The Elite X Car Care Range:</strong></a></p><ul><li>Shampoo</li><li>Ceramic Rejuvenator</li><li>Interior Rejuvenator</li><li>Window Tint Cleaner</li><li>Tyre Magic</li><li>Noodle Wash Sponge</li><li>Twist Drying Towel</li><li>Microfibre Cloth</li><li>Wash Bucket</li></ul><p><strong><em><a href="/car-care/">Elite X Car Care range</a> – items sold separately</em></strong></p>',
        },
      ],
    },
    {
      type: "accordion",
      title: "More reasons to choose Tint a Car.",
      items: [
        {
          title: "Buy Now. Pay Later. Zero Interest.",
          html: '<p>Tint a Car now accepts <a href="/articles/afterpay/">Afterpay</a> and <a href="/articles/zip-pay/">Zip Pay</a>, which means you can split your purchase over various payment schedules with ZERO interest. Get the right look, protection and privacy for your ride sooner using one of our associated Buy Now, Pay Later partners!</p>',
        },
        {
          title: "30 Day Money Back Guarantee",
          html: "<p>We offer a 30-day money-back guarantee to all of our customers. Yep, you heard it.<br>If you’re not completely satisfied with your automotive tint from any Tint a Car store, we’ll remove the tint and give you your money back. Must claim within 30 days of sale.</p>",
        },
      ],
    },
    {
      type: "note",
      align: "left",
      spacing: "sm",
      text: "*If you would like more information on how to care for your Tint a Car product or would like to purchase from our Elite X After Care Range including our Window Tint Cleaner, contact your nearest store!",
    },
    {
      type: "note",
      align: "left",
      spacing: "sm",
      text: "^Please note the maintenance car care tips on this page do not guarantee a warranty, please refer to your provided warranty for more information, or contact your nearest store.",
    },
    { type: "note", align: "left", spacing: "sm", text: "**Limited Lifetime warranty conditions apply, please see in stores for details." },
  ],
};
