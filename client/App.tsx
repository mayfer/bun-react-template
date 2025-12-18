import logo from "./assets/logo.svg";
import { ApiCallDemo } from "./components/ApiCallDemo";
import { WebSocketDemo } from "./components/WebSocketDemo";
import { GlobalStyles, Logo, Page, Title } from "./components/ui";

export function App() {
  return (
    <Page>
      <GlobalStyles />
      <Title>
        <Logo src={logo} alt="Logo" /> Murat's Bun React Template
      </Title>

      <WebSocketDemo />
      <ApiCallDemo />
    </Page>
  );
}
