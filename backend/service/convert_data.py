from service.logging_config import logger
import base64, math

def add_sufix_to_bytes(byte_size: int):
    prefix = ["b","Kb","Mb", "Gb"]

    pos_prefix = 0
    devided_byte = byte_size

    logger.info(byte_size)

    while devided_byte >= 1024 and pos_prefix < len(prefix) - 1:
        devided_byte /= 1024
        pos_prefix += 1

        logger.info(devided_byte)
    logger.info(prefix[pos_prefix])

    return f"{math.ceil(devided_byte)}{prefix[pos_prefix]}"

def get_bytes_data(byte_data):
    base64_data =  base64.b64decode(byte_data)
    return base64_data
