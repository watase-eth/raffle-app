import { Box, Flex, Text } from "@chakra-ui/react";
import { ThirdwebNftMedia, Web3Button, useContract, useContractMetadata, useContractRead, useNFT } from "@thirdweb-dev/react";
import { LOTTERY_CONTRACT_ADDRESS } from "../const/addresses";

type Props = {
    contractAddress: string;
    tokenId: string;
};

const RaffleNFTTransfer: React.FC<Props> = ({ contractAddress, tokenId }) => {
    const {
        contract: lotteryContract
    } = useContract(LOTTERY_CONTRACT_ADDRESS);

    const {
        data: lotteryStatus
    } = useContractRead(lotteryContract, "lotteryStatus");

    const {
        contract: prizeNftContract
    } = useContract(contractAddress, "nft-drop");
    const {
        data: prizeNftContractMetadata
    } = useContractMetadata(prizeNftContract);

    const {
        data: nft,
        isLoading: nftLoading
    } = useNFT(prizeNftContract, tokenId);

    return (
        <Box>
            <Flex my={10} flexDirection={"row"} alignItems={"center"}>
                {!nftLoading && (
                    <ThirdwebNftMedia
                        metadata={nft?.metadata!}
                    />
                )}
            <Box ml={4}>
                <Text fontSize={"xl"} fontWeight={"bold"}>{prizeNftContractMetadata?.name}</Text>
                <Text fontWeight={"bold"} fontSize={"xl"}>{nft?.metadata.name}</Text>
            </Box>
        </Flex>
        <Web3Button
            contractAddress={LOTTERY_CONTRACT_ADDRESS}
            action={async () => {
                await prizeNftContract?.setApprovalForToken(
                    LOTTERY_CONTRACT_ADDRESS,
                    tokenId
                );

                await lotteryContract?.call("pickWinner");
            }}
            isDisabled={lotteryStatus}
        >Select Winner</Web3Button>
        </Box>
    )
};

export default RaffleNFTTransfer;