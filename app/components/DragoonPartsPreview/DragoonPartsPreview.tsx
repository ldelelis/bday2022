import { FC, useState } from "react";
import { DEFAULT_COLOR } from "~/atoms";
import { baseBlackLine, noneSelected } from "~/images";
import DragoonItemBase from "../DragoonSelector/DragoonSelectorBase/DragoonSelectorBase";
import DragoonItemPreview from "../DragoonSelector/DragoonSelectorPreview/DragoonSelectorPreview";

type DragoonPartsPreviewProps = {
  images: string[];
  setIndex: (idx?: number | null) => void;
  optional: boolean;
};

const DragoonPartsPreview: FC<DragoonPartsPreviewProps> = (props) => {
  console.log(window.innerWidth);
  console.log(window.innerHeight);
  const { images, setIndex, optional } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = optional ? 14 : 15;
  const maxPages = Math.ceil(images.length / PAGE_SIZE);

  const slice = images.slice(
    (currentPage - 1) * PAGE_SIZE,
    PAGE_SIZE * currentPage
  );

  return (
    <div className="m-2 p-2 border-2 border-black col-span-7 grid grid-cols-11 justify-items-center">
      {images.length > PAGE_SIZE ? (
        <div
          className="row-span-3 m-auto animate-wiggle"
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        >
          <img src="/buttons/next-button.png" className="-scale-x-100" />
          <p className="text-md xl:text-2xl">Previous</p>
        </div>
      ) : (
        <div></div>
      )}
      <div className="grid grid-cols-2 grid-rows-8 col-span-9 sm:grid-cols-3 sm:grid-rows-5 lg:grid-cols-4 lg:grid-rows-4 xl:grid-cols-5 xl:grid-rows-3">
        {optional && currentPage === 1 && (
          <div
            className="m-4 border-4 border-black backdrop-blur-[4px]"
            onClick={() => setIndex(null)}
          >
            <img src={noneSelected}></img>
          </div>
        )}

        {slice.map((image, idx) => {
          return (
            <div
              key={image}
              className="grid grid-cols-1 m-4 border-4 border-black backdrop-blur-[4px]"
              onClick={() => setIndex(idx + (currentPage - 1) * PAGE_SIZE)}
            >
              <DragoonItemPreview styleProps="stacked z-20" image={image} />
              <DragoonItemPreview
                styleProps="stacked z-10 opacity-50"
                image={baseBlackLine}
              />
              {/*We override the style definitions to disable the preview's outline*/}
              <DragoonItemBase
                className="stacked opacity-50"
                color={DEFAULT_COLOR}
                style={{}}
              />
            </div>
          );
        })}
      </div>
      {images.length > PAGE_SIZE ? (
        <div
          className="row-span-3 m-auto animate-wiggle"
          onClick={() => setCurrentPage(Math.min(currentPage + 1, maxPages))}
        >
          <img src="/buttons/next-button.png" />
          <p className="w-min m-auto text-xl xl:text-2xl">Next</p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DragoonPartsPreview;
