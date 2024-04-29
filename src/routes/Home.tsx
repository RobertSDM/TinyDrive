import {
  ChangeEvent,
  MutableRefObject,
  useRef,
  useState,
} from "react";
import { MdFileUpload, MdExpandLess, MdExpandMore } from "react-icons/md";
import { loadFirst } from "../fileTree/loadTree.ts";
import saveFile from "../fetcher/saveFile.ts";

enum Extensions {
  text = ".txt",
  folder = "-",
}



function Home() {
  loadFirst()
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [archives, setArchives] = useState([
    {
      name: "Pasta legal",
      type: "FOLDER",
    },
    {
      name: "Arquivo maneiro",
      type: "TEXT",
    },
  ]);
  const searchElement = useRef(
    null
  ) as MutableRefObject<HTMLInputElement | null>;

  const [foundItems, setFoundItems] = useState([] as typeof archives);
  
  function findArchives(value: string) {
    const found = archives.filter((i) => {
      return i.name.toUpperCase().includes(value.toUpperCase());
    });
    return setFoundItems(found);
  }

  function handleClearSearchInput(e: KeyboardEvent) {
    if (e.key === "Escape") {
      setSearch("");
      searchElement.current!.blur();
    }
  }

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
        saveFile(e.target!.result! ,file.name, file.type)
        read(++readIndex);
      };
    }

    read(0);
  };

  const handleFolder = (
    reader: FileReader,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    for (const i of event.target.files!) {
      console.log(i);
    }
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

  return (
    <>
      <header className="flex border px-8 py-4 items-center">
        <h1 className="text-xl font-bold text-purple-500">Tiny Drive</h1>
        <div className="mx-auto border-black/40 border rounded-sm items-center cursor-pointer relative w-2/4">
          <input
            className="outline-none w-full px-4 py-2"
            ref={searchElement}
            onKeyDown={() => handleClearSearchInput}
            onBlur={() => {
              searchElement.current?.addEventListener("focusout", () => {
                setSearch("");
              });
            }}
            onChange={(e) => {
              findArchives(e.target.value);
              setSearch(e.target.value);
            }}
            value={search}
            type="text"
            placeholder="Pesquisar no TinyDrive"
          />
          <div
            className={`top-full -left-[1px] border-black/40 border border-t-0 bg-white absolute ${
              search.length > 0 ? "flex" : "hidden"
            } flex-col w-[calc(100%_+_2px)]`}
          >
            {foundItems.length > 0 && search.length > 0 ? (
              foundItems.map((i) => (
                <span className="hover:bg-purple-100 p-2">{i.name}</span>
              ))
            ) : (
              <span className="text-black/40 text-sm p-2 mx-auto">
                Nenhum resultado encontrado
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="mt-10 mx-10">
        <nav className="border-t border-b border-black/10 py-1">
          <div
            className={`inline relative ${
              isUploadOpen ? "border-black/30" : ""
            } `}
          >
            <button
              className={`items-center gap-x-2 border-purple-500 text-black border hover:bg-purple-500  hover:text-white p-2 inline-flex cursor-pointer rounded-t-sm`}
              onMouseEnter={() => {
                setIsUploadOpen(true);
              }}
              onMouseLeave={() => {
                setIsUploadOpen(false);
              }}
            >
              <MdFileUpload />
              Carregar
              {!isUploadOpen ? <MdExpandLess /> : <MdExpandMore />}
            </button>
            <div
              onMouseOver={() => {
                setIsUploadOpen(true);
              }}
              onMouseLeave={() => {
                setIsUploadOpen(false);
              }}
              className={`absolute bg-white w-full border border-black/30 border-t-0 ${
                isUploadOpen ? "block" : "hidden"
              }`}
            >
              <button
                onClick={() => handleSelection(true)}
                className="hover:bg-purple-500 px-2 py-1 hover:text-white cursor-pointer w-full"
              >
                Arquivos
              </button>
              <hr className="w-4/5 mx-auto" />
              <button
                onClick={() => handleSelection(false)}
                className="hover:bg-purple-500 px-2 py-1 hover:text-white cursor-pointer w-full"
              >
                Pastas
              </button>
            </div>
          </div>
        </nav>

        <section className="mt-5">
          <div className="text-xl text-black/50">/</div>
          <table className="mt-5 w-full">
            <thead>
              <tr>
                <td className="font-bold w-4/5">Nome</td>
                <td className="font-bold">Tipo</td>
              </tr>
            </thead>
            <tbody>
              {archives.map((arq) => (
                <tr key={arq.name}>
                  <td>{arq.name}</td>
                  <td className="flex justify-center">
                    {Extensions[arq.type.toLowerCase()]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

export default Home;
