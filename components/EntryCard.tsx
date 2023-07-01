import { Card, Flex, Text } from "@chakra-ui/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { LOTTERY_CONTRACT_ADDRESS } from "../const/addresses";

type Props = {
    walletAddress: string;
};

const EntryCard: React.FC<Props> = ({ walletAddress }) => {
    const {
        contract
    } = useContract(LOTTERY_CONTRACT_ADDRESS);

    const {
        data: numberOfEntries,
        isLoading: numberOfEntriesLoading
    } = useContractRead(contract, "entryCounts", [walletAddress]);

    function truncateAddress(address: string) {
        return address.slice(0, 6) + "..." + address.slice(-4);
    }

    return (
        <Card p={8} mb={4}>
            {!numberOfEntriesLoading && (
                <Flex flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Text border={"1px solid"} borderRadius={"6px"} p={2} mr={2}>{truncateAddress(walletAddress)}</Text>
                    <Text>Entries: {numberOfEntries.toNumber()}</Text>
                </Flex>
            )}
        </Card>
    )
};

export default EntryCard;