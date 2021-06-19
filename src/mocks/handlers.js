import { rest } from "msw";
const offerDayPizza = {
  pasta: "Tradicional",
  size: "Grande",
  flavor: "Quatro Queijos",
};

export const handlers = [
  rest.get("/offerday", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        pizza: offerDayPizza,
        offerInfos: {
          description:
            "Se você escolher esta oferta do dia, ganhará 100 pontos de benefício!",
        },
      })
    );
  }),

  rest.get("/pastas", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(["Fina", "Tradicional", "Finíssima"]));
  }),
  rest.get("/sizes", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(["Pequena", "Média", "Grande"]));
  }),
  rest.get("/flavors", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        "Calabresa",
        "Queijo",
        "Quatro Queijos",
        "Frango",
        "Frango com Catupiry",
      ])
    );
  }),
  rest.post("/order/create", (req, res, ctx) => {
    const { pizza } = req.body;

    if (
      pizza.pasta === offerDayPizza.pasta &&
      pizza.flavor === offerDayPizza.flavor &&
      pizza.size === offerDayPizza.size
    ) {
      return res(ctx.status(200), ctx.json({ availablePoints: true, pizza }));
    }
    return res(ctx.status(200), ctx.json({ availablePoints: false, pizza }));
  }),
];
