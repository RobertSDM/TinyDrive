from .FolderModel import Base
from sqlalchemy.orm import relationship, Mapped, mapped_column
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID
import uuid

class File(Base):
    __tablename__ = "file"

    id  = sa.Column(sa.String, primary_key=True, name="file_id", default=uuid.uuid4, index=True)
    name = sa.Column(sa.String)
    _type = sa.Column(sa.String, default="FILE")
    fullname = sa.Column(sa.String)

    # folder parent
    folder_id: Mapped['sa.String'] = mapped_column(sa.ForeignKey("folder.folder_id"), nullable=True)
    folder: Mapped['Folder'] = relationship(back_populates="files", foreign_keys=[folder_id])
    
    fileData: Mapped["FileData"] = relationship(back_populates="file",uselist=False, lazy="selectin")


    def __init__(self, name, extension, byteSize, byteSize_formatted, byteData) :
        self.name = name
        self.fullname = f"{name}.{extension}"
        
        fileData = FileData(byteData=byteData, extension=extension,byteSize=byteSize, byteSize_formatted=byteSize_formatted)

        self.fileData = fileData
    

class FileData(Base):
    __tablename__ = "fileData"

    id = sa.Column(sa.String, primary_key=True, name="fileData_id", default=uuid.uuid4, index=True)
    byteData: Mapped[sa.String] = mapped_column(sa.String, nullable=False, deferred=True)
    extension = sa.Column(sa.String, nullable=False)
    byteSize = sa.Column(sa.Integer, nullable=False)
    byteSize_formatted = sa.Column(sa.String, nullable=False)

    file_id: Mapped["sa.String"] = mapped_column(sa.ForeignKey("file.file_id"), nullable=False)
    file: Mapped["File"] = relationship(back_populates="fileData", uselist=False)
    
