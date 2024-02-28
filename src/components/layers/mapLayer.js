import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
  GeoJSON,
  Marker,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Additional_left_edge from "../shapeFile/Additional_left_edge";
import camPos from "../shapeFile/camPos.json";
import roads from "../shapeFile/roads.json";
import markerImage from "../../icons/marker.png";

//add image files
const imageContext = require.context(
  "../shapeFile/images",
  false,
  /\.(png|jpe?g|svg)$/
);

function MapLayer() {
  const zoom = 18;

  const mapCenter = [
    roads.features[0].geometry.coordinates[0][0][1],
    roads.features[0].geometry.coordinates[0][0][0],
  ];

  //genrate marker icon
  const customMarkerIcon = new L.Icon({
    iconUrl: markerImage,
    iconSize: [8, 8],
    iconAnchor: [4, 8],
    popupAnchor: [0, -8],
  });

  //update images
  const [selectedCode, setSelectedCode] = useState(
    "allterra-20220621-111058-373__0000000000__01__40112672"
  );

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      style={{ height: "800px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* add road file*/}
      {roads.features.map((feature) => (
        <Polygon
          key={feature.properties.ID}
          positions={feature.geometry.coordinates[0].map((coord) => [
            coord[1],
            coord[0],
          ])}
          color="blue"
          fillColor="blue"
          fillOpacity={0.4}
        />
      ))}
      {/* add line file*/}
      {Additional_left_edge.features.map((feature, index) => (
        <GeoJSON
          key={index}
          data={feature}
          color="orange"
          fillColor="orange"
          fillOpacity={0.4}
        />
      ))}
      {/* add campos file*/}
      {camPos.features.map((feature, index) => (
        <Marker
          key={index}
          position={[
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0],
          ]}
          icon={customMarkerIcon}
        >
          <Popup
            onClose={() => setSelectedCode(null)}
            onOpen={() => setSelectedCode(feature.properties.code)}
          >
            {console.log(feature)}
            {/*TODO:// check why feature.properties.code is null */}
            {selectedCode && (
              <img
                // src={imageContext(`./${feature.properties.code}.jpg`)}
                src={imageContext(`./${selectedCode}.jpg`)}
                // alt={selectedCode}
                style={{ maxWidth: "100%" }}
              />
            )}
            {!selectedCode && <p>No image available</p>}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapLayer;
