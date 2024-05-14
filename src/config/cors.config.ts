import { FRONT_HOSTNAME, FRONT_PORT } from "./constants";

export const corsOptions = {
    credentials: true,
    origin: `http://${FRONT_HOSTNAME}:${FRONT_PORT}`,
};
