export const isProduction = () => {
   return process.env.WORDPRESS_API_URL === "https://cosmonew1.wpenginepowered.com";
}