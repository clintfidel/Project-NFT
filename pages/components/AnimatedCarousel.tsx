import React, { useRef } from "react";
import { useEffect } from "react";
import "react-owl-carousel2/lib/styles.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel";
import styles from "../../styles/Home.module.scss";
import NftItem from "./NftItem";

const options = {
	items: 4,
	nav: true,
	rewind: true,
	autoplay: true,
};

export default function AnimatedCarousel() {
	const carousel = useRef<HTMLElement>();
	useEffect(() => {
		($('.owl-carousel') as any).owlCarousel({
			items: 4,
			loop: true,
			margin: 10,
			responsive: {
				0: {
					items: 1,
				},
				600: {
					items: 3,
				},
				1000: {
					items: 4,
				},
			},
		});
	}, []);
	return (
		<section className={`${styles.animatedCarousel} mt-2`}>
			<h3 className={`${styles.heading}`}>Live auctions</h3>
			<div className="owl-carousel owl-theme">
				{/* <NftItem /> */}
			</div>
		</section>
	);
}
