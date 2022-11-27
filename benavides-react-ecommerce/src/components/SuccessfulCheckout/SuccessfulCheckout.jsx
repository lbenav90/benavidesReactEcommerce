import { Navigate, useLocation } from "react-router-dom"
import CheckoutTable from "../Cart/CheckoutTable/CheckoutTable";
import Transferdata from "../Checkout/TransferData/Transferdata";
import './SuccessfulCheckout.css'

const SuccessfulCheckout = () => {
    const props = useLocation();
    
    if (!props.state) {
        return <Navigate to='/' />
    }

    return (
        <div className="successful-div">
            <p className="success-title">Compra exitosa!</p>
            {/* Cambiar el purchase number para que no este hardcodeado y este en le oredn subida a firebase */}
            <p className="buyer-name">Hola { props.state.dataForm.name }!</p>
            <p className="purchase-number">Su número de pedido es #54235</p>
            {(props.state.paymentRadio === 'transfer')?
                <>
                    <p className="success-info">Usted eligió pago por transferencia</p>
                    <p className="success-info">Para confirmar la compra, enviar el comprobante de transferencia a compras@mondrian.com.ar</p>
                    <Transferdata />
                </>
            :
                <>
                    <p className="success-info">El pago fue exitoso y la compra quedó confirmada</p>
                    <p className="success-info">Puede pasar a retirarlo por el local situado en Av. Maipu, 1653, Olivos</p>
                </>
            }
            <div className="checkout-table success">
                <p className="success-table-title">Detalle de la compra:</p>
                <CheckoutTable items={props.state.cartList} type='summary'/>
            </div>
        </div>
    )
}

export default SuccessfulCheckout