import { useState } from "react";
import {
  Button,
  PrimaryButton,
  CodeText,
  ErrorText,
  Grid,
  InlineCode,
  MutedParagraph,
  OutputBlock,
  Row,
  Section,
  SectionTitle,
  SmallLabel,
} from "./ui";

function formatJson(value: unknown) {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export function ApiCallDemo() {
  const apiUrl = "/api/health";
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiLastResponse, setApiLastResponse] = useState<string>("");

  const callHealthApi = async () => {
    setApiLoading(true);
    setApiError(null);
    try {
      const res = await fetch(apiUrl);
      const contentType = res.headers.get("content-type") ?? "";
      const body = contentType.includes("application/json") ? await res.json() : await res.text();
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${typeof body === "string" ? body : formatJson(body)}`);
      setApiLastResponse(formatJson(body));
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setApiError(message);
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <Section>
      <SectionTitle>HTTP API demo</SectionTitle>
      <Row>
        <PrimaryButton onClick={callHealthApi} disabled={apiLoading}>
          {apiLoading ? "Calling..." : "Call /api/health"}
        </PrimaryButton>
        {apiError ? <ErrorText>{apiError}</ErrorText> : null}
      </Row>
      {apiLastResponse ? (
        <Grid>
          <div>
            <SmallLabel>Last response</SmallLabel>
            <OutputBlock>
              <CodeText>{apiLastResponse}</CodeText>
            </OutputBlock>
          </div>
        </Grid>
      ) : null}
    </Section>
  );
}
