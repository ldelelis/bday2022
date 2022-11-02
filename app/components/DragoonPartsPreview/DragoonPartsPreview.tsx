import { FC, useState } from "react";
import DragoonItemPreview from "../DragoonSelector/DragoonSelectorPreview/DragoonSelectorPreview";

type DragoonPartsPreviewProps = {
  images: string[];
  setIndex: (idx: number) => void;
};

const DragoonPartsPreview: FC<DragoonPartsPreviewProps> = (props) => {
  const { images, setIndex } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;
  const maxPages = Math.ceil(images.length / PAGE_SIZE);

  const slice = images.slice(
    (currentPage - 1) * PAGE_SIZE,
    PAGE_SIZE * currentPage
  );

  return (
    <div className="m-2 p-2 border-2 border-black col-span-7 grid grid-cols-11 justify-items-center">
      <div
        className="row-span-2 m-auto"
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
      >
        {"<"}
      </div>
      <div className="grid grid-cols-5 grid-rows-2 col-span-9">
        {slice.map((image, idx) => {
          return (
            <div
              key={image}
              className="m-4 border-4 border-black backdrop-blur-[4px]"
              onClick={() => setIndex(idx + (currentPage - 1) * PAGE_SIZE)}
            >
              <DragoonItemPreview image={image} />
            </div>
          );
        })}
      </div>
      <div
        className="row-span-2 m-auto"
        onClick={() => setCurrentPage(Math.min(currentPage + 1, maxPages))}
      >
        {">"}
      </div>
    </div>
  );
};

export default DragoonPartsPreview;
