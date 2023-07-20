import { Box, Spinner, Text } from "@chakra-ui/react";
import { Web3Button, useContract, useContractRead } from "@thirdweb-dev/react";
import { LOTTERY_CONTRACT_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";

export default function withdrawBalance() {
    const {
        contract
    } = useContract(LOTTERY_CONTRACT_ADDRESS);

    const {
        data: contractBalance,
        isLoading: contractBalanceLoading
    } = useContractRead(contract, "getBalance");
    
    return (
        <Box>
            <Box>
                <Text fontWeight={"bold"} mb={4} fontSize={"xl"}>Contract Balance</Text>
                {!contractBalanceLoading ? (
                    <Text fontSize={"xl"}>{ethers.utils.formatEther(contractBalance)} MATIC</Text>
                ) : (
                    <Spinner />
                )}
            </Box>
            <Web3Button
                contractAddress={LOTTERY_CONTRACT_ADDRESS}
                action={(contract) => contract.call(
                    "withdrawBalance"
                )}
            >Withdraw Balance</Web3Button>
        </Box>
        
    )
}