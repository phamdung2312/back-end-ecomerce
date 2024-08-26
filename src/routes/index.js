const userRouter = require("./UserRouter");
const productRouter = require("./ProductRouter");
const paymentRouter = require("./PaymentRouter");
const order = require("./Order");

const routes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/order", order);
  app.use("/api/payment", paymentRouter);
};
module.exports = routes;
