from flask import Blueprint, request, Response
from service.save import save_file

# Save, load, format data

route = Blueprint('data_management', __name__)

@route.post('/save/file')
async def save_file_route():
    body = request.json

    new_file  = await save_file(body['name'], body['type'], body['extension'], body['byteData'])

    return Response(status=200)
