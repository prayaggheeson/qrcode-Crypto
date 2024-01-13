let Users = [
  {
    userName: "Admin",
    referralCode: "1234DA",
    referralCount: 0,
    referralIncome: 0,
  },
];

export async function POST(request) {
  try {
    const body = await request.json();
    const { walletAddress, referralCode } = body;

    if (!walletAddress || !referralCode) {
      return new Response("Missing parameters", { status: 400 });
    }

    // Check if the referral code exists
    const referrer = Users.find((u) => u.referralCode === referralCode);
    if (!referrer) {
      return new Response("Invalid referral code", { status: 400 });
    }

    // Check if the wallet address already exists
    const walletAddressExists = Users.find(
      (u) => u.walletAddress === walletAddress
    );
    if (walletAddressExists) {
      return new Response("Wallet address already exists", { status: 400 });
    }

    // Calculate referral income based on the referral level
    const referralLevel = referrer.referralCount + 1;
    let referralIncomePercentage = 0;

    if (referralLevel === 1) {
      referralIncomePercentage = 10; // Level 1: Admin gets 10%
    } else if (referralLevel === 2) {
      referralIncomePercentage = 5; // Level 2: Referrer gets 10%, Admin gets 5%
    } else if (referralLevel === 3) {
      referralIncomePercentage = 2; // Level 3: Referrer gets 10%, Previous Referrer gets 5%, Admin gets 2%
    } else if (referralLevel === 4) {
      referralIncomePercentage = 1; // Level 4: Referrer gets 10%, Previous Referrer gets 5%, Previous Previous Referrer gets 2%, Admin gets 1%
    } else {
      referralIncomePercentage = 0; // No more levels
    }

    // Calculate referral income
    const referralIncome = (referralIncomePercentage / 100) * 100; // Assuming 100 as income for simplicity

    // Update referral count and income for the referrer
    referrer.referralCount = referralLevel;
    referrer.referralIncome += referralIncome;

    // Generate a new referral code for the new user
    const generatedReferralCode = Math.random().toString(36).substring(2, 8);

    // Create a new user object
    const newUser = {
      walletAddress,
      referralCode: generatedReferralCode,
      referralCount: 0, // New user starts at level 0
      referralIncome: 0, // New user starts with 0 income
    };

    // Add the new user to the Users array
    Users.push(newUser);

    return new Response(
      JSON.stringify({ newUser, message: "User Created Successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
}
