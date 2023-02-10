const morgan = require("morgan");

morgan.token("host", (req) => req.headers.host);
morgan.token("worker", () => process.pid);

const incomingRequestLogger = morgan(
  "[:worker] :remote-addr (:user-agent) :host - :method :url HTTP/:http-version :status - :res[content-length] bytes - :response-time[0] ms"
);
module.exports = { incomingRequestLogger };
