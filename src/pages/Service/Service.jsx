import React from 'react'
import {
    serviceList
} from '../../api/index'

function Service() {
  return (
    <main className='content'>
        <div className='wrapper'>
            <table className='service-table'>
                <tr>
                    <th></th>
                    <th>Услуги</th>
                    <th></th>
                </tr>
                <tr>
                    <th>Название</th>
                    <th>Описание услуги</th>
                    <th>Цена</th>
                </tr>
                {
                    serviceList.map((item, i) => {
                        return <tr>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                        </tr>
                    })
                }
            </table>
        </div>
    </main>
  )
}

export default Service
