from pydantic import BaseModel
from sqlalchemy.dialects.postgresql import UUID
from typing import Optional


class FileDataBase(BaseModel):
    id: str
    byteData: str
    extension: str
    byteSize: int
    byteSize_formatted: str
    file_id: str

    class Config:
        from_attributes = True

class FolderBase(BaseModel):
    id: str
    name: str
    _type: str
    folderC_id: str
    
    class Config:
        from_attributes = True

class FileBase(BaseModel):
    id: str
    name: str
    _type: str
    fullname: str
    folder_id: str

    class Config:
        from_attributes = True

## Schemas

class FileDataSchema(FileDataBase):
    file: FileBase

class FolderSchema(FolderBase):
    folders: list[FolderBase]
    folder: FolderBase
    files: list[FileBase]

class FileSchema(FileBase):
    fileData: FileDataBase
    folder: FolderBase

class FileBody(BaseModel):
    name: str
    type: str
    extension: str
    byteData: str
    byteSize: int