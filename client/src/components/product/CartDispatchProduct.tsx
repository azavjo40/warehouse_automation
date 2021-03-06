import React, { useState } from "react"
import { IFormPropsDispatchProduct } from "../../interface/product"
import { useSelector } from "react-redux"
export const CartDispatchProduct: React.FC<IFormPropsDispatchProduct> = ({
  dispatchHandler,
  storage,
}) => {
  const clerForm = useSelector((state: any) => state.generals.clearForm)
  const [form, setForm] = useState({
    purveyor: "www ua be co",
    driver: "",
    product_name: "",
    type_commodity: "",
    quantity: "",
    product_namber: "",
    sender_product: "",
    userId: "",
  })

  const changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      product_namber: JSON.stringify(Date.now()),
      userId: storage.userId,
      sender_product: `${storage.position}: ${storage.name}`,
    })
  }

  const autoRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatchHandler(form)
    clerForm &&
      setTimeout(() => {
        setForm({
          purveyor: "www ua be co",
          driver: "",
          product_name: "",
          type_commodity: "",
          quantity: "",
          product_namber: "",
          sender_product: "",
          userId: "",
        })
      }, 2000)
  }

  return (
    <div>
      <form className='col s12' onSubmit={autoRegister}>
        <div className='row'>
          <div className='input-field col s6'>
            <input
              placeholder='Purveyor company'
              type='text'
              className='validate'
              required
              name='purveyor'
              value={form.purveyor}
              onChange={changehandler}
            />
          </div>

          <div className='input-field col s6'>
            <input
              type='text'
              className='validate'
              placeholder='Driver name'
              required
              name='driver'
              value={form.driver}
              onChange={changehandler}
            />
          </div>
        </div>

        <div className='row'>
          <div className='input-field col s6'>
            <input
              type='text'
              className='validate'
              placeholder='Type commodity'
              required
              name='type_commodity'
              value={form.type_commodity}
              onChange={changehandler}
            />
          </div>

          <div className='input-field col s6'>
            <input
              placeholder='Product name'
              type='text'
              className='validate'
              required
              name='product_name'
              value={form.product_name}
              onChange={changehandler}
            />
          </div>
        </div>

        <div className='row'>
          <div className='input-field col s6'>
            <input
              placeholder='Quantity'
              type='text'
              className='validate'
              required
              name='quantity'
              value={form.quantity}
              onChange={changehandler}
            />
          </div>

          <div className='input-field col s6'>
            <input
              type='text'
              className='validate'
              placeholder='Product namber'
              required
              name='product_namber'
              value={form.product_namber}
              onChange={changehandler}
            />
          </div>
        </div>

        <button
          className='btn waves-effect waves-light right'
          type='submit'
          name='action'
        >
          Submit
          <i className='material-icons right'>send</i>
        </button>
      </form>
    </div>
  )
}
