const saveFile = async (byteData: ArrayBuffer | string, fileName: string, type: string) => {

    let extension
    let name

    for (let i = fileName.length - 1; i >= 0; i--){
        if(fileName[i] === "."){
            name = fileName.slice(0, i)
            extension = fileName.slice(i, fileName.length)
        }
    }

    const base64 = btoa(
        new Uint8Array(byteData as ArrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
        )
    );

    const res = await fetch("http://localhost:4500/save/file", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http:localhost:5173",
        },
        body: JSON.stringify({
            byteData: base64,
            name,
            type,
            extension,
        }),
    });

    if(res.ok){
        console.log("Salvou bem")
        return true
    }
    
    console.log("Deu ruim")
    return false

}

export default saveFile