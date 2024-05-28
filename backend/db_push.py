from database.init_database import engine
from database.models.FileModel import Base
from service.logging_config import logger

def db_push():
    Base.metadata.create_all(bind=engine)

db_push()