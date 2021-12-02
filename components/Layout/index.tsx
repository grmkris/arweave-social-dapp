import { ReactNode } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

// Mui
import Container from "@mui/material/Container";

// Components
import { NavBar } from "..";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavBar />
      <Container maxWidth="md">
        <PerfectScrollbar>{children}</PerfectScrollbar>
      </Container>
    </div>
  );
}
