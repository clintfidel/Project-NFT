/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction } from 'react'
import styles from "../../styles/Home.module.scss"
import Image from 'next/image';
import { NftType, TokenIdContext} from '..';
import moment from 'moment';
import Link from 'next/link';
import NftDetails from './NftDetails';
import { useContext } from 'react';

export default function NftItem({ nft }: { nft: NftType, }) {
	const [tokenId, setTokenId] = useContext(TokenIdContext) as [string, (arg: string) => void]
  return (
		<div key="1" className={`card ${styles.item}`} onClick={() => setTokenId(nft.tokenId)}>
			<div className={`${styles.item__image} relative`}>
				<div>
					<img src={nft.media[0].thumbnail} alt="" />
				</div>
				<div className={styles.item__image__clock}>
					{moment(nft.timeLastUpdated).format("DD MMM")}
				</div>
			</div>
			<div className="w-full h-full flex flex-col">
				<div className="h-1/2 flex items-center py-4">
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
				<div className="h-1/2 flex items-center py-4 pb-2">
					<div>
						<div className={styles["text-grey"]}>Floor price</div>
						<div className="flex item-center mt-2">
							<div className="flex-shrink-0">
								<Image height="19" width="19" alt="" src="/images/eth.png" />
							</div>
							<div className={`${styles.amount} flex items-center`}>
								{nft.contract.openSea.floorPrice} ETH
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
