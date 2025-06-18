/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "decohr.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "decohr.s3.us-east-2.amazonaws.com",
      },
    ],
  },
};

export default config;
