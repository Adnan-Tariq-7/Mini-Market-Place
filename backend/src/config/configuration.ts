export default () => ({
  port: Number(process.env.PORT) ,
  database: {
    uri: process.env.MONGODB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET ,
    expiresIn: process.env.JWT_EXPIRATION,
  },
});
