import { Dialog } from "@headlessui/react";
import { Dispatch, FC, SetStateAction } from "react";
import DragoonCard from "../DragoonCard/DragoonCard";
import { toPng } from "html-to-image";

type DragoonConfirmationModalProps = {
  author: string;
  comment: string;
  clothes: number | null;
  horns: number;
  eye: number;
  handItem: number | null;
  hat: number | null;
  moustache: number | null;
  frame: number | null;
  baseColor: string;
  backgroundColor: string;

  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const DragoonConfirmationModal: FC<DragoonConfirmationModalProps> = (props) => {
  const {
    author,
    comment,
    clothes,
    horns,
    eye,
    handItem,
    hat,
    moustache,
    frame,
    baseColor,
    backgroundColor,
    isOpen,
    setIsOpen,
  } = props;

  const downloadDragoon = async () => {
    const filter = (node: HTMLElement) => {
      console.log(node);
      console.log(node.hasAttribute("src"));
      if (node.tagName !== "img") {
        return true;
      }

      return node.hasAttribute("src");
    };
    const element = document.getElementById("dragoon-preview");
    const image = await toPng(element, { filter: filter });

    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = `dragoon-${author}.png`;

    fakeLink.href = image;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-[100]"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true">
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="max-w-3xl p-4 bg-purple-300 border-2 border-black rounded font-dragoon">
            <Dialog.Title className="pb-2 text-2xl">
              Please confirm your message!
            </Dialog.Title>
            <div
              className="text-2xl"
              style={{
                backgroundImage: "url(/backgrounds/all-background.png)",
                backgroundSize: "50%",
              }}
            >
              <DragoonCard
                author={author}
                comment={comment}
                clothesIndex={clothes}
                eyeIndex={eye}
                hatIndex={hat}
                hornsIndex={horns}
                handItemIndex={handItem}
                moustacheIndex={moustache}
                frameIndex={frame}
                baseColor={baseColor}
                backgroundColor={backgroundColor}
              />
            </div>
            <div className="flex py-2 gap-x-4">
              <button
                className="px-2 py-1 mr-auto text-white bg-purple-500 border-2 border-black rounded-md"
                onClick={downloadDragoon}
              >
                Download
              </button>
              <button
                type="submit"
                form="dragoonData"
                className="px-2 py-1 text-white bg-purple-500 border-2 border-black rounded-md"
              >
                Submit!
              </button>
              <button
                className="px-2 py-1 text-white bg-purple-500 border-2 border-black rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default DragoonConfirmationModal;
