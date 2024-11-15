/** @type {import('next').NextConfig} */
const nextConfig = {
    onDemandEntries: {
        // Period (in ms) to invalidate cached entries.
        maxInactiveAge: 0,
    },
};

export default nextConfig;
