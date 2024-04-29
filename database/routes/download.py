# Route to request a download for a file, or paste

import json
from flask import Blueprint, send_file
from service.find_data import find_by_file_id
import io
import base64
import array

route = Blueprint("download", __name__)

def get_bytes_data(byte_data):
    base64_data =  base64.b64decode(byte_data)
    return base64_data

@route.get("/download/<id>")
async def download(id):
    data = await find_by_file_id(id)
    byte_data = get_bytes_data(data["byteData"])

    return send_file(
        io.BytesIO(byte_data),
        as_attachment=True,
        mimetype="application/octet-stream",
        download_name= data["name"] + "" + data["extension"]
    )
