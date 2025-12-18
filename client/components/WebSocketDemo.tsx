import { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  PrimaryButton,
  CodeBlock,
  CodeText,
  ErrorText,
  DestructiveButton,
  Grid,
  InlineCode,
  MutedParagraph,
  OutputBlock,
  Row,
  Section,
  SectionTitle,
  SmallLabel,
  StatusText,
} from "./ui";

function getWsUrl(pathname: string) {
  const { protocol, host } = window.location;
  const wsProtocol = protocol === "https:" ? "wss:" : "ws:";
  return `${wsProtocol}//${host}${pathname}`;
}

function formatJson(value: unknown) {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

type WsStatus = "disconnected" | "connecting" | "connected" | "error";

export function WebSocketDemo() {
  const wsUrl = useMemo(() => getWsUrl("/ws"), []);
  const wsRef = useRef<WebSocket | null>(null);
  const [wsStatus, setWsStatus] = useState<WsStatus>("disconnected");
  const [wsError, setWsError] = useState<string | null>(null);
  const [wsLastMessage, setWsLastMessage] = useState<string>("");

  const disconnectWs = () => {
    wsRef.current?.close();
    wsRef.current = null;
  };

  const connectWs = () => {
    if (wsRef.current) return;

    setWsError(null);
    setWsStatus("connecting");
    setWsLastMessage("");

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => setWsStatus("connected");
    ws.onmessage = (event) => {
      const raw = typeof event.data === "string" ? event.data : String(event.data);
      try {
        const parsed = JSON.parse(raw);
        setWsLastMessage(formatJson(parsed));
      } catch {
        setWsLastMessage(raw);
      }
    };
    ws.onerror = () => {
      setWsStatus("error");
      setWsError("WebSocket error (check server logs).");
    };
    ws.onclose = () => {
      wsRef.current = null;
      setWsStatus("disconnected");
    };
  };

  const sendWsMessage = () => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify({ type: "hello", at: new Date().toISOString() }));
  };

  useEffect(() => () => disconnectWs(), []);

  return (
    <Section>
      <SectionTitle>WebSocket demo</SectionTitle>
      <Row>
        {wsStatus === "connected" ? (
          <DestructiveButton onClick={disconnectWs}>
            Disconnect from /ws
          </DestructiveButton>
        ) : (
          <PrimaryButton
            onClick={connectWs}
            disabled={wsStatus === "connecting"}
          >
            {wsStatus === "connecting" ? "Connecting..." : "Connect to /ws"}
          </PrimaryButton>
        )}
        <Button onClick={sendWsMessage} disabled={wsStatus !== "connected"}>
          Send message
        </Button>
        {wsError ? <ErrorText>{wsError}</ErrorText> : null}
      </Row>
      {wsLastMessage ? (
        <Grid>
          <div>
            <SmallLabel>Last message</SmallLabel>
            <OutputBlock>
              <CodeText>{wsLastMessage}</CodeText>
            </OutputBlock>
          </div>
        </Grid>
      ) : null}
    </Section >
  );
}
