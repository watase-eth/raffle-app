import { Box, Card, Container, Divider, Flex, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import { Web3Button, useContract, useContractRead } from "@thirdweb-dev/react";
import { LOTTERY_CONTRACT_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";
import AdminLotteryStatusCard from "../components/LotteryStatus";
import AdminTicketPriceCard from "../components/TicketPrice";
import AdminRaffleWinnerCard from "../components/RaffleWinner";
import WithdrawBalance from "../components/WithdrawBalance";

export default function Admin() {
    return (
        <Container maxW={"1440px"} py={8}>
            <Heading>Admin Dashboard</Heading>
            <Flex flexDirection={"row"}>
                <AdminLotteryStatusCard />
                <Card p={4} mt={4} mr={10} w={"25%"}>
                    <Stack spacing={4}>
                        <AdminTicketPriceCard />
                        <Divider />
                        <WithdrawBalance />  
                    </Stack>    
                </Card>
                <AdminRaffleWinnerCard />
            </Flex>
        </Container>
    )
}
