import { Box, Card, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import { ThirdwebNftMedia, useContract, useContractMetadata, useContractRead, useNFT } from "@thirdweb-dev/react";
import { LOTTERY_CONTRACT_ADDRESS } from "../const/addresses";

export default function PrizeNFT() {
    const {
        contract: lotteryContract
    } = useContract(LOTTERY_CONTRACT_ADDRESS);

    const {
        data: nftContractAddress
    } = useContractRead(lotteryContract, "nftContract");
    console.log(nftContractAddress);
    const {
        data: nftTokenId
    } = useContractRead(lotteryContract, "tokenId");
    console.log(nftTokenId);

    const {
        contract: nftContract
    } = useContract(nftContractAddress);
    const {
        data: nftContractMetadata,
        isLoading: nftContractMetadataLoading
    } = useContractMetadata(nftContract);

    const {
        data: nft,
        isLoading: nftLoading
    } = useNFT(nftContract, nftTokenId);
    console.log(nft);

    return (
        <Card p={"5%"}>
                <Heading>Prize NFT</Heading>
                {!nftContractMetadataLoading && !nftLoading ? (
                    <Stack spacing={"20px"} textAlign={"center"}>
                        <Box>
                            <ThirdwebNftMedia
                                metadata={nft?.metadata!}
                                height="100%"
                                width="100%"
                            />
                        </Box>
                        <Box>
                            <Text fontSize={"2xl"} fontWeight={"bold"}>{nftContractMetadata.name}</Text>
                            <Text fontWeight={"bold"}>{nft?.metadata.name}</Text>
                        </Box>
                    </Stack>
                ) : (
                    <Spinner />
                )}
        </Card>
    )
}