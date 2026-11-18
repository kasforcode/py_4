import asyncio

from fastapi import FastAPI
from sse_starlette.sse import EventSourceResponse

app = FastAPI()


async def event_generator():
    for progress in (20, 40, 60, 80, 100):
        yield {"event": "progress", "data": str(progress)}
        await asyncio.sleep(1)
    yield {"event": "complete", "data": "complete"}


@app.get("/events")
async def events():
    return EventSourceResponse(event_generator())
