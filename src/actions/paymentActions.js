import axios from "axios";
import { toast } from "react-toastify";
import { createOrder } from "./orderActions";

const ServerBaseURI = process.env.REACT_APP_URI_SERVER_BASE_URL;

export const makePayment =
  (
    paymentBtnRef,
    navigate,
    user,
    shippingDetails,
    cart,
    stripe,
    elements,
    CardNumberElement
  ) =>
  async (dispatch) => {
    paymentBtnRef.current.disabled = true;

    const orderData = JSON.parse(
      sessionStorage.getItem("e-kart-order-summary")
    );

    const paymentData = {
      amount: Math.round(orderData.total * 100),
    };

    const order = {
      shippingDetails,
      orderItems: cart,
      itemsPrice: orderData.subtotal,
      taxPrice: orderData.gst,
      shippingPrice: orderData.shippingCharge,
      totalPrice: orderData.total,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${ServerBaseURI}/api/v1/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingDetails.address,
              city: shippingDetails.city,
              state: shippingDetails.state,
              postal_code: shippingDetails.pinCode,
              country: shippingDetails.country,
            },
          },
        },
      });

      if (result.error) {
        paymentBtnRef.current.disabled = false;

        toast.error(result.error.message, {
          toastId: result.error.message,
          position: "bottom-center",
        });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          order.paidAt = new Date(result.paymentIntent.created);

          //   on successful payment, creating an order
          dispatch(createOrder(order));

          toast.success("Payment Successful", {
            toastId: "pay-suc",
            position: "bottom-center",
          });

          navigate("/order/success");
        } else {
          toast.error("There's some issue while processing payment ", {
            toastId: "pay-proc-issue",
            position: "bottom-center",
          });
        }
      }
    } catch (err) {
      const { message } = err.response.data;
      toast.error(message, {
        toastId: message,
        position: "bottom-center",
      });

      paymentBtnRef.current.disabled = false;
    }
  };
