import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

// Dynamic imports for Leaflet components to disable SSR
const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), {
  ssr: false,
});

// Load leaflet when in client
let L: any;
if (typeof window !== 'undefined') {
  L = require('leaflet');
}

// StoreLocation Component
const StoreLocation = ({ lat, long }: any) => {
  const [isMounted, setIsMounted] = useState(false);
  const [position, setPosition] = useState({ lat, lng: long });

  useEffect(() => {
    // Only run on client-side
    setIsMounted(true);
  }, []);

  // If not mounted, don't render Leaflet components
  if (!isMounted || typeof window === 'undefined') {
    return null;
  }

  const customIcon =
    L &&
    new L.Icon({
      iconUrl:
        'https://res.cloudinary.com/dsqtxanz6/image/upload/v1729234050/pcro6gpwg51ttmn6uhls.png',
      iconSize: [40, 40],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

  return (
    <div>
      <MapContainer
        center={[position.lat, position.lng]}
        zoom={13}
        className="h-[200px] w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {customIcon && (
          <Marker position={[position.lat, position.lng]} icon={customIcon}>
            <Popup>
              Lat: {position.lat}, Lng: {position.lng}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default StoreLocation;
