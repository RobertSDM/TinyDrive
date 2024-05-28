from fastapi import APIRouter, Response, Depends
from service.FileService import save_file, download_service
from service.logging_config import logger
from database.repository.FileRepository import files_with_no_parent, find_all_files
from database.schemas.schemas import FileBody
from fastapi.responses import StreamingResponse
from database.init_database import get_session
 
route = APIRouter()

@route.get("/get_root_files")
def get_root_files(db = Depends(get_session)):
    files_and_folders = files_with_no_parent(db)

    if(len(files_and_folders) > 0):
        Response(status_code=200)
        return files_and_folders
    else:   
        return Response(status_code=204)

@route.post('/save/file', status_code=200)
def save_file_route(file: FileBody, db = Depends(get_session)):
    new_file = save_file(db, file.name, file.extension, file.byteData, file.byteSize)

    if(new_file):
        return new_file
    else:
        return Response(status_code=500)

@route.get("/find/all")
def find_all(db = Depends(get_session)) :
    return find_all_files(db)

@route.get("/download/{id}")
def download(id: str, db = Depends(get_session)):
    data, formated_byte_data = download_service(db, id)

    return StreamingResponse(
        formated_byte_data,
        media_type="application/octet-stream",
        headers={
            "Content-Disposition": f"attachment; filename={data['fullname']}"
        }
    )
