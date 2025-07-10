import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { useMapEvents } from 'react-leaflet';
import { debounce } from 'lodash';

// Dynamically import Map components from react-leaflet to avoid SSR issues
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

const MapPicker = ({ setNewPosition }: any) => {
  const [isMounted, setIsMounted] = useState(false);
  const [position, setPosition] = useState({ lat: 27.7172, lng: 85.324 });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    // Ensure Leaflet is only initialized on the client
    setIsMounted(true);
  }, []);

  // Custom marker icon
  let customIcon: any;
  if (isMounted && typeof window !== 'undefined') {
    const L = require('leaflet');
    customIcon = new L.Icon({
      iconUrl:
        'https://res.cloudinary.com/dsqtxanz6/image/upload/v1729234050/pcro6gpwg51ttmn6uhls.png',
      iconSize: [40, 40],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
  }

  // Function to handle map clicks and set position
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        });
        setNewPosition({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        });
      },
    });

    return position ? (
      <Marker position={[position.lat, position.lng]} icon={customIcon}>
        <Popup>
          Lat: {position.lat}, Lng: {position.lng}
        </Popup>
      </Marker>
    ) : null;
  }

  // Function to get user's current location
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(location => {
        const { latitude, longitude } = location.coords;
        setPosition({ lat: latitude, lng: longitude });
        setNewPosition({ lat: latitude, lng: longitude });
      });
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  // Debounced search function
  const searchPlaces = debounce(async (query: string) => {
    if (query.length < 3) return; // Only search if query is 3 characters or more
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=5`
    );
    const data = await res.json();
    setSearchResults(data);
  }, 300);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    searchPlaces(e.target.value); // Call debounced search function
  };

  const handleSearchResultClick = (lat: number, lon: number) => {
    setPosition({ lat, lng: lon });
    setNewPosition({ lat, lng: lon });
    setSearchResults([]); // Clear search results after selection
  };

  if (!isMounted) {
    return null; // Return nothing while server-side rendering
  }

  return (
    <div>
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a place"
          value={searchQuery}
          onChange={handleInputChange}
          className="border px-4 py-2 w-full"
        />
      </div>

      {/* Display search results */}
      {searchResults.length > 0 && (
        <ul className="bg-white border p-2 max-h-60 overflow-auto">
          {searchResults.map(result => (
            <li
              key={result.place_id}
              className="cursor-pointer hover:bg-gray-100 p-2"
              onClick={() => handleSearchResultClick(result.lat, result.lon)}
            >
              {result.display_name}
            </li>
          ))}
        </ul>
      )}

      <MapContainer
        center={[position.lat, position.lng]}
        zoom={13}
        className="h-[400px] w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>

      <div className="mt-4">
        <button
          onClick={handleCurrentLocation}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Use My Current Location
        </button>
        <p>Latitude: {position.lat}</p>
        <p>Longitude: {position.lng}</p>
      </div>
    </div>
  );
};

export default MapPicker;
