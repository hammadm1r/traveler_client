import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

const Story = () => {
  return (
    <>
      <div className="bg-slate-400 w-full h-32">
        <p>Story Section</p>
      </div>
      <div className="flex">
        <div className="w-96 bg-gray-200 p-2">
          <p>Video Will Be Shown Here</p>
        </div>
        <div className="flex-grow h-[80vh]">
          <MapContainer 
            center={[51.505, -0.09]} 
            zoom={13} 
            scrollWheelZoom={false} 
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default Story;

