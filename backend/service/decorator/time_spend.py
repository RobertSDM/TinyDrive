from functools import wraps
import time

def time_spent(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()

        result = func(*args, **kwargs)

        end = time.time()

        print("The time spend was: ", f"{end - start:.2}")
        return result
    return wrapper

def time_spend_sync(func):
    async def wrapper(*args, **kwargs):
        start = time.time()

        result = await func(*args, **kwargs)

        end = time.time()

        print("The time spend was: ", f"{end - start:.2}")
        return result
    return wrapper