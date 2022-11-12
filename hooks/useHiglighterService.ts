import { useTextSelection } from "@mantine/hooks";
import { nanoid } from "nanoid";
import React from "react";

export default function useHighlighterService() {
  const selection = useTextSelection();

  const handleMouseup = () => {
    if (!selection) return;

    const range = selection.getRangeAt(0);
    const mark = createMark();

    // if the selection intersects with an existing mark, don't highlight
    const isRangeIntersectingExistingMarks =
      checkIfSelectionIntersectsExistingMark(range);
    if (isRangeIntersectingExistingMarks) return;

    // don't highlight if the selection is empty
    if (!range.collapsed) {
      mark.appendChild(range.extractContents());
      range.insertNode(mark);
    }
  };

  React.useEffect(() => {
    const shareout = document.querySelector("#shareout");
    shareout && shareout.addEventListener("mouseup", handleMouseup);

    return () => {
      shareout && shareout.removeEventListener("mouseup", handleMouseup);
    };
  }, [selection]);
}

const createMark = (): HTMLElement => {
  const mark = document.createElement("mark");
  mark.classList.add(`chis-highlight-${nanoid(11)}`);
  mark.onclick = (e) => {
    e.stopImmediatePropagation(); // stop propagation to prevent the event from bubbling up to the window and fucking up the selection on double click

    const newRange = document.createRange();
    newRange.selectNode(mark);
    const content = newRange.extractContents();

    const span = document.createElement("span");
    if (content.textContent) {
      const text = document.createTextNode(content.textContent);
      newRange.insertNode(span.appendChild(text));
    }
  };
  return mark;
};

const checkIfSelectionIntersectsExistingMark = (range: Range): boolean => {
  const marks = document.querySelectorAll("mark");
  const intersectingMarks = Array.from(marks)
    .filter((mark) => range.intersectsNode(mark))
    .filter(Boolean);
  return intersectingMarks.length > 0;
};
