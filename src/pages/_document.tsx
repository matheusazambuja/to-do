import Document, { DocumentProps, Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document<DocumentProps> {
    render() {
        return (
            <Html>
                <Head>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}