import { useState } from "react";
import InformationWindow from "../InformationWindow";
import Sidebar from "../Sidebar";
import {
  DashboardContainer,
  MapSection,
  SidebarSection,
} from "./Dashboard.styled";

export const Dashboard = () => {
  const [mapView, setMapView] = useState("defaultMap");
  const handleMapViewChnage = (value) => setMapView(value);

  const renderMap = (feature) => {
    switch (feature) {
      case "map":
        return <InformationWindow />;
      default:
        return <InformationWindow />;
    }
  };

  return (
    <DashboardContainer>
      <SidebarSection>
        <Sidebar mapView={mapView} handleMapViewChnage={handleMapViewChnage} />
      </SidebarSection>
      <MapSection>{renderMap(mapView)}</MapSection>
    </DashboardContainer>
  );
};
