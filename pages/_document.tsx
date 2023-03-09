import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<script
						src="https://code.jquery.com/jquery-3.6.0.min.js"
						defer
					></script>
					<link
						rel="stylesheet"
						href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"
					/>
				</Head>
				<body>
					<Main />
					<div id="modal" />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
