import dynamic from "next/dynamic";

export const ReactQuill = dynamic(() => import("react-quill"), {
  // Disable during server side rendering
  ssr: false,
  // Render anything as fallback on server, e.g. loader or html content without editor
  loading: () => null,
});
