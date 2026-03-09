"use client";

import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";

// Types
interface MapProperty {
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  lat: number;
  lng: number;
  image?: string;
  type?: string;
}

interface PropertyMapProps {
  properties: MapProperty[];
  center?: [number, number];
  zoom?: number;
  onPropertyClick?: (propertyId: string) => void;
  className?: string;
}

// Dynamically import the map to avoid SSR issues with Leaflet
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function PropertyMap({
  properties,
  center = [40.7608, -111.891],
  zoom = 11,
  onPropertyClick,
  className = "",
}: PropertyMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState<typeof import("leaflet") | null>(null);

  useEffect(() => {
    setIsClient(true);
    import("leaflet").then((leaflet) => {
      setL(leaflet.default || leaflet);
    });
  }, []);

  useEffect(() => {
    if (isClient) {
      // Import leaflet CSS
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
      link.crossOrigin = "";
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [isClient]);

  const customIcon = useMemo(() => {
    if (!L) return undefined;
    return L.divIcon({
      className: "custom-map-marker",
      html: `<div style="
        background: #2563eb;
        color: white;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">&#127968;</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  }, [L]);

  // Filter properties with valid coordinates
  const validProperties = useMemo(
    () => properties.filter((p) => p.lat && p.lng && !isNaN(p.lat) && !isNaN(p.lng)),
    [properties]
  );

  // Auto-fit bounds
  const bounds = useMemo(() => {
    if (!L || validProperties.length === 0) return undefined;
    const latLngs = validProperties.map((p) => L.latLng(p.lat, p.lng));
    return L.latLngBounds(latLngs).pad(0.1);
  }, [L, validProperties]);

  if (!isClient || !L) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`} style={{ minHeight: 400 }}>
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return (
    <div className={`rounded-lg overflow-hidden border border-gray-200 ${className}`}>
      <MapContainer
        center={bounds ? undefined : center}
        bounds={bounds}
        zoom={bounds ? undefined : zoom}
        style={{ height: "100%", minHeight: 400, width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {validProperties.map((property) => (
          <Marker
            key={property.id}
            position={[property.lat, property.lng]}
            icon={customIcon}
          >
            <Popup>
              <div style={{ minWidth: 200, padding: 4 }}>
                {property.image && (
                  <img
                    src={property.image}
                    alt={property.title}
                    style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 6, marginBottom: 8 }}
                  />
                )}
                <h3 style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 600 }}>
                  {property.title}
                </h3>
                <p style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "#2563eb" }}>
                  {formatPrice(property.price)}/mo
                </p>
                <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>
                  {property.bedrooms} bed &middot; {property.bathrooms} bath
                  {property.type && ` \u00B7 ${property.type}`}
                </p>
                {onPropertyClick && (
                  <button
                    onClick={() => onPropertyClick(property.id)}
                    style={{
                      marginTop: 8,
                      width: "100%",
                      padding: "6px 12px",
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    View Details
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
