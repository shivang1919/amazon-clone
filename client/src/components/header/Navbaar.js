import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useContext } from 'react';
import "./navbaar.css";
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import Rightheader from './Rightheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';
const Navbaar = () => {
    const { account, setAccount } = useContext(LoginContext);
    const history = useNavigate("");

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [text, setText] = useState("");
    const [liopen, setLiopen] = useState(true);
    const { products } = useSelector(state => state.getproductsdata)
    const [dropen, setDropen] = useState(false)
    console.log(account);
    const getvaliduser = async () => {
        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json();
        // console.log(data);
        if (res.status !== 201) {
            console.log("user invalid")
        }
        else {
            console.log("data valid")
            setAccount(data)
        }
    }
    const handleopen = () => {
        setDropen(true)
    }
    const handleclose = () => {
        setDropen(false)
    }
    const logoutuser = async () => {
        const res2 = await fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data2 = await res2.json();
        // console.log(data);
        if (res2.status !== 201) {
            console.log("error")
        }
        else {
            console.log("data valid")

            setAccount(false)
            toast.success("You have successfully logged out 😃!", {
                position: "top-center"
            });
            history("/")

        }
    }
    const getText = (items) => {
        setText(items)
        setLiopen(false)
    }
    useEffect(() => {
        getvaliduser()
    }, [])
    return (
        <header>
            <nav>
                <div className="left">
                    <IconButton className='hamburger' onClick={handleopen}>
                        <MenuIcon style={{ color: "#fff" }} />
                    </IconButton>
                    <Drawer open={dropen} onclose={handleclose}>
                        <Rightheader logclose={handleclose} logoutuser={logoutuser} />
                    </Drawer>
                    <div className="navlogo">
                        <NavLink to="/"><img src="./amazon_PNG25.png" alt="" /></NavLink>
                    </div>
                    <div className="nav_searchbaar">
                        <input type="text" name="" onChange={(e) => getText(e.target.value)}
                            placeholder='search your products' id="" />
                        <div className="search_icon">
                            <SearchIcon id="search" />
                        </div>
                        {/* search list */}
                        {
                            text &&
                            <List className='extrasearch' hidden={liopen}>
                                {
                                    products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                                        <ListItem>
                                            <NavLink to={`/getproductsone/${product.id}`} onClick={() => setLiopen(true)}>{product.title.longTitle}</NavLink>

                                        </ListItem>
                                    ))
                                }
                            </List>
                        }
                    </div>
                </div>
                <div className="right">
                    <div className="nav_btn">
                        <NavLink to="/login">Sign in</NavLink>
                    </div>

                    <div className="cart_btn">
                        {
                            account ? <NavLink to="/buynow">
                                <Badge badgeContent={account.carts.length} color="primary">
                                    <ShoppingCartIcon id="icon" />
                                </Badge>
                            </NavLink> : <NavLink to="/login">
                                <Badge badgeContent={0} color="primary">
                                    <ShoppingCartIcon id="icon" />
                                </Badge>
                            </NavLink>
                        }
                        <ToastContainer />
                        <p>Cart</p>
                    </div>
                    {
                        account ? <Avatar className='avtar2' id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>{account.fname[0].toUpperCase()}</Avatar> :
                            <Avatar className='avtar' id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}></Avatar>
                    }

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        {
                            account ? <MenuItem onClick={logoutuser}><LogoutIcon style={{ fontSize: 16, marginRight: 4 }} /> Logout</MenuItem> : ""
                        }

                    </Menu>
                </div>
            </nav>
        </header>
    )
}

export default Navbaar