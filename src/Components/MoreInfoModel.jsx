import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MoreInfoModal = ({ place, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-3xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        {/* Modal Content */}
        <div className="space-y-4">
          <h2 className="text-2xl text-bgPrimary font-bold">{place._key}</h2>
          <p className="text-sm text-bgPrimary ">{place.Desc}</p>
          <p className="text-xs text-gray-500">
            {place.district} • Lat: {place.latitude.toFixed(3)} • Lng:{" "}
            {place.longitude.toFixed(3)}
          </p>

          {/* Map Container */}
          <div className="relative h-64 w-full">
            <MapContainer
              center={[place.latitude, place.longitude]}
              zoom={13}
              style={{
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[place.latitude, place.longitude]}>
                <Popup>{place._key}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreInfoModal;

