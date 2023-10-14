import { Dialog } from "@headlessui/react";
import { Dispatch, FC, SetStateAction } from "react";

type DragoonGeneratorCreditsModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const DragoonGeneratorCreditsModal: FC<DragoonGeneratorCreditsModalProps> = (
  props
) => {
  const { isOpen, setIsOpen } = props;
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-[100]"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true">
        <div className="fixed inset-0 flex items-center justify-center p-4 xl:p-0">
          <Dialog.Panel className="p-4 bg-purple-300 border-2 border-black border-solid rounded xl:text-2xl font-dragoon">
            <Dialog.Title className="text-xl border-b-2 border-black xl:text-3xl">
              Dragoon Generator Credits
            </Dialog.Title>
            <div className="px-2 pt-4">
              <p>Parts by agito</p>
              <p>Frame art, backgrounds, buttons, font by 127</p>
              <p>Website development by ~sky, tastelikenyan</p>
              <p>Project management, testing by AC1D</p>
              <div className="block xl:hidden">
                <hr className="my-2 border-black border-b-1"></hr>
                <p className="pb-2">Want the selen font for yourself? </p>
                <a
                  className="px-2 py-1 text-white bg-purple-500 border-2 border-black border-solid xl:px-4 rounded-md"
                  href="/fonts/Selen2-Regular.ttf"
                >
                  Download here!
                </a>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default DragoonGeneratorCreditsModal;
