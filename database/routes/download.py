# Route to request a download for a file, or paste

import json
from fastapi import APIRouter, Response
from fastapi.responses import StreamingResponse
# from flask import Blueprint, send_file
from service.find_data import find_by_file_id
import io
import base64

route = APIRouter()


def get_bytes_data(byte_data):
    base64_data =  base64.b64decode(byte_data)
    return base64_data

@route.get("/download/{id}")
async def download(id: str):
    data = await find_by_file_id(id)
    byte_data = get_bytes_data(data["byteData"])
    formated_byte_data = io.BytesIO(byte_data)

    return StreamingResponse(
        formated_byte_data,
        media_type="application/octet-stream",
        headers={
            "Content-Disposition": f"attachment; filename={data['name'] + data['extension']}"
        }
    )
