import React from "react";
import styles from "../../styles/Home.module.scss";
import Image from "next/image";

export default function NftItemLoader() {
	return (
		<div key="1" className={`card ${styles.item}`}>
			<div className={styles.item__image}>
				<div className={styles.item__image__clock}>15 min left</div>
			</div>
			<div className="w-full h-full flex flex-col">
				<div className="h-1/2 flex items-center py-4">
					<div>
						<h2 className={styles.nftName}>Walking on air</h2>
						<div className="flex items-center">
							<div className={styles.avatar} />
							<div>@nickname</div>
						</div>
					</div>
				</div>
				<hr />
				<div className="h-1/2 flex items-center py-4 pb-2">
					<div>
						<div className={styles["text-grey"]}>Current price</div>
						<div className="flex item-center mt-2">
							<div className="flex-shrink-0">
								<Image height="19" width="19" alt="" src="/images/eth.png" />
							</div>
							<div className={`${styles.amount} flex items-center`}>
								0.24 ETH
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
