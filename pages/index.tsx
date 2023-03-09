import Header from "./components/Header";
import { Network, Alchemy } from "alchemy-sdk";
import {
	createContext,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NftItem from "./components/NftItem";
import { v4 as uuid } from "uuid";
import { TailSpin } from "react-loader-spinner";
import NftDetails from "./components/NftDetails";

export const TokenIdContext: any = createContext(["", () => { }]);

export interface NftType {
	media: { thumbnail: string }[];
	tokenId: string;
	contract: {
		address: string
		symbol: string;
		openSea: {
			imageUrl: string;
			floorPrice: number;
			safelistRequestStatus: string;
			externalUrl: string;
		};
	};
	timeLastUpdated: string;
	rawMetadata: {
		attributes: {
			value: string
			trait_type: string
		}[]
	}
}

export default function Home() {
	const [nfts, setNfts] = useState<NftType[]>([]);
	const [pageKey, setPageKey] = useState("");
	const [loading, setLoading] = useState<boolean>(false);
	const selectedToken = useState<string>("");
	const [tokenId,] = selectedToken;

	function shuffleArray(array: NftType[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	const getNfts = async () => {
		setLoading(true);
		const apiKey = process.env.NEXT_PUBLIC_API_KEY;
		const settings = {
			apiKey,
			network: Network.ETH_MAINNET,
		};
		const alchemy = new Alchemy(settings);
		const collectionContract = process.env.NEXT_PUBLIC_CONTRACT_KEY;
		const config = {
			pageKey,
			pageSize: 100,
			withMetadata: true,
			omitMetadata: false,
		};
		alchemy.nft
			.getNftsForContract(collectionContract, config)
			.then((result) => {
				setNfts([...nfts, ...shuffleArray([...(result as any).nfts])]);
				setPageKey((result as any).pageKey);
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		getNfts();
	}, []);

	return (
		<>
			<Header />
			<section className="pt-8">
				{nfts.length ? (
					<h2 className="heading text-2xl font-bolder ml-6">All Tokens</h2>
				) : (
					""
				)}
				<TokenIdContext.Provider
					value={selectedToken as [string, Dispatch<SetStateAction<string>>]}
				>
					<InfiniteScroll
						dataLength={nfts.length}
						next={getNfts}
						hasMore={Boolean(pageKey)}
						loader={
							<div className="w-full flex justify-center">
								<TailSpin
									height="60"
									width="60"
									color="white"
									ariaLabel="tail-spin-loading"
									radius="2"
									wrapperStyle={{}}
									wrapperClass=""
									visible={true}
								/>
							</div>
						}
						endMessage={
							!loading ? (
								<p className="p-8" style={{ textAlign: "center" }}>
									<b>Yay! You have seen it all</b>
								</p>
							) : (
								""
							)
						}
					>
						<div className="basegrid">
							{nfts.map((nft) => (
								<NftItem key={uuid()} nft={nft} />
							))}
						</div>
					</InfiniteScroll>
					{tokenId ? <NftDetails nft={nfts.find(nft => nft.tokenId === tokenId)!} /> : ""}
				</TokenIdContext.Provider>
			</section>
		</>
	);
}
