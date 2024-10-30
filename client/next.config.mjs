/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'inventory-managemet-s3.s3.ap-south-1.amazonaws.com',
                port:'',
                pathname:"/**",
            }
        ]
    }
};

export default nextConfig;
