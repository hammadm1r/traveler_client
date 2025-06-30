import { useMemo } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
const markers = useMemo(() => (
  story.map((video) => (
    <Marker
      key={video._id}
      position={[video.location.latitude, video.location.longitude]}
      eventHandlers={{ click: () => openPopup(video) }}
      icon={L.divIcon({
        className: "custom-marker",
        html: `<div class="w-8 h-8 border-2 border-bgPrimary rounded-full overflow-hidden">
                 <img src="${video?.user.profilePicture?.url}" alt="User" class="w-full h-full object-contain" />
               </div>`,
        iconSize: [20, 20],
        iconAnchor: [20, 20],
      })}
    />
  ))
), [story]);
export default markers