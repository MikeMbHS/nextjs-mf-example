import Document, {
    Html,
    Head,
    Main,
    NextScript
} from 'next/document';

import Script from 'next/script'

class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps
        };
    }

    render() {
        return (
            <Html>
                <Head>                    
                </Head>
                <body>
                    <Main />
                    {/* <script data-webpack="microfrontendreact" src="http://localhost:3005/remoteEntry.js" /> */}
                    <script data-webpack="microfrontendnextjs" src="http://localhost:3006/_next/static/chunks/remoteEntry.js" />
                    <NextScript />
                </body>
            </Html>
        );
    }

}

export default MyDocument;
