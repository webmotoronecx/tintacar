import type { PageData } from "@/types/sections";

// Reached from each store's EMAIL button (?store_id=&id=); without a store it redirects to the store finder
export const quickQuotePage: PageData = {
  path: "/quick-quote/",
  excludeFromSitemap: true,
  seo: {
    title: "Get a Quick Quote - Tint a Car",
    description: "Know what you're looking for? Get in touch with us today and we'll get back to you as soon as we can!",
  },
  sections: [
    {
      type: "heading",
      title: "Make an Enquiry",
      as: "h1",
      size: "lg",
      subtitle: "We'll get in touch with you as soon as we can.",
      divider: true,
      html: "<p>If you’d like to get a quick quote from Tint a Car or would like additional information about any of our products or services, simply complete the form below and your enquiry will be sent to your local store. We will get in touch with you as soon as we can!</p>",
      spacing: "sm",
    },
    {
      type: "quickQuote",
      formTitle: "Your Request",
      storeTitle: "Selected Store",
      privacyHtml: 'For more information on our Privacy Collection Statement <a href="https://motoronegroup.com/privacy-collection/" target="_blank" rel="noopener noreferrer">click here</a>',
    },
    {
      type: "accordion",
      title: "Some ==key reasons== to choose Tint a Car.",
      highlightColor: "accent",
      align: "left",
      items: [
        {
          title: "Lifetime Warranty",
          html: "<p>Tint a Car have been supplying Australians with all their tinting needs for almost 50 years, but if that isn’t convincing enough we’re now making the commitment and offering a Lifetime Warranty on most of our films. This gives you complete peace of mind on your tint for your vehicle, home or office.</p>",
        },
        {
          title: "Interest Free",
          html: '<p>Tint a Car offers <a href="/articles/afterpay/">Afterpay</a> and <a href="/articles/zip-pay/">Zip</a> so you can tint now, and pay later. You can split your purchase over various payment schedules with ZERO interest. Get the right look, protection and privacy for your ride sooner!</p>',
        },
        {
          title: "30 Day Money Back Guarantee",
          html: "<p>*If you’re not completely satisfied with your automotive tint from any Tint a Car store, we’ll remove the tint and give you your money back. Must claim within 30 days of sale.</p>",
        },
      ],
    },
    { type: "note", text: "^Warranty terms, conditions and exclusions apply *Where available", align: "left" },
  ],
};
