import type { PageData } from "@/types/sections";

const FIND_A_STORE = { label: "Find a store", href: "/contact-a-store/", variant: "solid" } as const;

export const finevuDashcamsPage: PageData = {
  path: "/finevu-dashcams/",
  seo: {
    title: "FineVu Dash Cameras - Tint a Car",
    description: "Get the best out of your drive, with quality 4K recording from the FineVu Dashcam range. Call 13TINT or speak to your local store today!",
  },
  sections: [
    {
      type: "heading",
      title: "For the clearest view of the road, choose a FineVu Dash Cam.",
      as: "h1",
      size: "md",
      align: "center",
      divider: false,
      spacing: "sm",
      html: "<p>The best possible clarity and ultra-sharp footage, powered by industry-leading SONY™ STARVIS™ front &amp; rear image sensors that capture every crucial detail, day and night.</p>",
    },
    {
      type: "tileGrid",
      columns: 2,
      gap: "md",
      items: [
        { image: { src: "/images/finevu/gx4k-landing-tile.png", alt: "FineVu GX4K HD dash camera", width: 1080, height: 1350 }, href: "/finevu-dashcams/#4K", title: "FineVu GX4K HD dash camera" },
        { image: { src: "/images/finevu/gx35-landing-tile.png", alt: "FineVu GX35 2K dash camera", width: 1080, height: 1350 }, href: "/finevu-dashcams/#2K", title: "FineVu GX35 2K dash camera" },
      ],
    },
    {
      type: "productShowcase",
      id: "4K",
      background: "panel",
      logo: { src: "/images/finevu/gx4k-title.png", alt: "GX4K", width: 300, height: 103 },
      title: "FineVu GX4K Dash Camera",
      text: "Choose 4K for the best possible clarity, with ultra‑sharp footage that captures every crucial detail.",
      youtubeId: "ZCUeKQil_kE",
      videoTitle: "FineVu GX4K Dash Camera",
      banner: { src: "/images/finevu/gx4k-product-detail-banner.png", alt: "", width: 1920, height: 750 },
      tiles: [
        {
          image: { src: "/images/finevu/gx4k-detail-1.png", alt: "", width: 1080, height: 627 },
          title: "Every pixel captured.",
          subtitle: "4K quality recording with real-time alerts.",
          text: "Powered by FineVu, the GX4K Dash Camera has the ultimate recording quality, featuring an 8.46MP SONY™ Starvis Sensor with industry leading 4K for increased clarity.",
        },
        {
          image: { src: "/images/finevu/gx4k-detail-2.png", alt: "", width: 1080, height: 627 },
          title: "Never miss a thing.",
          subtitle: "Ultra HD front and rear cameras.",
          text: "The Sony STARVIS sensor delivers outstanding clarity in low light, so your footage stays sharp day and night. High resolution 4K recording means clearer evidence when it matters most.",
        },
      ],
    },
    {
      type: "productShowcase",
      id: "2K",
      logo: { src: "/images/finevu/gx35-title.png", alt: "GX35", width: 300, height: 103 },
      title: "FineVu GX35 Dash Camera",
      text: "Perfectly compact camera with QHD 2K clarity from a SONY STARVIS 2 sensor.",
      youtubeId: "yvPwQKeBpiI",
      videoTitle: "FineVu GX35 Dash Camera",
      banner: { src: "/images/finevu/gx35-product-detail-banner.png", alt: "", width: 1920, height: 750 },
      tiles: [
        {
          image: { src: "/images/finevu/gx35-detail-1.png", alt: "", width: 1080, height: 627 },
          title: "Motion detection.",
          subtitle: "Capture every moment.",
          text: "Footage is captured with any movement around your car while parked, all day and night.",
        },
        {
          image: { src: "/images/finevu/gx35-detail-2.png", alt: "", width: 1080, height: 627 },
          title: "Power saving mode.",
          subtitle: "Consumes 98% less power.*",
          text: "Consumes significantly less power than industry standard by impact monitoring only.",
        },
      ],
    },
    {
      type: "compareCards",
      image: { src: "/images/finevu/comparison-banner.png", alt: "", width: 1920, height: 1523 },
      title: "Compare the difference.\nChoose the dash camera that suits you.",
      subtitle: "Both models offer reliable parked recording, delivering enhanced clarity and detail.",
      cards: [
        {
          logo: { src: "/images/finevu/gx4k-title.png", alt: "GX4K", width: 300, height: 103 },
          lines: ["4K Model", "Ultra-HD 4K", "3840 × 2160px", "Longer, more reliable recording", "Maximum clarity & detail"],
          button: FIND_A_STORE,
        },
        {
          logo: { src: "/images/finevu/gx35-title.png", alt: "GX35", width: 300, height: 103 },
          lines: ["2K Model", "Quad-HD 2K", "2560 × 1440px", "Reliable recording", "High-quality everyday recording"],
          button: FIND_A_STORE,
        },
      ],
    },
    { type: "ctaStrip", text: "Ready to find out more?", buttons: [{ label: "Enquire now", href: "/contact-a-store/" }] },
    {
      type: "note",
      text: "*Parking mode dependant on vehicle battery health and safety cut off thresholds. Parking mode will not operate at all times.",
    },
  ],
};
