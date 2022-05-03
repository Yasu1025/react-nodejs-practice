import { VFC, memo, useEffect, useState } from 'react'
import { AWrapper } from '../../components/layouts/AWrapper'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Paginator } from '../../components/Paginator'
import { Order } from '../../models/Order'
import { OrderItem } from '../../models/OrderItem'

const hideStyle = {
  maxHeight: 0,
  transition: '400ms ease-in',
}
const showStyle = {
  maxHeight: '150px',
  transition: '400ms ease-out',
}

export const Orders: VFC = memo(() => {
  const [orders, setOrders] = useState<Order[]>([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(0)
  const [selectedOrder, setSelectedOrder] = useState<number[]>([])

  const onToggleOrder = (id: number) => {
    if (selectedOrder.some(o => o === id)) {
      setSelectedOrder(selectedOrder.filter(o => o !== id))
      return
    }
    setSelectedOrder([...selectedOrder, id])
  }

  const onExportCSV = async () => {
    const { data } = await axios.post(
      '/api/orders/export',
      {},
      {
        responseType: 'blob',
      }
    )
    const blob = new Blob([data], { type: 'text/csv' })
    const url = window.URL.createObjectURL(data)
    const link = document.createElement('a')
    link.href = url
    link.download = 'orders.csv'
    link.click()
  }

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get(`/api/orders?page=${page}`)

      setOrders(data.data)
      setLastPage(data.meta.last_page)
    }
    getUsers()
  }, [page])

  return (
    <AWrapper>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={onExportCSV}
        >
          Export CSV
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => (
              <>
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => onToggleOrder(order.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={5}>
                    <div
                      className="overflow-hidden"
                      style={
                        selectedOrder.some(o => o === order.id)
                          ? showStyle
                          : hideStyle
                      }
                    >
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.order_items.map((item: OrderItem) => (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.product_name}</td>
                              <td>{item.quantity}</td>
                              <td>{item.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>

      <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
    </AWrapper>
  )
})
