import Navbar from "../components/Navbar"; // Update the path as necessary to correctly point to your Navbar file
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="mx-auto my-10">Home</div>
      {/* Any additional content for the Home page can go here */}
      <div
        style={{ maxWidth: "750px", minHeight: "200px" }}
        className="mx-auto mt-5"
      >
        <PayPalScriptProvider
          options={{ clientId: "test", components: "buttons", currency: "USD" }}
        >
          <ButtonWrapper showSpinner={false} />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}

// This value is from the props in the UI
const style = { layout: "vertical" };

function createOrder() {
  // replace this url with your server
  return fetch(
    "https://react-paypal-js-storybook.fly.dev/api/paypal/create-order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product ids and quantities
      body: JSON.stringify({
        cart: [
          {
            sku: "1blwyeo8",
            quantity: 2,
          },
        ],
      }),
    }
  )
    .then((response) => response.json())
    .then((order) => {
      // Your code here after create the order
      return order.id;
    });
}
function onApprove(data) {
  // replace this url with your server
  return fetch(
    "https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    }
  )
    .then((response) => response.json())
    .then((orderData) => {
      // Your code here after capture the order
    });
}

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner }) => {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style]}
        fundingSource={undefined}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </>
  );
};
