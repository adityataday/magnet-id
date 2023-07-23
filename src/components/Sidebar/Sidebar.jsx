import { listItems } from "./data";
import {
  ListItem,
  SidebarContainer,
  SidebarContent,
  SidebarHeader,
} from "./Sidebar.styled";

export const Sidebar = ({ mapView, handleMapViewChnage }) => {
  return (
    <SidebarContainer>
      <SidebarHeader>Magnet.ID</SidebarHeader>
      <SidebarContent>
        <ul>
          {listItems.map((item) => (
            <ListItem
              key={item.key}
              isActive={item.key === mapView}
              onClick={() => {
                handleMapViewChnage(item.key);
              }}
            >
              {item.value}
            </ListItem>
          ))}
        </ul>
      </SidebarContent>
    </SidebarContainer>
  );
};
