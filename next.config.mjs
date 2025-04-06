/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/socket.io/:path*",
                destination: "http://localhost:5000/socket.io/:path*", // Backend URL
            },
        ];
    },
};

export default nextConfig;
