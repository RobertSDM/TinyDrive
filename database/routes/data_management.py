from flask import Blueprint, request, Response
from service.save import save_file
from service.find_data import get_files_with_no_parent
import json

# Save, load, format data

route = Blueprint('data_management', __name__)

@route.post('/save/file')
async def save_file_route():
    body = request.json

    new_file  = await save_file(body['name'], body['type'], body['extension'], body['byteData'], body["byteSize"])

    if(new_file):
        return Response(new_file, status=200)
    else:
        return Response(new_file, status=500)


@route.get("/get_root_files")
async def get_root_files():
    files_and_folders = await get_files_with_no_parent()

    if(files_and_folders):
        return files_and_folders, 200
    else:   
        return [], 500
