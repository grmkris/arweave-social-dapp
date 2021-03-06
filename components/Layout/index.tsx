import { ReactNode } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

// Mui
import Container from "@mui/material/Container";

// Components
import NavBar from "./NavBar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavBar />
      <Container maxWidth="md" sx={{ paddingTop: 4, marginBottom: 8 }}>
        <PerfectScrollbar>{children}</PerfectScrollbar>
      </Container>
    </div>
  );
}
