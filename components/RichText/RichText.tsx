import dynamic from "next/dynamic";

export const ReactQuill = dynamic(() => import("react-quill"), {
  // Disable during server side rendering
  ssr: false,
  // Render anything as fallback on server, e.g. loader or html content without editor
  loading: () => null,
});

/* TRY
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false
  }
);


export default function QuillWrapper() {
  const quillRef = React.useRef(false)

  return <>
    <ReactQuill forwardedRef={quillRef} />
  </>
}
*/