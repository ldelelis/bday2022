import { Dialog } from "@headlessui/react";
import { Dispatch, FC, SetStateAction } from "react";
import { asImage } from "~/utils/download";
import DragoonCard from "../DragoonCard/DragoonCard";

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
    const element = document.getElementById("dragoon-preview")
    const image = await asImage(element)

    const fakeLink = window.document.createElement("a")
    fakeLink.style = "display:none;"
    fakeLink.download = "foo.png"

    fakeLink.href = image

    document.body.appendChild(fakeLink)
    fakeLink.click()
    document.body.removeChild(fakeLink)
    
    fakeLink.remove()
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-[100]"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true">
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="max-w-3xl rounded font-dragoon p-4 bg-purple-300 border-2 border-black">
            <Dialog.Title className="text-2xl pb-2">
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
            <div className="py-2 flex gap-x-4">
              <button className="border-2 border-black bg-purple-500 px-2 py-1 text-white rounded-md mr-auto" onClick={async () => await downloadDragoon()}>Download</button>
              <button
                type="submit"
                form="dragoonData"
                className="border-2 border-black bg-purple-500 px-2 py-1 text-white rounded-md"
              >
                Submit!
              </button>
              <button
                className="border-2 border-black bg-purple-500 px-2 py-1 text-white rounded-md"
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
