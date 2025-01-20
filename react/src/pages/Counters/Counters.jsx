import React from 'react'
import s from './Counters.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'

import { Input } from '@chakra-ui/react'

function Counters() {

  return (
    <main className={s.content}>
      <div className='wrapper'>
        <div className='personalPage'>
          <div className='personalNav'>
            <NavPersonal />
          </div>
          <div className='personalContent'>
            <div className={s.title}>
              Передача показаний счетчиков
            </div>
            <div className={s.counters}>
              <p>C 20 по 25 число каждого месяца требуется отправлять показания счётчиков:</p>
              <form>
                <label>
                  Холодная вода:
                  <Input
                    // value={}
                    placeholder='Введите число'
                    size='md'
                  />
                </label>
                <label>
                  Горячая вода:
                  <Input
                    // value={}
                    placeholder='Введите число'
                    size='md'
                  />
                </label>
                <label>
                  Электричество:
                  <Input
                    // value={}
                    placeholder='Введите число'
                    size='md'
                  />
                </label>
                <button type='submit'>Отправить</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Counters
