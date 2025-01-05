import socketio

mgr = socketio.RedisManager('redis://')
sio = socketio.AsyncServer(
    async_mode="asgi", client_manager=mgr, cors_allowed_origins="*"
)


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
