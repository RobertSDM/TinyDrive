export const convertArrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const typedView = new Uint8Array(buffer);
    const byteString = typedView.reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
    );

    return btoa(byteString);
};

export const convertBase64ToArrayBuffer = (base64: string): ArrayBuffer => {
    const binaryString = atob(base64);

    const len = binaryString.length;
    const byteArray = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
    }

    return byteArray.buffer;
};


export function arrayToFileList(files: File[]): FileList {
    const dataTransfer = new DataTransfer();

    files.forEach((file) => {
        dataTransfer.items.add(file);
    });

    return dataTransfer.files;
}

