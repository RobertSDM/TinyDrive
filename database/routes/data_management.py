# from flask import Blueprint, request, Response
from fastapi import APIRouter, Response
from service.save import save_file
from service.find_data import get_files_with_no_parent
import json
from service.decorator import time_spent

# Save, load, format data

route = APIRouter()

@route.get("/get_root_files", status_code=200)
@time_spent
async def get_root_files():
    files_and_folders = await get_files_with_no_parent()

    if(files_and_folders):
        return Response(json.dumps(files_and_folders), status_code=200)
    else:   
        return Response(json.dumps([]), status_code=500)

@route.post('/save/file')
async def save_file_route(file, response: Response):
    new_file  = await save_file(file.name, file.type, file.extension, file.byteData, file.byteSize)

    if(new_file):
        return new_file
    else:
        return new_file



