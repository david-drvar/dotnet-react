import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { BasketItem } from "../../app/models/Basket";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { removeItem, setBasket } from "../basket/basketSlice";

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const { basket } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const [item, setItem] = useState<BasketItem>();
    //quantity ??

    useEffect(() => {
        agent.Catalog.details(parseInt(id!)) //axios.get(`http://localhost:5000/api/products/${id}`)
            .then(response => setProduct(response))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
        setItem(basket?.items.find((item) => item.productId === product?.id));
    }, [basket?.items, id, product?.id])

    function handleInputChange(event: any) {
        if (event.target.value >= 0)
            setItem(prevState => {
                return { ...prevState!, quantity: parseInt(event.target.value) }
            })
    }

    function handleUpdateCart() {
        setLoadingSubmit(true);
        const ogBasketItem = basket?.items.find((item) => item.productId === product?.id);
        console.log(ogBasketItem);
        console.log(item);
        if (item?.quantity === undefined) { //on button press without changing anything
            setLoadingSubmit(false);
            return;
        }
        else if (ogBasketItem === undefined || item?.quantity > ogBasketItem.quantity) { //if there is not item in the basket or there is and the quantity is greater
            agent.Basket.addItem(product?.id!, item?.quantity).then((basket) => dispatch(setBasket(basket))).then(() => toast.success("Success")).catch(err => console.log(err)).finally(() => setLoadingSubmit(false));
        }
        else if (item?.quantity === ogBasketItem.quantity) { //if the quantity remained the same
            setLoadingSubmit(false);
            return;
        }
        else if (item?.quantity === 0) { //if quantity is 0 then the user wants to remove the item from the basket so the full item quantity is sent
            agent.Basket.removeItem(product?.id!, ogBasketItem.quantity).then(() => dispatch(removeItem({productId: product?.id!,quantity: ogBasketItem.quantity}))).then(() => toast.success("Success")).catch(err => console.log(err)).finally(() => setLoadingSubmit(false));
        }
        else {
            agent.Basket.removeItem(product?.id!, item?.quantity).then(() => dispatch(removeItem({productId: product?.id!,quantity: item?.quantity}))).then(() => toast.success("Success")).catch(err => console.log(err)).finally(() => setLoadingSubmit(false));
        }
    }

    if (loading) return <LoadingComponent />
    if (!product) return <NotFound />

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant='h4'>{currencyFormat(product.price)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6} >
                        <TextField variant="outlined" type='number' label='Quantity in Cart' onChange={handleInputChange} fullWidth value={item?.quantity ?? 0} />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton onClick={handleUpdateCart} loading={loadingSubmit} disabled={item?.quantity === undefined} sx={{ height: '55px' }} color='primary' size='large' variant="contained" fullWidth>
                            {basket?.items.find((item) => item.productId === product?.id) ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}