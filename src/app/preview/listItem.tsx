"use client";

import { OpenInNew } from "@mui/icons-material";
import {
  ListItem as MuiListItem,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { usePathname } from "next/navigation";

interface IProps {
  template: string;
}

const ListItem: React.FC<IProps> = ({ template }) => {
  const path = usePathname();

  if (template.endsWith(".tsx") && !template.startsWith("_")) {
    const templateName = template.replace(".tsx", "");

    return (
      <MuiListItem suppressHydrationWarning>
        <ListItemButton selected={path === `/preview/${templateName}`} href={`/preview/${templateName}`}>
          <ListItemText>{templateName}</ListItemText>
        </ListItemButton>
        <IconButton sx={{ marginLeft: "0.5rem" }} href={`/preview/${templateName}/html`} target="_blank">
          <OpenInNew />
        </IconButton>
      </MuiListItem>
    );
  }
  return <></>;
};

export default ListItem;
