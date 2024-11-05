import axios from "axios";
import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import ScaleLoader from "react-spinners/ScaleLoader";

// Fetch data function
export const getData = async (page) => {
  try {
    const response = await axios.get(
      `https://prod-be.1acre.in/lands/?format=json&page=${page}&page_size=12&seller=211`
    );
    return response.data.results; // Ensure you return the correct data structure
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 404) {
          console.error("Error 404: Not Found", error.response.data);
          return { error: "Requested data not found. Please check the URL." }; // Return error message
        } else {
          console.error("Error:", error.response.status, error.response.data);
          return { error: "An error occurred while fetching data. Please try again later." }; // Return error message
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        return { error: "No response from server. Please check your connection." }; // Return error message
      } else {
        console.error("Error in setup:", error.message);
        return { error: "An error occurred while setting up the request." }; // Return error message
      }
    } else {
      console.error("Unexpected error:", error);
      return { error: "An unexpected error occurred." }; // Return error message
    }
  }
};

const PropertyGrid = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true); // Initial loading state
  const [hasMore, setHasMore] = useState(true); // Track if there are more properties to load
  const [error, setError] = useState(null); // State to hold any error messages

  // Fetch properties data
  const fetchProperties = async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    const data = await getData(page);

    if (data.error) {
      setError(data.error); // Set the error message to state
    } else {
      setProperties((prev) => [...prev, ...data]); // Append new properties to the existing list
      if (data.length < 12) {
        setHasMore(false); // No more properties to load
      }
    }
    setLoading(false); // Reset loading state
  };

  // Fetch properties on page change
  useEffect(() => {
    fetchProperties(); // Initial fetch on component mount
  }, [page]); // Fetch when the page changes

  // Handle scroll to load more properties
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 5 &&
      !loading && hasMore
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
          <div className="flex flex-col items-center w-full">
            <ScaleLoader color="#ffde59" />
            <p>Loading more properties...</p>
          </div>
        </div>
      )}
      {error && <div className="block w-full text-center text-red-500">{error}</div>} {/* Display error message if exists */}
      {!loading && properties.length === 0 && (
        <div className="block w-full text-center">No properties found</div>
      )}
      {!loading && properties.length > 0 && hasMore && (
        <div className="block w-full text-center my-4">
          Scroll down for more properties...
        </div>
      )}
    </>
  );
};

export default PropertyGrid;