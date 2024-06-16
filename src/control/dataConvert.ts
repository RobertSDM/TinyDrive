export const convertArrayBufferToBase64 = (byteData: ArrayBuffer): string => {
    return btoa(
        new Uint8Array(byteData as ArrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
        )
    );
};
