import React, { useEffect, useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";

// Styles for the skeleton loading
const skeletonStyle = {
  width: "100%",
  height: "100%",
  backgroundColor: "#e0e0e0",
  borderRadius: "4px",
  marginBottom: "10px",
};

const containerStyle = {
  width: "100%",
  height: "400px",
};

function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCoDOQyMRswFRDR4wTm8cID877oRCuemYA",
  });

  const [map, setMap] = useState(null);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [center, setCenter] = useState({ lat: 20.5937, lng: 78.9629 });

  const fetchProperties = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await axios.get(
        "https://prod-be.1acre.in/lands/landmaps/?seller_id=211"
      );
      setProperties(response.data);
      // Calculate the center based on properties
      if (response.data.length > 0) {
        const latSum = response.data.reduce((sum, property) => sum + parseFloat(property.lat), 0);
        const lngSum = response.data.reduce((sum, property) => sum + parseFloat(property.long), 0);
        const avgLat = latSum / response.data.length;
        const avgLng = lngSum / response.data.length;

        setCenter({ lat: avgLat, lng: avgLng }); // Update center dynamically
      }
      setLoading(false); // Set loading to false after fetching
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      setLoading(false); // Ensure loading is set to false even on error
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    if (map && properties.length) {
      const bounds = new window.google.maps.LatLngBounds();
      properties.forEach((property) => {
        bounds.extend({
          lat: parseFloat(property.lat),
          lng: parseFloat(property.long),
        });
      });
      map.fitBounds(bounds);
    }
  }, [map, properties]);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const options = {
    zoomControl: false, // Hides the zoom controls
    streetViewControl: false, // Hides street view control
     mapTypeId:"satellite",
     fullscreenControl: false,
    // Add more options as needed
  };

  return (
    <>
      {loading ? (
        <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
          {/* Show skeleton loading boxes */}

          <div
            
            style={{
              ...skeletonStyle,
              height:"400px",
              width: "100%",
              margin: "5px",
            }}
          />
        </div>
      ) : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center} // Default center
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={options}
        >
          {properties.map((property) => (
            <Marker
              key={property.id}
              position={{
                lat: parseFloat(property.lat),
                lng: parseFloat(property.long),
              }}
              onClick={() => setSelectedProperty(property)}
            />
          ))}

          {selectedProperty && (
            <InfoWindow
              position={{
                lat: parseFloat(selectedProperty.lat),
                lng: parseFloat(selectedProperty.long),
              }}
              onCloseClick={() => setSelectedProperty(null)}
            >
              <div>
                <h4>Property Details</h4>
                <p>
                  <strong>Location:</strong>{" "}
                  {selectedProperty.division_slugs.village},{" "}
                  {selectedProperty.division_slugs.district}
                </p>
                <p>
                  <strong>Size:</strong>{" "}
                  {selectedProperty.total_land_size_in_acres.acres} acres
                </p>
                <p>
                  <strong>Price per Acre:</strong> ₹
                  {selectedProperty.price_per_acre_crore.lakh} lakh
                </p>
                <p>
                  <strong>Status:</strong> {selectedProperty.status}
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </>
  );
}

export default React.memo(MapComponent);
