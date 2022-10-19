import dynamic from "next/dynamic";
import styled from "styled-components";

const ReactQuill = dynamic(() => import("react-quill"), {
  // Disable during server side rendering
  ssr: false,
  // Render anything as fallback on server, e.g. loader or html content without editor
  loading: () => null,
});

type ExtraProps = {
  fontFamily?: string;
};

export const StyledReactQuill = styled(ReactQuill)<ExtraProps>`
  .ql-editor:focus-visible {
    outline: none;
  }

  .ql-editor p,
  .ql-editor blockquote {
    margin-bottom: 1em;
    font-size: 180%;
    line-height: 1.75;
    text-align: justify;
    font-weight: 100;
    font-family: ${(props) => props.fontFamily} !important;
  }

  .ql-editor li {
    font-size: 180%;
    line-height: 1.75;
    text-align: justify;
    font-weight: 100;
    font-family: ${(props) => props.fontFamily} !important;
  }

  .ql-editor h1 {
    margin-bottom: 2em;
    font-size: 190%;
    line-height: 1.8;
    font-family: ${(props) => props.fontFamily} !important;
    font-weight: 550;
    letter-spacing: 1px;
  }

  .ql-editor h2 {
    margin-bottom: 1.75em;
    line-height: 1.8;
    font-size: 185%;
    font-family: ${(props) => props.fontFamily};
    font-weight: 500;
  }

  .ql-editor.ql-blank::before {
    color: grey;
    font-size: 160%;
    font-family: "Lora";
    font-style: italic;
  }

  .ql-tooltip {
    border-radius: 8px;
  }
`;
