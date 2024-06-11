import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import contract from "../../ChildNaming.json";

const PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY ?? "";
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY ?? "";
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS ?? "";

// provider - Alchemy
const alchemyProvider = new ethers.AlchemyProvider("sepolia", ALCHEMY_API_KEY);

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// contract instance
const childNaming = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req);
  if (req.method === "POST") {
    const { name } = req.body;

    try {
      console.log("Updating the name...");
      const tx = await childNaming.addName(name);
      await tx.wait();
      res
        .status(200)
        .json({ data: { message: "Name registered successfully", code: 1 } });
    } catch (error: any) {
      console.error("Error updating name:", error?.reason);
      res.status(500).json({ data: { message: error?.reason, code: 2 } });
    }
  } else {
    res.status(405).json({ data: { message: "Method not allowed", code: 2 } });
  }
}
