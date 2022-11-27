import { useCartContext } from "../../context/CartContext"
import CheckoutTable from "../Cart/CheckoutTable/CheckoutTable"
import { Navigate, Link, useNavigate } from "react-router-dom";
import './Checkout.css'
import { useState } from "react";
import Transferdata from "./TransferData/Transferdata";
import { paymentSimulator, uploadOrder } from "../../utils/functions";


const Checkout = () => {
    const { cartList, totalCheckout, deleteAllItems } = useCartContext();
    const [ dataForm, setDataForm ] = useState({
        name: '',
        phone: '',
        email: '',
        reEmail: ''
    })

    const [paymentForm, setPaymentForm] = useState({
        cardNumber: '',
        cardHolder: '',
        cardDocument: '',
        cardExpMonth: '',
        cardExpYear: '',
        cardSecurity: ''
    })

    const [ paymentRadio , setPaymentRadio ] = useState('transfer')
    const [ alerts, setAlerts ] = useState([])
    const navigate = useNavigate();

    const createOrder = (event) => {

        event.preventDefault();
        setAlerts([]);

        if (dataForm.email != dataForm.reEmail) {
            setAlerts([...alerts, 'Confirmación de email fallida'])
            return false;
        }
        
        // Chequear stock al poner la orden
        if (paymentRadio === 'transfer'){
            uploadOrder(dataForm, cartList.map(({ id, name, price }) => ({ id, name, price })), totalCheckout, 'transfer')
                .then(() => {
                    navigate('/success', {state: {dataForm, cartList, paymentRadio }})
                    deleteAllItems('success')
                })
            } else {
                paymentSimulator(paymentForm)
                .then((result) => {
                    uploadOrder(dataForm, cartList.map(({ id, name, price }) => ( { id, name, price } )), totalCheckout, 'card')
                    .then(() => {
                        navigate('/success', {state: {dataForm, cartList, paymentRadio }})
                        deleteAllItems('success')
                    })
            })
            .catch((error) => {
                    setAlerts([...alerts, error])
            })
        }
    }

    const handleRadioChange = (event) => {
        setPaymentRadio(event.target.value)
        setPaymentForm({
            cardNumber: '',
            cardHolder: '',
            cardDocument: '',
            cardExpMonth: '',
            cardExpYear: '',
            cardSecurity: ''
        })
    }

    const handlePaymentInputs = (event) => {
        // Valida el ingreso numérico del codigo de seguridad
        if (event.target.name === 'cardSecurity' && !(/^\d+$/.test(event.target.value) || event.target.value === '' )) { return false; }

        setPaymentForm({
            ...paymentForm,
            [event.target.name]: event.target.value
        })
    }

    const handleInputs = (event) => {
        setDataForm({ 
            ...dataForm, 
            [event.target.name]: event.target.value })
    }

    const months = Array(12).fill('').map((el, ind) => ind + 1)
    const now = new Date().getFullYear()
    const years = Array(20).fill('').map((el, ind) =>  now + ind )

    return (
    (cartList.length == 0)?
    <Navigate to='/cart' />
    :
    <div className="checkout-page">
        <h1>Finalizar la compra</h1>
        <div className="checkout-table">
            <CheckoutTable type='summary'/>
        </div>
        {/* Mover todo el form a otro componente asi no se recarga toda la pagina cuando modifico */}
        <form onSubmit={createOrder} className='checkout-form'>
            <div className="userdata-form form-box">
                <p className="form-title">Ingrese sus datos personales: </p>
                <input type='text' name='name' onChange={handleInputs} value={dataForm.name} placeholder='Ingrese su nombre' required />
                <input type='text' name='phone' onChange={handleInputs} value={dataForm.phone} placeholder='Ingrese su teléfono' required />
                <input type='text' name='email' onChange={handleInputs} value={dataForm.email} placeholder='Ingrese su email' required />
                <input type='text' name='reEmail' onChange={handleInputs} value={dataForm.reEmail} placeholder='Reingrese su email' required />
            </div>
            <div className="payment-form form-box">
                <p className='form-title'>Ingrese la información de pago:</p>
                <div className="payment-radios">
                    <label><input type='radio' onChange={handleRadioChange} name='payment-type' value='transfer' checked={paymentRadio === 'transfer'}/>Transferencia</label>
                    <label><input type='radio' onChange={handleRadioChange} name='payment-type' value='card' checked={paymentRadio === 'card'}/>Tarjeta de débito/crédito</label>
                </div>
                {(paymentRadio === 'transfer')? 
                    <Transferdata /> :
                    <>
                        <input type='number' name='cardNumber' onChange={handlePaymentInputs} value={paymentForm.cardNumber} placeholder='Número de tarjeta' required />
                        <input type='text' name='cardHolder' onChange={handlePaymentInputs} value={paymentForm.cardHolder} placeholder='Nombre completo del titular' required />
                        <input type='number' name='cardDocument' onChange={handlePaymentInputs} value={paymentForm.cardDocument} placeholder='Número de documento del titular' required />
                        <div className="exp-date">
                            <select name='cardExpMonth' onChange={handlePaymentInputs} value={paymentForm.cardExpMonth} placeholder='Mes'>
                                { months.map((el) => <option key={el} value={el}>{el}</option>)}
                            </select>
                            <select name='cardExpYear' onChange={handlePaymentInputs} value={paymentForm.cardExpYear} placeholder='Año'>
                                { years.map((el) => <option key={el} value={el}>{el}</option>)}
                            </select>
                        </div>
                        <input type='password' name='cardSecurity' onChange={handlePaymentInputs} value={paymentForm.cardSecurity} placeholder='Número de seguridad' required />
                    </>
                }
            </div>
            <div className="form-buttons">
                <Link to='/' className="volver">Seguir comprando</Link>
                <input type='submit' value='Hacer pedido'/>
            </div>
            { (alerts.length != 0) && 
                <div className="alerts">
                    { alerts.map((alert) => <p className="checkout-alert" key={alert}>{ alert }</p>)}   
                </div>
            }
        </form>
           
    </div>
)
}

export default Checkout