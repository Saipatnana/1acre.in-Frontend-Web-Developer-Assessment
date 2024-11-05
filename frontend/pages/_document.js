import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <head>
        <title>1acre.in</title>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCoDOQyMRswFRDR4wTm8cID877oRCuemYA"></script>
      </head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
