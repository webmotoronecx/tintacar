import { initBotId } from "botid/client/core";

// Vercel BotID on the Quick Quote endpoint; its script only loads when the form is sent
initBotId({ protect: [{ path: "/api/quick-quote/", method: "POST" }] });
