from prisma import Prisma

prisma = Prisma()

async def find_all_files (id: str | None = None):
    await prisma.connect()
    try:
        if (id):
            files = await prisma.file.find_unique(
                where = {
                    "id": id,
                },
            );
        else :
            files = await prisma.file.find_many(
                include={
                    "fileData": True
                }
            )


        returnable_list = []
        
        for file in files:
            returnable_list.append({
                "id": file.id,
                "type": file.type,
                "name": file.name,
                "parentId": file.parentId,
                "parent": file.parent,
                "fileData": {
                    "id": file.fileData.id,
                    "bytesData": str(file.fileData.bytesData),
                    "textData": file.fileData.textData,
                    "fileId": file.fileData.fileId,
                    "dataType": file.fileData.dataType
                },
            })
            
        return returnable_list
    except Exception as e :
        print(e)
        return False
    finally:
        await prisma.disconnect()

async def find_all_folders (id: str | None = None):
    await prisma.connect()
    try :
        if (id) :
            folders = await prisma.folder.find_unique(
                where= {
                    "id":id,
                },
            );
        else :
            folders = await prisma.folder.findMany();

        return folders;
    except Exception  as e :
        print(e);
        return False;
    finally:
        await prisma.disconnect()

async def find_by_file_id(id):
    await prisma.connect()

    try:
        file = await prisma.file.find_unique(
            where = {
                "id": id
            },
        )

        file_data = await prisma.filedata.find_unique(
            where = {
                "fileId": file.id
            }
        )


        return {"name": file.name, "byteData": file_data.byteData, "extension": file_data.extension}
    except Exception as e:
        print(e)
        return False
    finally:
        await prisma.disconnect()

async def get_files_with_no_parent() :
    await prisma.connect()
    
    try:
        files = await prisma.file.find_many(
            where = {
                "parent": None
            },
            include= {
                "fileData": True
            }
        );

        folders = await prisma.folder.find_many(
            where = {
                "parent": None
            }
        );
        
        files = [file.model_dump() for file in files]
        folders = [folder.model_dump() for folder in folders]

        elements = []
        elements.extend(files)
        elements.extend(folders)

        return elements;
    except Exception as e:
        print(e);
        return False;
    finally:
        await prisma.disconnect()
     
