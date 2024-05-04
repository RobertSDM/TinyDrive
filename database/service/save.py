from prisma import Prisma
prisma = Prisma()

async def save_folder (name):
    await prisma.connect()

    try:
        newFolder = prisma.folder.create(
            data = {
                "name": name,
            },
        );

        return newFolder;
    except Exception as e:
        print(e)
        return False
    finally:
        await prisma.disconnect()


async def save_file (
    name,
    _type,
    extension,
    bytesData,
    byteSize,
    fileDataId: int = None,
    parentId: str = None,
):
    await prisma.connect()
    try :
        new_file = await prisma.file.create(
            data = {
                "name": name,
                "fileData": {
                    "create": {
                        "extension": extension,
                        "byteData": bytesData,
                        "byteSize": byteSize
                    },
                },
            },
        );

        print(new_file)

        return new_file;
    except Exception as e :
        print(e)
        return False
    finally:
        await prisma.disconnect()


