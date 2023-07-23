import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { useState } from "react";
import { issueAttestation } from "../../utils/Attestation";

export const InformationWindow = () => {
  const [mapRef, setMapRef] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();
  const markers = [
    { lat: 18.5204, lng: 73.8567, address: "Address1" },
    { lat: 18.5065, lng: 73.7794, address: "Address2" },
    { lat: 18.559, lng: 73.7868, address: "Address3" },
    { lat: 18.5913, lng: 73.7389, address: "Address4" },
    { lat: 18.6298, lng: 73.7997, address: "Address5" },
  ];

  const onMapLoad = (map) => {
    setMapRef(map);
    const bounds = new window.google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  const handleMarkerClick = (id, lat, lng, address) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, address });
    setIsOpen(true);
  };

  return (
    <GoogleMap
      mapContainerClassName="map-container"
      onLoad={onMapLoad}
      onClick={() => setIsOpen(false)}
    >
      {markers.map(({ address, lat, lng }, ind) => (
        <Marker
          key={ind}
          position={{ lat, lng }}
          onClick={() => {
            handleMarkerClick(ind, lat, lng, address);
          }}
        >
          {isOpen && infoWindowData?.id === ind && (
            <InfoWindow
              onCloseClick={() => {
                setIsOpen(false);
              }}
            >
              <div>
                <h3>{infoWindowData.address}</h3>
                <button
                  onClick={() => {
                    issueAttestation(
                      infoWindowData.address,
                      new Date().toISOString(),
                      "ipfs://Qmci8DRrH3682TfRoeT2G7vD9q9TPkkytR1imSyD5T8huS"
                    ).then((newAttestationUID) =>
                      alert(`New attestation UID: ${newAttestationUID}`)
                    );
                  }}
                >
                  claim
                </button>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
};
