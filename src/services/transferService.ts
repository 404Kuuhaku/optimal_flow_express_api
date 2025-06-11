import UserModel from "../models/userModel";

interface TransferDetails {
    fromUserId: string;
    toUserId: string;
    amount: number;
}

/**
 * Transfers balance between users
 * @param {TransferDetails} transferDetails - The transfer details
 * @throws {Error} If transfer fails (insufficient balance, invalid users, etc.)
 */
const transferBalance = async (transferDetails: TransferDetails): Promise<void> => {
    const { fromUserId, toUserId, amount } = transferDetails;

    if (amount <= 0) {
        throw new Error("Transfer amount must be greater than 0");
    }

    if (fromUserId === toUserId) {
        throw new Error("Cannot transfer to the same user");
    }

    // Find both users
    const [fromUser, toUser] = await Promise.all([
        UserModel.findById(fromUserId),
        UserModel.findById(toUserId)
    ]);

    if (!fromUser || !toUser) {
        throw new Error("One or both users not found");
    }

    if (fromUser.balance < amount) {
        throw new Error("Insufficient balance");
    }

    // Update balances
    fromUser.balance -= amount;
    toUser.balance += amount;

    // Save both users
    await Promise.all([
        fromUser.save(),
        toUser.save()
    ]);
};

export { transferBalance, TransferDetails }; 