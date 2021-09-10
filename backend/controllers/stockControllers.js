import { Stock } from "../models/stockModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const purchaseStock = async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const purchasingStock = await Stock.findById(id);
    const costPrice = quantity * purchasingStock.price;
    if (req.user.balance < costPrice) {
      return next(new ErrorHandler("InSufficient Balance", 400));
    }

    if (purchasingStock.quantity < quantity) {
      return next(new ErrorHandler("Request quantity is too large", 400));
    }

    purchasingStock.quantity = purchasingStock.quantity - quantity;

    const existingStock = user.stocks.find(
      (stock) => stock.stock_id.toString() === purchasingStock._id.toString()
    );

    if (existingStock) {
      existingStock.quantity += quantity;
    } else {
      user.stocks.push({
        stock_id: purchasingStock._id,
        quantity: quantity,
      });
    }
    user.balance = user.balance - costPrice;

    await user.save();
    await purchasingStock.save();
    res.status(200).json({ message: "Purchase Successful", purchasingStock });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

export const sellStock = async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const sellingStock = await Stock.findById(id);
    const sellingPrice = quantity * sellingStock.price;

    const isStockExist = user.stocks.find(
      (stock) => stock.stock_id.toString() === sellingStock._id.toString()
    );

    if (
      !isStockExist ||
      isStockExist.quantity < quantity ||
      isStockExist.quantity <= 0
    ) {
      return next(
        new ErrorHandler(
          "You don't have this stock or either requested units in portfolio",
          400
        )
      );
    }

    //Update the propeties

    user.balance += sellingPrice;
    user.stocks.map((stock) =>
      stock.stock_id.toString() === sellingStock._id.toString()
        ? (stock.quantity -= quantity)
        : stock
    );

    await user.save();
    await sellingStock.save();
    res.status(200).json({ message: "Seeling Successful", sellingStock });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

// export const createStock = async (req, res, next) => {
//   console.log("sadfasf");
//   const stock = req.body;
//   const newStock = new Stock(stock);
//   try {
//     await newStock.save();
//     res.status(201).json(stock);
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 400));
//   }
// };
