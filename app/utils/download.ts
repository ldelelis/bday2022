import html2canvas from "html2canvas";

export const asImage = async (el) => {
    el.setAttribute("width", el.getBoundingClientRect().width);
    el.setAttribute("height", el.getBoundingClientRect().height);
    el.style.width = null;
    el.style.height= null;
    const canvas = await html2canvas(el)
    const image = canvas.toDataURL("image/png", 1.0)
    return image
}