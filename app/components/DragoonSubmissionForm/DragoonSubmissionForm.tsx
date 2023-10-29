import {
  backgroundColorCurrent,
  baseColorCurrent,
  clothCurrent,
  eyeCurrent,
  frameCurrent,
  handItemCurrent,
  hatCurrent,
  hornCurrent,
  moustacheCurrent,
  DEFAULT_COLOR,
} from "~/atoms";
import { nameBanner, yourMessage } from "~/images/dragoonGenerator/form";
import { Form, useTransition } from "@remix-run/react";
import { useAtom } from "jotai";
import { FC, useState } from "react";
import DragoonConfirmationModal from "../DragoonConfirmationModal/DragoonConfirmationModal";

const DragoonSubmissionForm: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

  const [clothIndex, setCloth] = useAtom(clothCurrent);
  const [eyeIndex, setEye] = useAtom(eyeCurrent);
  const [hatIndex, setHat] = useAtom(hatCurrent);
  const [handItemIndex, setHandItem] = useAtom(handItemCurrent);
  const [hornIndex, setHorn] = useAtom(hornCurrent);
  const [moustacheIndex, setMoustache] = useAtom(moustacheCurrent);
  const [frameIndex, setFrame] = useAtom(frameCurrent);

  const [currentColor, setCurrentColor] = useAtom(baseColorCurrent);
  const [backgroundColor, setBackgroundColor] = useAtom(backgroundColorCurrent);

  const transition = useTransition();

  const handleReset = () => {
    setCloth(null);
    setEye(0);
    setHat(null);
    setHandItem(null);
    setHorn(0);
    setMoustache(null);
    setFrame(null);
    setCurrentColor(DEFAULT_COLOR);
    setBackgroundColor("#ffffff");
  };

  return (
    <>
      <DragoonConfirmationModal
        author={author}
        comment={message}
        clothes={clothIndex}
        horns={hornIndex}
        eye={eyeIndex}
        handItem={handItemIndex}
        hat={hatIndex}
        moustache={moustacheIndex}
        frame={frameIndex}
        baseColor={currentColor}
        backgroundColor={backgroundColor}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Form
        id="dragoonData"
        method="post"
        className="flex flex-col m-auto 2xl:py-4"
      >
        <img src={nameBanner} className="py-2 m-auto" />
        <input
          id="author"
          name="author"
          type="text"
          value={author}
          className="px-4 text-2xl border-b-2 border-black 2xl:text-4xl h-max basis-8"
          required={true}
          maxLength={35}
          disabled={transition.state === "submitting"}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label htmlFor="comment" className="m-auto">
          <img
            src={yourMessage}
            className="w-2/3 py-2 m-auto h-2/3 2xl:h-full 2xl:w-full"
          />
        </label>
        <textarea
          name="comment"
          id="comment"
          value={message}
          className="p-4 text-2xl border-2 border-black 2xl:text-4xl basis-52"
          required={true}
          maxLength={160}
          disabled={transition.state === "submitting"}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <input
          id="hat"
          name="hat"
          type="hidden"
          value={hatIndex === null ? "" : hatIndex + 1}
        />
        <input
          id="handItem"
          name="handItem"
          type="hidden"
          value={handItemIndex === null ? "" : handItemIndex + 1}
        />
        <input id="eye" name="eye" type="hidden" value={eyeIndex + 1} />
        <input
          id="moustache"
          name="moustache"
          type="hidden"
          value={moustacheIndex === null ? "" : moustacheIndex + 1}
        />
        <input
          id="clothes"
          name="clothes"
          type="hidden"
          value={clothIndex === null ? "" : clothIndex + 1}
        />
        <input
          id="frames"
          name="frames"
          type="hidden"
          value={frameIndex === null ? "" : frameIndex + 1}
        />
        <input id="horns" name="horns" type="hidden" value={hornIndex + 1} />
        <input
          id="baseColor"
          name="baseColor"
          type="hidden"
          value={currentColor}
        />
        <input
          id="backgroundColor"
          name="backgroundColor"
          type="hidden"
          value={backgroundColor}
        />
        <div className="flex justify-center h-16 max-w-full gap-8 min-w-fit">
          <button
            type="button"
            form="dragoonData"
            className="w-1/3 h-full submit-button"
            disabled={
              transition.state === "submitting" ||
              author.length === 0 ||
              message.length === 0
            }
            onClick={() => setIsOpen(true)}
          />
          <button
            type="button"
            onClick={() => handleReset()}
            className="w-2/5 h-full bg-bottom reset-button"
            disabled={transition.state === "submitting"}
          />
        </div>
      </Form>
    </>
  );
};

export default DragoonSubmissionForm;
