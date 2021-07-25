import { Box } from '@chakra-ui/react';
import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import NavBar from '../Components/Nav/NavBar';
import { AuthContext } from '../Context';
import Customers from '../Views/Dashboard/Customers';
import Dispatch from '../Views/Dashboard/Dispatch';
import DispatchInvoice from '../Views/Dashboard/DispatchInvoice';
import Index from '../Views/Dashboard/Index';

export default function DashboardLayout() {
    const authenticated = useContext(AuthContext);
    
    return (
        <div>
            <NavBar />
            <Box p={[6, 8]}>
                <Switch>
                    <Route path="/" exact component={Index}/>
                    <Route path="/customers" component={Customers}/>
                    <Route path="/dispatch" exact component={Dispatch}/>
                    <Route path="/dispatch/:id" component={DispatchInvoice}/>
                </Switch>
            </Box>
        </div>
    )
}
