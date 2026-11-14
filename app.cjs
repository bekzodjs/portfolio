// Plesk / Passenger startup file for the prebuilt (standalone) Next.js app.
process.env.NODE_ENV = "production";
process.env.HOSTNAME = "0.0.0.0";
require("./standalone-server.js");
