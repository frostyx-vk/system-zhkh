import socketio
from aiohttp import web

app = web.Application()
mgr = socketio.AsyncRedisManager('redis://')
# sio = socketio.Server(async_mode='threading', cors_allowed_origins='*')
sio = socketio.AsyncServer(
    client_manager=mgr, cors_allowed_origins="*"
)
# sio.attach(app)


@sio.event
async def connect(sid, environ):
    print(f'Клиент - {sid} подключен к общей комнате')
    await  sio.enter_room(sid, 'common_room')

@sio.event
async def disconnect(sid):
    print(f'Клиент - {sid} покинул комнату')
    await sio.leave_room(sid, 'common_room')

@sio.event
async def message(sid, data):
    print(f'Получено новое сообщение от {sid}: {data}')
    await sio.emit('message', data=data, room='common_room', skip_sid=sid)


if __name__ == '__main__':
    web.run_app(app, port=8005)