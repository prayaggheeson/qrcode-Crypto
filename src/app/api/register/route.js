// Import required modules
import { connectDB } from "@/app/DB/database";
import UserModel from "@/app/models/users";

// Connect to the database
connectDB();

export async function POST(request) {
  try {
    const body = await request.json();
    const { walletAddress, referralCode } = body;

    if (!walletAddress || !referralCode) {
      return new Response(JSON.stringify({ message: "Missing parameters" }), {
        status: 400,
      });
    }

    // Find the referrer in the database
    const referrer = await UserModel.findOne({ referralCode });

    if (!referrer) {
      return new Response(
        JSON.stringify({ message: "Invalid referral code" }),
        { status: 400 }
      );
    }

    // Check if the wallet address already exists
    const walletAddressExists = await UserModel.findOne({ walletAddress });

    if (walletAddressExists) {
      return new Response(
        JSON.stringify({ message: "Wallet address already exists" }),
        { status: 400 }
      );
    }

    // Calculate referral income based on the referral level
    const referralLevel = referrer.referralCount + 1;
    let referralIncomePercentage = 0;

    if (referralLevel === 1) {
      referralIncomePercentage = 10;
    } else if (referralLevel === 2) {
      referralIncomePercentage = 5;
    } else if (referralLevel === 3) {
      referralIncomePercentage = 2;
    } else if (referralLevel === 4) {
      referralIncomePercentage = 1;
    } else {
      referralIncomePercentage = 0;
    }

    // Calculate referral income
    const referralIncome = (referralIncomePercentage / 100) * 100;

    // Update referral count and income for the referrer in the database
    await UserModel.updateOne(
      { referralCode },
      {
        $set: {
          referralCount: referralLevel,
          referralIncome: referrer.referralIncome + referralIncome,
        },
      }
    );

    // Generate a new referral code for the new user
    const generatedReferralCode = Math.random().toString(36).substring(2, 8);

    // Create a new user object
    const newUser = new UserModel({
      walletAddress,
      referralCode: generatedReferralCode,
    });

    // Save the new user to the database
    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User Created Successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function GET(request) {
  try {
    const walletAddress = request.headers.get("walletAddress");

    // Find the user in the database
    const user = await UserModel.findOne({ walletAddress });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
