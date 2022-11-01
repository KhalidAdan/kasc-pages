const trimClean = (str: string) => str.replace(/^\s+|\s+$/g, "");
const getText = (el: any) => {
  let ret = " ";
  const length = el.childNodes.length;
  for (let i = 0; i < length; i++) {
    const node = el.childNodes[i];
    if (node.nodeType != 8) {
      if (node.nodeType != 1) {
        // Strip white space.
        ret += node.nodeValue;
      } else {
        ret += getText(node);
      }
    }
  }
  return trimClean(ret);
};

export const countWords = (el: any) => {
  return getText(el).split(/\s+/g).length;
};

export const isEditorEmpty = (htmlContent: string) => {
  return htmlContent == "<p><br></p>";
};
