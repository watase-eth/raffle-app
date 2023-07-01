import { Box, Card, Container, Divider, Flex, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import { Web3Button, useContract, useContractRead } from "@thirdweb-dev/react";
import { LOTTERY_CONTRACT_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";
import AdminLotteryStatusCard from "../components/LotteryStatus";
import AdminTicketPriceCard from "../components/TicketPrice";
import AdminRaffleWinnerCard from "../components/RaffleWinner";

export default function Admin() {
    const {
        contract
    } = useContract(LOTTERY_CONTRACT_ADDRESS);

    const {
        data: ticketCost,
        isLoading: ticketCostLoading
    } = useContractRead(contract, "ticketCost");

    const {
        data: contractBalance,
        isLoading: contractBalanceLoading
    } = useContractRead(contract, "getBalance");

    return (
        <Container maxW={"1440px"} py={8}>
            <Heading>Admin Dashboard</Heading>
            <Flex flexDirection={"row"}>
                <AdminLotteryStatusCard />
                <Card p={4} mt={4} mr={10} w={"25%"}>
                    <Stack spacing={4}>
                        <AdminTicketPriceCard />
                        <Divider />
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
                    </Stack>    
                </Card>
                <AdminRaffleWinnerCard />
            </Flex>
        </Container>
    )
}