import styles from "./../../styles/Home.module.scss";
export default function Header() {
	return (
		<header className={`${styles.header} flex justify-between item-center`}>
			<span className={styles.logo}>
				BAYC
				<span>NFT</span>
			</span>
			<div className="flex items-center">
				<div className={`${styles.hamburger}`}>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</header>
	);
}
