from service.convert_data import add_sufix_to_bytes
from database.repository.FileRepository import save_file as fs
from database.repository.FileRepository import find_by_file_id_download
from service.convert_data import get_bytes_data
import io

def save_file(db, name,  extension, byteData, byteSize):
    formated_byteSize = add_sufix_to_bytes(byteSize)
    new_file = fs(db, name, extension, byteData, byteSize, formated_byteSize)
    return new_file

def download_service(db, id):
    data = find_by_file_id_download(db, id)
    byte_data = get_bytes_data(data["byteData"])
    formated_byte_data = io.BytesIO(byte_data)
    return [data, formated_byte_data]