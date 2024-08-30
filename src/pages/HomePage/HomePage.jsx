import React from 'react'
import flatLogo from '../../illustration/flat.png'
import s from './HomePage.module.css'
import { Button } from '@chakra-ui/react'
import { EditIcon, ChatIcon, WarningIcon, CalendarIcon, ViewIcon, LinkIcon, PlusSquareIcon, BellIcon } from '@chakra-ui/icons'

function HomePage() {
  return (
    <main className='content wrapper'>
      <div className={s.homeFirstBlock}>
        <img src={flatLogo} alt="image" width={200} />
        <div className={s.titleBlock}>
          <div className={s.title}>
            Удобно<br /> и комфортно
          </div>
          <p>Коммуникация между жителями и<br /> управляющими компаниями еще<br /> не была настолько удобной!</p>
        </div>
      </div>
      <div className={s.homeSecondBlock}>
        <div className={s.homeSecondBlockLeft}>
          <div className={s.leftButtonUp}>
            <Button leftIcon={<EditIcon boxSize={6} />}>
              Внести показания счетчиков
            </Button>
            <Button leftIcon={<CalendarIcon boxSize={6} />}>
              Электронная квитанция ЖКХ
            </Button>
            <Button leftIcon={<BellIcon boxSize={6} />}>
              Оплатить услуги ЖКХ
            </Button>
          </div>
          <div className={s.leftButtonDown}>
            <Button leftIcon={<ViewIcon boxSize={6} />}>
              Видеонаблюдение онлайн
            </Button>
          </div>
        </div>
        <div className={s.homeSecondBlockRight}>
          <div className={s.rightButtonUp}>
            <Button leftIcon={<PlusSquareIcon boxSize={6} />}>
              Список домов
            </Button>
            <Button leftIcon={<LinkIcon boxSize={6} />}>
              Управляющие компании
            </Button>
          </div>
          <div className={s.rightButtonDown}>
            <Button leftIcon={<WarningIcon boxSize={6} />}>
              Заявить о проблеме
            </Button>
            <Button leftIcon={<ChatIcon boxSize={6} />}>
              Онлайн-собрание жильцов
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default HomePage
