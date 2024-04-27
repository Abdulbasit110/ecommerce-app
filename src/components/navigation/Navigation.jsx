import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "../../App";
import ProductDetailPage from "../pages/Public/productDetail/productDetail";
import AddProductForm from "../form/addProductForm";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/product/:id",
        element: <ProductDetailPage />
    },
    {
        path: "/add-product",
        element: <AddProductForm />
    },

]);

function Navigation() {
    return (
        <RouterProvider router={router} />
    )
}

export default Navigation