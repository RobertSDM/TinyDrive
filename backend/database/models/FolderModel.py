from ..init_database import Base
from sqlalchemy.orm import relationship, Mapped, mapped_column
import sqlalchemy as sa
import uuid


class Folder(Base):
    __tablename__ = "folder"

    id = sa.Column(sa.String, primary_key=True, name="folder_id", default=uuid.uuid4, index=True)
    name = sa.Column(sa.String, nullable=False)
    _type = sa.Column(sa.String, default="FOLDER")

    # Child folders
    folders: Mapped[list["Folder"]] = relationship(back_populates="folder")

    # Parent folders
    folderC_id: Mapped["sa.String"] = mapped_column(sa.ForeignKey("folder.folder_id"), nullable=True)
    folder: Mapped["Folder"] = relationship(back_populates="folders", foreign_keys=[folderC_id], remote_side=[id])

    # files relation
    files: Mapped[list["File"]] = relationship(back_populates="folder")
    