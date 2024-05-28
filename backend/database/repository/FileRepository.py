from sqlalchemy.orm import joinedload, Session
from sqlalchemy import select, and_
from service.decorator.time_spend import time_spent
from service.logging_config import logger
from ..models.FileModel import File, FileData
from ..models.FolderModel import Folder
import time

@time_spent
def find_all_files (db):
    return db.query(File).options(joinedload(File.fileData)).all()

def find_by_file_id(id):
    pass

def find_by_file_id_download(db, id):

    fileData_subq = (select(
            FileData.byteData,
            FileData.file_id
        ).select_from(FileData)
        .subquery())
        
    file_join_fileData = (select(
        File.id,
        File.fullname,
        fileData_subq.c.byteData
    )
    .join(fileData_subq, File.id == fileData_subq.c.file_id)
    .where(File.id == id))

    file = db.execute(file_join_fileData).mappings().fetchone()

    return file
    

def save_file (
    db,
    name,
    extension,
    byteData,
    byteSize,
    byteSize_formatted,
    fileDataId: int = None,
    parentId: str = None,
):
    file = File(name, extension, byteSize, byteSize_formatted, byteData)
    
    db.add(file)
    db.commit()

    return file

def files_with_no_parent(db: Session) -> list:

    fileData_subq = (select(
        FileData.byteSize,
        FileData.byteSize_formatted,
        FileData.extension,
        FileData.file_id
    ).select_from(FileData)
    .subquery())

    file_join_fileData = (select(
        File
    )
    .join(fileData_subq, File.id == fileData_subq.c.file_id)
    .where(File.folder == None)
    .order_by(File.name))

    start = time.time()

    files = db.execute(file_join_fileData)

    logger.info(f"Depois do Execute {time.time() - start}")

    for i in files:
        logger.info(i)

    return {}
