import { Dialog } from "@headlessui/react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { allBackground } from "~/images";
import DragoonCard from "../DragoonCard/DragoonCard";

type DragoonConfirmationModalProps = {
  author: string;
  comment: number;
  clothes: string;
  horns: number;
  eye: number;
  handItem: number;
  hat: number;
  moustache: number;
  frame: number;
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
                backgroundImage: `url(${allBackground})`,
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
            <div className="py-2 space-x-4">
              <button
                type="submit"
                form="dragoonData"
                className="bg-purple-500 px-2 py-1 text-white rounded-md"
              >
                Submit!
              </button>
              <button
                className="bg-purple-500 px-2 py-1 text-white rounded-md"
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
