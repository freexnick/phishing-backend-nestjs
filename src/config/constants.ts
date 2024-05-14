const { env } = process;

const FRONT_HOSTNAME = env.FRONT_HOSTNAME || "localhost";
const SERVER_PORT = +env.SERVER_PORT || 5000;
const FRONT_PORT = +env.FRONT_PORT || 3000;

export { SERVER_PORT, FRONT_PORT, FRONT_HOSTNAME };
