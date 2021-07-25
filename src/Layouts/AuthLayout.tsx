import { Flex } from '@chakra-ui/react'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from '../Views/Login'

export default function AuthLayout() {
    return (
        <Flex height="100vh" alignItems="center" background="gray.200" justifyContent="center">
            <Flex direction="column" background="gray.100" p={12} rounded={6}>
                <Switch>
                    <Route path="/" component={Login}/>
                </Switch>
            </Flex>
        </Flex>
    )
}
