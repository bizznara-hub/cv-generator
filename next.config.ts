import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

if (process.env.NODE_ENV === "development") {
  import("@opennextjs/cloudflare").then(({ initOpenNextCloudflareForDev }) => {
    initOpenNextCloudflareForDev();
  });
}

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
