import React, { useState, useEffect, useRef } from 'react'
import * as ReactBootstrap from 'react-bootstrap'
import axios from 'axios';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';

const LandingPage = () => {
    const [apiData, setApiData] = useState(null);
    const [smrtPhone, setSmrtPhone] = useState(null);
    const toast = useRef(null);
    const [laptopData, setLaptopData] = useState(null);
    const [fregData, setFregData] = useState(null);
    const [skincareData, setSkincareData] = useState(null);
    const [grocerieData, setGrocerieData] = useState(null);
    const [homeDecoration, setHomeDecoration] = useState(null);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState(null);
    const [furniture, setFurniture] = useState(null);
    const [progressspinner, setProgressspinner] = useState(false);

    useEffect(() => {
        getApi();
    }, [])

    const getApi = async () => {
        setProgressspinner(true);
        await axios
            .get(`https://dummyjson.com/products?limit=100`)
            .then((res) => {
                const dt = res.data.products;
                setApiData(dt);
                const phones = dt.filter((item) => {
                    if (item.category === "smartphones") {
                        return item
                    }
                });
                setSmrtPhone(phones);
                const laptops = dt.filter((item) => {
                    if (item.category === "laptops") {
                        return item
                    }
                });
                setLaptopData(laptops);
                const fragrances = dt.filter((item) => {
                    if (item.category === "fragrances") {
                        return item
                    }
                })
                setFregData(fragrances);
                const skincare = dt.filter((item) => {
                    if (item.category === "skincare") {
                        return item
                    }
                });
                setSkincareData(skincare);
                const groceries = dt.filter((item) => {
                    if (item.category === "groceries") {
                        return item
                    }
                });
                setGrocerieData(groceries);
                const homeDecoration = dt.filter((item) => {
                    if (item.category === "home-decoration") {
                        return item
                    }
                });
                setHomeDecoration(homeDecoration);
                const furniture = dt.filter((item) => {
                    if (item.category === "furniture") {
                        return item
                    }
                });
                setFurniture(furniture);

                // console.log(laptops, "laptops");
                // console.log(dt, "dt");
                setProgressspinner(false);
            })
            .catch((err) => {
                console.log(err);
                setProgressspinner(false);
            })
    }

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Added', detail: 'Product successfully added to your cart.', life: 3000 });
    }


    const items = [
        {
            label: 'Products',
            // icon: 'pi pi-fw pi-file',
        },
    ];

    const start = <img alt="logo" src="logo1.jpeg" height="40" className="mr-2"></img>;
    const end = (
        <div className='d-flex'>
            <Button label={count} icon="pi pi-shopping-cart" className='mx-2' />
            <InputText placeholder="Search" type="text" value={search} onChange={(e) => {
                setSearch(e.value)
            }} />
        </div>
    );




    return (
        <div className=''>
            <Toast ref={toast} />
            <div className="" style={{ width: "100%", position: "fixed", top: "0", zIndex: "5" }}>
                <Menubar model={items} start={start} end={end} />
            </div>
            <div className='row mx-1' style={{ marginTop: "5rem" }}>
                <p className='mx-3 my-2'> <strong>Mobiles</strong> </p>
                {smrtPhone !== undefined && smrtPhone !== null ? smrtPhone.map((item) => (
                    <div className='col-sm-12 col-md-4 col-lg-4 shadow rounded my-2'>
                        <div className='imgDiv'>
                            <img src={item.images[0]} width={150} alt=""></img>
                        </div>
                        <div className='contentDiv'>
                            <p className='my-1'><span> <strong>{item.title}</strong> </span> &emsp; <span className='bg-success p-1 text-white rouned'>{item.rating} <i className="pi pi-star" /></span></p>
                            <p>{item.description}</p>
                            <p> <span className='bg-primary text-white p-1'><i className="pi pi-dollar" />{item.price}</span> &emsp; <span className='bg-info text-white p-1'>Discount: {item.discountPercentage}%</span> </p>
                            <p className='text-danger'>{item.stock < 50 ? "Hurry! Only a few items are left." : ""}</p>
                            <p>
                                <Button label="Buy Now" className="p-button-rounded p-button-success" />  &emsp;
                                <Button label="Add to Cart" className="p-button-rounded p-button-warning" onClick={() => {
                                    showSuccess();
                                    setCount(() => count + 1)
                                }} />
                            </p>
                        </div>
                    </div>
                )) : "Mobiles not available."}
            </div>
            <div className='row mx-1'>
                <p className='mx-3 my-2'> <strong>Laptops</strong> </p>
                {laptopData !== undefined && laptopData !== null ? laptopData.map((item) => (
                    <div className='col-sm-12 col-md-4 col-lg-4 shadow rounded my-2'>
                        <div className='imgDiv'>
                            <img src={item.images[0]} width={150} alt=""></img>
                        </div>
                        <div className='contentDiv'>
                            <p className='my-1'><span><strong>{item.title}</strong></span> &emsp; <span className='bg-success p-1 text-white rouned'>{item.rating} <i className="pi pi-star" /></span></p>
                            <p>{item.description}</p>
                            <p> <span className='bg-primary text-white p-1'><i className="pi pi-dollar" />{item.price}</span> &emsp; <span className='bg-info text-white p-1'>Discount: {item.discountPercentage}%</span> </p>
                            <p className='text-danger'>{item.stock < 50 ? "Hurry! Only a few items are left." : ""}</p>
                            <p>
                                <Button label="Buy Now" className="p-button-rounded p-button-success" />  &emsp;
                                <Button label="Add to Cart" className="p-button-rounded p-button-warning" onClick={showSuccess} />
                            </p>
                        </div>
                    </div>
                )) : "Mobiles not available."}
            </div>
            <div className='row mx-1'>
                <p className='mx-3 my-2'> <strong>Fragrances</strong> </p>
                {fregData !== undefined && fregData !== null ? fregData.map((item) => (
                    <div className='col-sm-12 col-md-4 col-lg-4 shadow rounded my-2'>
                        <div className='imgDiv'>
                            <img src={item.images[0]} width={150} alt=""></img>
                        </div>
                        <div className='contentDiv'>
                            <p className='my-1'><span><strong>{item.title}</strong></span> &emsp; <span className='bg-success p-1 text-white rouned'>{item.rating} <i className="pi pi-star" /></span></p>
                            <p>{item.description}</p>
                            <p> <span className='bg-primary text-white p-1'><i className="pi pi-dollar" />{item.price}</span> &emsp; <span className='bg-info text-white p-1'>Discount: {item.discountPercentage}%</span> </p>
                            <p className='text-danger'>{item.stock < 50 ? "Hurry! Only a few items are left." : ""}</p>
                            <p>
                                <Button label="Buy Now" className="p-button-rounded p-button-success" />  &emsp;
                                <Button label="Add to Cart" className="p-button-rounded p-button-warning" onClick={showSuccess} />
                            </p>
                        </div>
                    </div>
                )) : "Mobiles not available."}
            </div>
            {progressspinner === true ? (<ProgressSpinner />) : ""}
            <div className='row mx-1'>
                <p className='mx-3 my-2'> <strong>Skincare</strong> </p>
                {skincareData !== undefined && skincareData !== null ? skincareData.map((item) => (
                    <div className='col-sm-12 col-md-4 col-lg-4 shadow rounded my-2'>
                        <div className='imgDiv'>
                            <img src={item.images[0]} width={150} alt=""></img>
                        </div>
                        <div className='contentDiv'>
                            <p className='my-1'><span><strong>{item.title}</strong></span> &emsp; <span className='bg-success p-1 text-white rouned'>{item.rating} <i className="pi pi-star" /></span></p>
                            <p>{item.description}</p>
                            <p> <span className='bg-primary text-white p-1'><i className="pi pi-dollar" />{item.price}</span> &emsp; <span className='bg-info text-white p-1'>Discount: {item.discountPercentage}%</span> </p>
                            <p className='text-danger'>{item.stock < 50 ? "Hurry! Only a few items are left." : ""}</p>
                            <p>
                                <Button label="Buy Now" className="p-button-rounded p-button-success" />  &emsp;
                                <Button label="Add to Cart" className="p-button-rounded p-button-warning" onClick={showSuccess} />
                            </p>
                        </div>
                    </div>
                )) : "Mobiles not available."}
            </div>
            <div className='row mx-1'>
                <p className='mx-3 my-2'> <strong>Groceries</strong> </p>
                {grocerieData !== undefined && grocerieData !== null ? grocerieData.map((item) => (
                    <div className='col-sm-12 col-md-4 col-lg-4 shadow rounded my-2'>
                        <div className='imgDiv'>
                            <img src={item.images[0]} width={150} alt=""></img>
                        </div>
                        <div className='contentDiv'>
                            <p className='my-1'><span><strong>{item.title}</strong></span> &emsp; <span className='bg-success p-1 text-white rouned'>{item.rating} <i className="pi pi-star" /></span></p>
                            <p>{item.description}</p>
                            <p> <span className='bg-primary text-white p-1'><i className="pi pi-dollar" />{item.price}</span> &emsp; <span className='bg-info text-white p-1'>Discount: {item.discountPercentage}%</span> </p>
                            <p className='text-danger'>{item.stock < 50 ? "Hurry! Only a few items are left." : ""}</p>
                            <p>
                                <Button label="Buy Now" className="p-button-rounded p-button-success" />  &emsp;
                                <Button label="Add to Cart" className="p-button-rounded p-button-warning" onClick={showSuccess} />
                            </p>
                        </div>
                    </div>
                )) : "Mobiles not available."}
            </div>
            <div className='row mx-1'>
                <p className='mx-3 my-2'> <strong>Home Decoration</strong> </p>
                {homeDecoration !== undefined && homeDecoration !== null ? homeDecoration.map((item) => (
                    <div className='col-sm-12 col-md-4 col-lg-4I shadow rounded my-2'>
                        <div className='imgDiv'>
                            <img src={item.images[0]} width={150} alt=""></img>
                        </div>
                        <div className='contentDiv'>
                            <p className='my-1'><span><strong>{item.title}</strong></span> &emsp; <span className='bg-success p-1 text-white rouned'>{item.rating} <i className="pi pi-star" /></span></p>
                            <p>{item.description}</p>
                            <p> <span className='bg-primary text-white p-1'><i className="pi pi-dollar" />{item.price}</span> &emsp; <span className='bg-info text-white p-1'>Discount: {item.discountPercentage}%</span> </p>
                            <p className='text-danger'>{item.stock < 50 ? "Hurry! Only a few items are left." : ""}</p>
                            <p>
                                <Button label="Buy Now" className="p-button-rounded p-button-success" />  &emsp;
                                <Button label="Add to Cart" className="p-button-rounded p-button-warning" onClick={showSuccess} />
                            </p>
                        </div>
                    </div>
                )) : "Mobiles not available."}
            </div>
            <div className='row mx-1'>
                <p className='mx-3 my-2'> <strong>Furniture</strong> </p>
                {furniture !== undefined && furniture !== null ? furniture.map((item) => (
                    <div className='col-sm-12 col-md-4 col-lg-4I shadow rounded my-2'>
                        <div className='imgDiv'>
                            <img src={item.images[0]} width={150} alt=""></img>
                        </div>
                        <div className='contentDiv'>
                            <p className='my-1'><span><strong>{item.title}</strong></span> &emsp; <span className='bg-success p-1 text-white rouned'>{item.rating} <i className="pi pi-star" /></span></p>
                            <p>{item.description}</p>
                            <p> <span className='bg-primary text-white p-1'><i className="pi pi-dollar" />{item.price}</span> &emsp; <span className='bg-info text-white p-1'>Discount: {item.discountPercentage}%</span> </p>
                            <p className='text-danger'>{item.stock < 50 ? "Hurry! Only a few items are left." : ""}</p>
                            <p>
                                <Button label="Buy Now" className="p-button-rounded p-button-success" />  &emsp;
                                <Button label="Add to Cart" className="p-button-rounded p-button-warning" onClick={showSuccess} />
                            </p>
                        </div>
                    </div>
                )) : "Mobiles not available."}
            </div>
        </div >
    )
}

export default LandingPage;