/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack5: false,
    webpack: (config) => {
        config.resolve.fallback = { fs: false };
        return config;
    },
    env:{
        EMAISERVICEID:'service_t7in95j',
        EMAILTEMPLETEID:'template_do2efd3',
        EMAILPUBLICKEY:'BO2zMVOs_vdFpQCUc',
        API_URL: 'https://sebco-api-update.vercel.app/', //'http://localhost:3001/' /*  */,
        GOOGLEMAP_API_KEY:'AIzaSyCyQ0LQ6XqiaXPRK2Wi_zssbLk2gSaiQfY',
        TWILIO_ACCOUNT_SID:'AC9fe46b40f6f70469b4937717c496e8c2',
        TWILIO_AUTH_TOKEN:'4e31a6f06b73029bca1419573853ccd5',
        TWILIO_NUMBER:'+19034804156',

        FEDAPAY_PUBLIC_KEY: "pk_sandbox_iMo6GhIxyKT7SdFWKD-BgHYR",
    },
}

module.exports = nextConfig
