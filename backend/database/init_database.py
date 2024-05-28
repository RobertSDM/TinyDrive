import os
import sqlalchemy as sa
from sqlalchemy.orm import declarative_base, sessionmaker
from contextlib import contextmanager

engine = sa.create_engine(os.environ.get("DATABASE_URL"))
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
