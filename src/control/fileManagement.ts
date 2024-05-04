import { ChangeEvent } from "react";
import saveFile from "../fetcher/saveFile.ts";

const handleFolder = (
    reader: FileReader,
    event: ChangeEvent<HTMLInputElement>
) => {
    for (const i of event.target.files!) {
        console.log(i);
    }
};

const handleFile = (
    reader: FileReader,
    event: ChangeEvent<HTMLInputElement>
) => {
    const fileList = event.target.files!;

    function read(readIndex: number) {
        if (readIndex >= fileList.length) {
            return;
        }

        const file = fileList[readIndex];
        reader.readAsArrayBuffer(file);

        reader.onload = (e) => {
            saveFile(e.target!.result!, file.name, file.type, e.total);
            read(++readIndex);
        };
    }

    read(0);
};

const handleSelection = (isFileInput: boolean) => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.minLength = 1;
    input.webkitdirectory = !isFileInput;

    const reader = new FileReader();
    input.addEventListener("change", (e: Event) => {
        if (isFileInput) {
            handleFile(reader, e as unknown as ChangeEvent<HTMLInputElement>);
        } else {
            handleFolder(reader, e as unknown as ChangeEvent<HTMLInputElement>);
        }
    });

    input.click();
};



export {handleFolder, handleSelection}
