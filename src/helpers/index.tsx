export const isProduction = () => {
   return process.env.ENVIRONMENT === "production";
}