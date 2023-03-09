/* eslint-disable @next/next/no-img-element */
import { NftType, TokenIdContext } from "..";
import ReactDOM from "react-dom";
import styles from "../../styles/Home.module.scss"
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NftDetails({ nft }: { nft: NftType }) {
    const element = useRef<HTMLElement | null>(null);
    const [tokenId, setTokenId] = useContext(TokenIdContext) as [
			string,
			(arg: string) => void,
		];
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        element.current = document.querySelector("#modal");
    }, []);

    const handleClick = () => {
        setTokenId("");
    }

    if (!hasMounted) return <></>;

	return ReactDOM.createPortal(
		<>
			<div
				className={`${styles.productDetails} fixed h-full w-full top-0 left-0 `}
			>
				<div className={styles.dialog}>
					<div className="h-full overflow-hidden">
						<div className={styles.imgBackground}>
							<div className={`${styles.image} relative`}>
								<div className={`w-full h-full absolute top-0 left-0`}>
									<img src={nft.media[0].thumbnail} alt="" />
								</div>
							</div>
						</div>

						<div className="flex py-4 px-3">
							<div>
								<h2 className={styles.nftName}>#{nft.tokenId}</h2>
								<div className="flex items-center">
									<div className={styles.avatar}>
										<img alt="" src={nft.contract.openSea.imageUrl} />
									</div>
									<Link href={nft.contract.openSea.externalUrl}>
										<div>@{nft.contract.symbol}</div>
									</Link>
								</div>
							</div>
						</div>
						<hr />
						<div className="flex items-center py-4 px-3">
							<div>
								<div className={styles["text-grey"]}>Floor price</div>
								<div className="flex item-center mt-2">
									<div className="flex-shrink-0">
										<Image
											height="19"
											width="19"
											alt=""
											src="/images/eth.png"
										/>
									</div>
									<div className={`${styles.amount} flex items-center`}>
										{nft.contract.openSea.floorPrice} ETH
									</div>
								</div>
							</div>
						</div>
						<hr />
						<div className={styles.attributes}>
							{nft.rawMetadata.attributes.map((item) => (
								<div key={item.value}>
									<div className={styles.top}>{item.trait_type}</div>
									<div>{item.value}</div>
								</div>
							))}
						</div>
					</div>
					<hr />
					<div className="p-3 flex justify-end">
                        <button className={styles.close} onClick={handleClick}>
							close
						</button>
						<Link target={"_blank"} href={`https://opensea.io/assets/ethereum/${nft.contract.address}/${nft.tokenId}`}>
							<button className={styles.proceed}>Proceed to opensea</button>
						</Link>
					</div>
				</div>
			</div>
		</>,
		element.current as HTMLElement, // the container element outside of this component
	);
}
