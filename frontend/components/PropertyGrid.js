import axios from "axios";
import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import ScaleLoader from "react-spinners/ScaleLoader";

// Fetch data function
export const getData = async (page) => {
  const response = await axios.get(
    `https://prod-be.1acre.in/lands/?format=json&page=${page}&page_size=12&seller=211`
  );
  return response.data.results; // Ensure you return the correct data structure
};

const PropertyGrid = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true); // Initial loading state

  // Fetch properties data
  const fetchProperties = async () => {
    setLoading(true);
    const data = await getData(page);
    setProperties((prev) => [...prev, ...data]);
    setLoading(false);
  };

  // Fetch properties on page change
  useEffect(() => {
    fetchProperties();
  }, [page]);

  // Handle scroll to load more properties
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 5 &&
      !loading
    ) {
      setPage((prev) => prev + 1);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  // Skeleton loader style
  const skeletonStyle = {
    width: "100%",
    height: "200px",
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
    marginBottom: "10px",
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading && properties.length === 0
          ? // Show skeleton loaders only if there are no properties yet
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} style={skeletonStyle} />
            ))
          : properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
      </div>
      {loading && properties.length > 0 && (
        <div className="flex w-full items-center my-4">
          <div className="flex flex-col items-center  w-full">
            <ScaleLoader color="#ffde59"/>
            <p>Loading more properties...</p>
          </div>
        </div>
      )}
      {!loading && properties.length === 0 && (
        <div className="block w-full text-center">No properties found</div>
      )}
      {!loading && properties.length > 0 && (
        <div className="block w-full text-center">
          Scroll down for more properties...
        </div>
      )}
    </>
  );
};

export default PropertyGrid;
