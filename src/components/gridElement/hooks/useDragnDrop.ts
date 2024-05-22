export const useDragAndDrop = (
  setDraggedOver: React.Dispatch<React.SetStateAction<ItemStatus | null>>,
  setDragged: React.Dispatch<React.SetStateAction<string | null>>,
  gridChangeHandler: () => void
) => {
  const dragEndHandler = () => {
    setDraggedOver(null);
  };

  const dragOverHandler = (e: React.DragEvent, item: ItemStatus | null) => {
    e.preventDefault();
    setDraggedOver(item);
  };

  const dragDropHandler = (e: React.DragEvent, item: ItemStatus | null) => {
    e.preventDefault();
    gridChangeHandler();
    setDraggedOver(null);
  };

  return {
    dragEndHandler,
    dragOverHandler,
    dragDropHandler,
  } as const;
};
