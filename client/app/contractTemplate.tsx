import { ethers } from 'ethers';
import {contractABI} from "@/abi.json";

const contractAddress: string = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";

let contractProvider: ethers.Contract | null = null;
let contractSigner: ethers.Contract | null = null;

const initializeContract = async (userWallet: string) => {
    if (typeof window === "undefined") {
        console.error("Window is not available in SSR");
        return;
    }

    if (!window.ethereum) {
        console.error("Ethereum provider not found");
        return;
    }

    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        const signer = await provider.getSigner(userWallet);

        contractProvider = new ethers.Contract(contractAddress, contractABI, provider);
        contractSigner = new ethers.Contract(contractAddress, contractABI, signer);
    } catch (error) {
        console.error("Error initializing contract:", error);
    }
};

export { contractProvider, contractSigner, initializeContract };
