import os
import sqlalchemy as sa
from sqlalchemy.orm import declarative_base, sessionmaker
from service.logging_config import logger 
import dotenv

engine = sa.create_engine(
     os.environ.get("DATABASE_URL"), 
     pool_size=10,
     max_overflow=20,
     pool_timeout=30,
     pool_recycle=1800
    )

Base = declarative_base()

Session = sessionmaker(engine)

def get_session():
        session = Session()
        try:
            yield session
            session.commit()
        except:
            session.rollback()
            raise
        finally:
            session.close()
