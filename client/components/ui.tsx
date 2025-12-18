import styled, { createGlobalStyle, keyframes } from "styled-components";

// --- Design Tokens (Dark Premium Theme) ---
const colors = {
  bg: "#050505", // Almost black
  bgGradient: "radial-gradient(circle at 50% 0%, #1e1e24 0%, #050505 100%)",

  cardBg: "rgba(20, 20, 20, 0.6)",
  cardBorder: "rgba(255, 255, 255, 0.08)",

  primary: "#3b82f6", // Vibrant Blue
  primaryGradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
  primaryHover: "#60a5fa",

  text: "#ededed",
  textMuted: "#a1a1aa",
  textDim: "#52525b",

  success: "#10b981",
  error: "#ef4444",
  errorGradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
  warning: "#f59e0b",

  codeBg: "#0a0a0a",
  codeBorder: "#27272a",
};

const shadows = {
  glow: "0 0 20px -5px rgba(59, 130, 246, 0.5)",
  card: "0 8px 32px rgba(0, 0, 0, 0.4)",
};

// --- Animations ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- Global Styles ---
export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: ${colors.bg};
    background-image: ${colors.bgGradient};
    color: ${colors.text};
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
  }

  h1, h2, h3 {
    margin: 0;
    letter-spacing: -0.03em;
  }
  
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: ${colors.textDim};
    border-radius: 4px;
  }
`;

// --- Layout ---

export const Page = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 24px;
  animation: ${fadeIn} 0.6s ease-out;
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 40px;
  font-weight: 700;
  background: linear-gradient(to right, #fff, #a1a1aa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 64px;
`;

export const Logo = styled.img`
  width: 40px;
  height: 40px;
`;

export const Section = styled.section`
  background: ${colors.cardBg};
  border: 1px solid ${colors.cardBorder};
  padding: 32px;
  margin-bottom: 32px;
  backdrop-filter: blur(12px);
  box-shadow: ${shadows.card};
  transition: transform 0.2s, border-color 0.2s;

  &:hover {
    border-color: rgba(255, 255, 255, 0.15);
  }
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 24px;
  color: ${colors.text};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Row = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 24px;
`;

// --- Components ---

const ButtonBase = styled.button`
  appearance: none;
  font-family: inherit;
  font-weight: 600;
  font-size: 14px;
  padding: 10px 20px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  line-height: 1;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const Button = styled(ButtonBase)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${colors.text};

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

export const PrimaryButton = styled(ButtonBase)`
  background: ${colors.primaryGradient};
  border: 1px solid transparent;
  color: white;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);

  &:hover:not(:disabled) {
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
    box-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
  }
`;

export const DestructiveButton = styled(ButtonBase)`
  background: ${colors.errorGradient};
  border: 1px solid transparent;
  color: white;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);

  &:hover:not(:disabled) {
    box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
    transform: translateY(-1px);
  }
  
  &:active:not(:disabled) {
    transform: scale(0.98);
    box-shadow: 0 2px 10px rgba(239, 68, 68, 0.3);
  }
`;

export const StatusText = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${colors.textMuted};
  background: rgba(255, 255, 255, 0.03);
  padding: 6px 12px;
  border: 1px solid ${colors.cardBorder};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  
  &::before {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    background: currentColor;
    opacity: 0.5;
  }
`;

export const ErrorText = styled.div`
  font-size: 13px;
  color: ${colors.error};
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  padding: 8px 12px;
  display: inline-flex;
`;

export const MutedParagraph = styled.div`
  margin: 16px 0;
  font-size: 13px;
  color: ${colors.textMuted};
  line-height: 1.6;
`;

export const InlineCode = styled.code`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9em;
  background: rgba(255, 255, 255, 0.07);
  padding: 2px 6px;
  border-radius: 4px;
  color: ${colors.text};
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

export const Grid = styled.div`
  display: grid;
  gap: 16px;
  margin-top: 24px;
`;

export const SmallLabel = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
  color: ${colors.textDim};
  margin-bottom: 8px;
`;

export const CodeBlock = styled.div`
  background: ${colors.codeBg};
  border: 1px solid ${colors.codeBorder};
  padding: 0;
  overflow: hidden;
  position: relative;
`;

export const OutputBlock = styled(CodeBlock)`
  min-height: 100px;
  /* Removed fake window controls */
`;

export const CodeText = styled.pre`
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: ${colors.text};
  margin: 0;
  padding: 16px;
  white-space: pre-wrap;
  word-break: break-all;
  
  &::selection {
    background: ${colors.primary};
    color: white;
  }
`;

export const Placeholder = styled.span`
  color: ${colors.textDim};
  font-style: italic;
  opacity: 0.7;
`;
