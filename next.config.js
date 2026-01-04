try {
  process.env.NEXT_SHARP_PATH = require.resolve("sharp");
} catch (error) {
  // sharp bersifat opsional; biarkan fallback jika tidak tersedia.
}

const nextConfig = {
  optimizeFonts: false,
  env: {
    // un comment when you run in deploy
    // API_URL: "https://cuba-nextjs.vercel.app/api",
    //  comment when you run in local below down
    API_URL: "https://cuba-next-five.vercel.app/api",
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/authentication/login",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/pages/authentication/login-simple",
        destination: "/login",
        permanent: false,
      },
      {
        source: "/pages/authentication/register-simple",
        destination: "/register",
        permanent: false,
      },
      {
        source: "/pages/authentication/sign-up-two",
        destination: "/register",
        permanent: false,
      },
      {
        source: "/pages/authentication/forget-pwd",
        destination: "/forgot-password",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
