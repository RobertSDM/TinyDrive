from prisma import Prisma

prisma = Prisma()

async def findAllFiles (id: str | None = None):
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

async def findAllFolders (id: str | None = None):
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

async def getFirstLoad () :
    await prisma.connect()
    
    try :
        files = await prisma.file.find_many(
            where = {
                "NOT": {
                    "parent",
                },
            },
        );
        folders = await prisma.folder.find_many(
            where = {
                "NOT": {
                    "parent",
                },
            },
        );

        elements = [files, folders];
        return elements;
    except Exception as e:
        print(e);
        return False;
    finally:
        await prisma.disconnect()
     
