import { ChangeEvent } from "react";
import saveFile from "../connection/saveFile.ts";
import { convertArrayBufferToBase64 } from "./dataConvert.ts";

const handleFolder = (event: ChangeEvent<HTMLInputElement>) => {
    // const reader = new FileReader();

    for (const i of event.target.files!) {
        console.log(i);
    }
};

const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const fileList = event.target.files!;
    let readIndex = 0;

    function readFile() {
        if (readIndex >= fileList.length) {
            return;
        }

        const file = fileList[readIndex];
        reader.readAsArrayBuffer(file);

        reader.onload = (e) => {
            const extractedContent = file.name.split(".");

            const name = extractedContent[0];
            const extension = extractedContent[extractedContent.length - 1];

            const base64 = convertArrayBufferToBase64(
                e.target!.result! as ArrayBuffer
            );

            saveFile(base64, name, extension, file.type, e.total);
            readIndex++;
            readFile();
        };
    }

    // using recursion because the loop should run 
    // when the file is readed
    readFile();
};

const createSelectionInput = (isFileInput: boolean) => {
    const input = document.createElement("input");

    // configuring the input element
    input.type = "file";
    input.multiple = true;
    input.minLength = 1;
    input.webkitdirectory = !isFileInput;

    input.addEventListener("change", (e: Event) => {
        if (isFileInput) {
            handleFile(e as unknown as ChangeEvent<HTMLInputElement>);
        } else {
            handleFolder(e as unknown as ChangeEvent<HTMLInputElement>);
        }
    });

    input.click();

    // removing the input element and listener, for clean pourpose
    input.parentElement?.removeChild(input);
    input.removeEventListener("change", (e: Event) => {
        if (isFileInput) {
            handleFile(e as unknown as ChangeEvent<HTMLInputElement>);
        } else {
            handleFolder(e as unknown as ChangeEvent<HTMLInputElement>);
        }
    });
};

export { createSelectionInput };
