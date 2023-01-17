import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useFormik } from 'formik';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';

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
    const [furniture, setFurniture] = useState(null);
    const [progressspinner, setProgressspinner] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [viewMode, setViewMode] = useState(0);
    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        getApi();
    }, [])

    // === formik validation === ===
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            date: null,
            country: null,
            accept: false
        },
        validate: (data) => {
            let errors = {};

            if (!data.name) {
                errors.name = 'Name is required.';
            }

            if (!data.email) {
                errors.email = 'Email is required.';
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Invalid email address. E.g. example@email.com';
            }

            if (!data.password) {
                errors.password = 'Password is required.';
            }

            if (!data.accept) {
                errors.accept = 'You need to agree to the terms and conditions.';
            }

            return errors;
        },
        onSubmit: (data) => {
            registrationForm(data);
            setShowMessage(true);
            formik.resetForm();
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const searchFormik = useFormik({
        initialValues: {
            name: '',
        },
        validate: (data) => {
            let errors = {};

            return errors;
        },
        onSubmit: (data) => {
            getApi(data.name);
            console.log("search formik>>", data.name)
        }
    });
    const isSearchFormFieldValid = (name) => !!(searchFormik.touched[name] && searchFormik.errors[name]);
    const getSearchFormErrorMessage = (name) => {
        return isSearchFormFieldValid(name) && <small className="p-error">{searchFormik.errors[name]}</small>;
    };


    // === === get API call === === === ===
    const getApi = async (data) => {
        setProgressspinner(true);

        await axios
            .get(`https://dummyjson.com/products?limit=100`)
            .then((res) => {
                const dt = res.data.products;
                const fdt = dt.filter((item) => {
                    if (item.brand == data) {
                        return item
                    }
                })
                setFilteredData(fdt);

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

    // === === show message === ===
    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;

    // === === login form === ===
    const registrationForm = () => {
        return (
            <div className="form-demo mt-5">
                <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                    <div className="flex align-items-center flex-column pt-6 px-3">
                        <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                        <h5>Registration Successful!</h5>
                        <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                            Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData.email}</b> for activation instructions.
                        </p>
                    </div>
                </Dialog>

                <div className="flex justify-content-center mx-3 px-3">
                    <div className="card">
                        <h5 className="text-center my-2">Register</h5>
                        <form onSubmit={formik.handleSubmit} className="p-fluid">
                            <div className="field mt-4 mx-3">
                                <span className="p-float-label">
                                    <InputText
                                        id="name"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })}
                                    />
                                    <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>Name*</label>
                                </span>
                                {getFormErrorMessage('name')}
                            </div>
                            <div className="field mt-4 mx-3">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope" />
                                    <InputText
                                        id="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('email') })}
                                    />
                                    <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>Email*</label>
                                </span>
                                {getFormErrorMessage('email')}
                            </div>
                            <div className="field mt-4 mx-3">
                                <span className="p-float-label">
                                    <Password
                                        id="password"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        toggleMask
                                        className={classNames({ 'p-invalid': isFormFieldValid('password') })}
                                    //    header={passwordHeader} 
                                    //    footer={passwordFooter} 
                                    />
                                    <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Password*</label>
                                </span>
                                {getFormErrorMessage('password')}
                            </div>
                            <div className="field mt-4 mx-3">
                                <span className="p-float-label">
                                    <Calendar
                                        id="date"
                                        name="date"
                                        value={formik.values.date}
                                        onChange={formik.handleChange}
                                        dateFormat="dd/mm/yy"
                                        mask="99/99/9999"
                                        showIcon
                                    />
                                    <label htmlFor="date">Birthday</label>
                                </span>
                            </div>
                            {/* <div className="field mt-4 mx-3">
                                <span className="p-float-label">
                                    <Dropdown
                                        id="country"
                                        name="country"
                                        value={formik.values.country}
                                        onChange={formik.handleChange}
                                        // options={countries}
                                        optionLabel="name"
                                    />
                                    <label htmlFor="country">Country</label>
                                </span>
                            </div> */}
                            <div className="field-checkbox mt-4 mx-3 ">
                                <Checkbox
                                    inputId="accept"
                                    name="accept"
                                    checked={formik.values.accept}
                                    onChange={formik.handleChange}
                                    className={classNames({ 'p-invalid': isFormFieldValid('accept') })}
                                />
                                <label htmlFor="accept" className={classNames({ 'p-error mx-2': isFormFieldValid('accept mx-2') })}>I agree to the terms and conditions*</label>
                            </div>
                            <div className='mx-3 '>
                                <Button
                                    type="submit"
                                    label="Submit"
                                    className="p-button-raised p-button-primary my-2 mx-2"
                                />
                                <Button
                                    type="cancel"
                                    label="Cancel"
                                    onClick={() => setViewMode(0)}
                                    className="p-button-outlined p-button-raised p-button-secondary my-2 mx-2"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    // === === show success message === ===
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
            <Button
                label={count}
                icon="pi pi-shopping-cart"
                className='mx-2'
                onClick={() => {
                    setViewMode(1);
                }}
            />
            <form onSubmit={searchFormik.handleSubmit}>
                <InputText
                    id='name'
                    placeholder="Search"
                    type="text"
                    value={searchFormik.values.name}
                    onChange={(e) => {
                        searchFormik.handleChange(e);
                    }}
                />
            </form>
        </div>
    );




    return (
        <>

            <div>
                {viewMode === 1 ? (
                    <div className='row justify-content-center'>
                        <div className='col-sm-12 col-md-6 col-lg-6'>
                            {registrationForm()}
                        </div>
                    </div>
                ) : (
                    <div className=''>
                        <Toast ref={toast} />
                        <div className="" style={{ width: "100%", position: "fixed", top: "0", zIndex: "5" }}>
                            <Menubar model={items} start={start} end={end} />
                        </div>

                        {filteredData === undefined || filteredData === null || filteredData.length === 0 ?
                            <div>
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
                                                    <Button
                                                        label="Buy Now"
                                                        className="p-button-rounded p-button-success"
                                                        onClick={() => {
                                                            setViewMode(1);
                                                        }}
                                                    />  &emsp;
                                                    <Button
                                                        label="Add to Cart"
                                                        className="p-button-rounded p-button-warning"
                                                        onClick={() => {
                                                            showSuccess();
                                                            setCount(() => count + 1)
                                                        }} />
                                                </p>
                                            </div>
                                        </div>
                                    )) : "Mobiles not available."}
                                </div>
                                {progressspinner === true ? (<ProgressSpinner />) : ""}
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
                                                    <Button
                                                        label="Buy Now"
                                                        className="p-button-rounded p-button-success"
                                                        onClick={() => {
                                                            setViewMode(1);
                                                        }}
                                                    />  &emsp;
                                                    <Button
                                                        label="Add to Cart"
                                                        className="p-button-rounded p-button-warning"
                                                        onClick={() => {
                                                            showSuccess();
                                                            setCount(() => count + 1)
                                                        }} />
                                                </p>
                                            </div>
                                        </div>
                                    )) : "Mobiles not available."}
                                </div>
                                {progressspinner === true ? (<ProgressSpinner />) : ""}
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
                                                    <Button
                                                        label="Buy Now"
                                                        className="p-button-rounded p-button-success"
                                                        onClick={() => {
                                                            setViewMode(1);
                                                        }}
                                                    />  &emsp;
                                                    <Button
                                                        label="Add to Cart"
                                                        className="p-button-rounded p-button-warning"
                                                        onClick={() => {
                                                            showSuccess();
                                                            setCount(() => count + 1)
                                                        }} />
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
                                                    <Button
                                                        label="Buy Now"
                                                        className="p-button-rounded p-button-success"
                                                        onClick={() => {
                                                            setViewMode(1);
                                                        }}
                                                    />  &emsp;
                                                    <Button
                                                        label="Add to Cart"
                                                        className="p-button-rounded p-button-warning"
                                                        onClick={() => {
                                                            showSuccess();
                                                            setCount(() => count + 1)
                                                        }} />
                                                </p>
                                            </div>
                                        </div>
                                    )) : "Mobiles not available."}
                                </div>
                                {progressspinner === true ? (<ProgressSpinner />) : ""}
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
                                                    <Button
                                                        label="Buy Now"
                                                        className="p-button-rounded p-button-success"
                                                        onClick={() => {
                                                            setViewMode(1);
                                                        }}
                                                    />  &emsp;
                                                    <Button
                                                        label="Add to Cart"
                                                        className="p-button-rounded p-button-warning"
                                                        onClick={() => {
                                                            showSuccess();
                                                            setCount(() => count + 1)
                                                        }} />
                                                </p>
                                            </div>
                                        </div>
                                    )) : "Mobiles not available."}
                                </div>
                                {progressspinner === true ? (<ProgressSpinner />) : ""}
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
                                                    <Button
                                                        label="Buy Now"
                                                        className="p-button-rounded p-button-success"
                                                        onClick={() => {
                                                            setViewMode(1);
                                                        }}
                                                    />  &emsp;
                                                    <Button
                                                        label="Add to Cart"
                                                        className="p-button-rounded p-button-warning"
                                                        onClick={() => {
                                                            showSuccess();
                                                            setCount(() => count + 1)
                                                        }} />
                                                </p>
                                            </div>
                                        </div>
                                    )) : "Mobiles not available."}
                                </div>
                                {progressspinner === true ? (<ProgressSpinner />) : ""}
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
                                                    <Button
                                                        label="Buy Now"
                                                        className="p-button-rounded p-button-success"
                                                        onClick={() => {
                                                            setViewMode(1);
                                                        }}
                                                    />  &emsp;
                                                    <Button
                                                        label="Add to Cart"
                                                        className="p-button-rounded p-button-warning"
                                                        onClick={() => {
                                                            showSuccess();
                                                            setCount(() => count + 1)
                                                        }} />
                                                </p>
                                            </div>
                                        </div>
                                    )) : "Mobiles not available."}
                                </div>
                            </div>

                            : (
                                <div className='row mx-1' style={{ marginTop: "5rem" }}>
                                    {filteredData.map((item) => (
                                        <div>
                                            <p className='mx-3 my-2'> <strong>Result found</strong> </p>
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
                                                        <Button
                                                            label="Buy Now"
                                                            className="p-button-rounded p-button-success"
                                                            onClick={() => {
                                                                setViewMode(1);
                                                            }}
                                                        />  &emsp;
                                                        <Button
                                                            label="Add to Cart"
                                                            className="p-button-rounded p-button-warning"
                                                            onClick={() => {
                                                                showSuccess();
                                                                setCount(() => count + 1)
                                                            }} />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                    </div>

                )}
            </div>
        </>
    )
}

export default LandingPage;