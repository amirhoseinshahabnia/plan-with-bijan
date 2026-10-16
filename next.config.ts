import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // add ngrok origin for tunneling dev work
  allowedDevOrigins: ["*.ngrok-free.app"],
};

export default nextConfig;
