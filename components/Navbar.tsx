import { Container, Flex, Text } from "@chakra-ui/react";
import { ConnectWallet, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import Link from "next/link";
import { LOTTERY_CONTRACT_ADDRESS } from "../const/addresses";

export default function Navbar() {
    const address = useAddress();

    const {
        contract
    } = useContract(LOTTERY_CONTRACT_ADDRESS);

    const {
        data: admin,
        isLoading: adminLoading
    } = useContractRead(contract, "admin");
    console.log(admin);


    return (
        <Container maxW={"1440px"} py={8}>
            <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Link href={"/"}>
                    <Text fontSize={"xl"} fontWeight={"bold"}>Raffle App</Text>
                </Link>
                <Flex flexDirection={"row"} alignItems={"center"}>
                    {!adminLoading && address === admin && (
                        <Link href={"/admin"}>
                            <Text fontWeight={"bold"} mr={10}>Admin</Text>
                        </Link>
                    )}
                    <ConnectWallet />
                </Flex>
            </Flex>
        </Container>
    )
}