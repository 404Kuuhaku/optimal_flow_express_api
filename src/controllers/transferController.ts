import { Request, Response, NextFunction } from "express";
import * as transferService from "../services/transferService";

/**
 * Handles balance transfer between users
 * POST /transfer
 */
const transferBalance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fromUserId, toUserId, amount } = req.body;

        // Validate input
        if (!fromUserId || !toUserId || !amount) {
            res.status(400).json({
                message: "Missing required fields: fromUserId, toUserId, amount"
            });
            return;
        }

        if (typeof amount !== "number" || amount <= 0) {
            res.status(400).json({
                message: "Amount must be a positive number"
            });
            return;
        }

        await transferService.transferBalance({ fromUserId, toUserId, amount });

        res.status(200).json({
            message: "Transfer successful",
            details: {
                fromUserId,
                toUserId,
                amount
            }
        });
    } catch (error) {
        next(error);
    }
};

export { transferBalance }; 