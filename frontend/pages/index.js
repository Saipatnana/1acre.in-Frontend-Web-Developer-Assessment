import Head from "next/head";
import PropertyGrid from "../components/PropertyGrid";
import MapComponent from "../components/MapComponent";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>1acre.in | Explore Prime Properties and Real Estate Listings</title>
        <meta
          name="description"
          content="Find your ideal property with 1acre.in! Explore a variety of land listings, view properties on a map, and make informed decisions with real-time availability."
        />
        <meta
          name="keywords"
          content="1acre.in, real estate, land for sale, property listings, acreage, buy land, map view properties"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="1acre.in | Explore Prime Properties and Real Estate Listings" />
        <meta
          property="og:description"
          content="Discover prime properties with 1acre.in. View detailed listings and locations on our interactive map to find your ideal land today."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://1acre.in" />
        <meta property="og:image" content="https://1acre.in/preview-image.jpg" />
        <link rel="canonical" href="https://1acre.in" />
      </Head>

      <div className="container px-4 py-24 md:px-20 lg:px-24 mx-auto">
        <h2 className="text-2xl font-bold mt-8 mb-4">Map View</h2>
        <MapComponent />
        <h1 className="text-2xl font-bold mb-4 mt-10">Properties</h1>
        <PropertyGrid />
      </div>
    </>
  );
};

export default HomePage;
