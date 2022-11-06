import dynamic from "next/dynamic";
import styled from "styled-components";

const ReactQuill = dynamic(() => import("react-quill"), {
  // Disable during server side rendering
  ssr: false,
  // Render anything as fallback on server, e.g. loader or html content without editor
  loading: () => null,
});

type ExtraProps = {
  fontSize?: string;
  fontWeight?: number;
  fontFamily: string;
  lineHeight?: number;
};

export const StyledReactQuill = styled(ReactQuill)<ExtraProps>`
  .ql-editor:focus-visible {
    outline: none;
  }

  .msreadout-highlight,
  .ql-editor p,
  .ql-editor blockquote {
    margin-bottom: 1em;
    font-size: ${(props) => props.fontSize ?? "180%"};
    line-height: ${(props) => props.lineHeight ?? 1.75};
    text-align: justify;
    font-weight: 400;
    font-family: ${(props) => props.fontFamily} !important;
  }

  .ql-editor li {
    font-size: ${(props) => props.fontSize ?? "180%"};
    line-height: ${(props) => props.lineHeight ?? 1.75};
    text-align: justify;
    font-weight: 400;
    font-family: ${(props) => props.fontFamily} !important;
  }

  .ql-editor h1 {
    margin-bottom: 2em;
    font-size: ${(props) => props.fontSize ?? "180%"};
    line-height: ${(props) => props.lineHeight ?? 1.75};
    font-family: ${(props) => props.fontFamily} !important;
    font-weight: 550;
    letter-spacing: 1px;
  }

  .ql-editor h2 {
    margin-bottom: 1.75em;
    line-height: ${(props) => props.lineHeight ?? 1.75};
    font-size: ${(props) => props.fontSize ?? "180%"};
    font-family: ${(props) => props.fontFamily};
    font-weight: 500;
  }
  .ql-editor strong {
    font-weight: 600;
  }
  p.ql-align-center {
    text-align: center;
  }
  .ql-editor.ql-blank::before {
    color: grey;
    font-size: 160%;
    font-family: ${(props) => props.fontFamily};
    font-style: italic;
  }

  .ql-tooltip {
    border-radius: 8px;
  }

  .ql-align-right {
    text-align: right;
  }
  .ql-align-center {
    text-align: center;
  }
  .ql-align-justify {
    text-align: justify;
  }
`;
