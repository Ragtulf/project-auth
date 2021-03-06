import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { users } from '../reducers/user'
import { LinkButton } from './Button'
import styled from 'styled-components/macro'

import { Giphy } from './Giphy'

const narniaURL = 'https://auth-narnia.herokuapp.com/narnia'

export const Narnia = () => {
  const accessToken = useSelector((store) => store.users.accessToken)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogOut = () => {
    dispatch(users.actions.logOut())
  }

  useEffect(() => {
    fetch(narniaURL, {
      method: 'GET',
      headers: { Authorization: accessToken }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Please log in!')
        } else {
          return res.json()
        }
      })
      .catch((err) => {
        history.push('/login')
      })
  }, [history, accessToken])


  return (
    <StyledSection>
      <Giphy />
      <Redirect to='/login'>
        <LinkButton onClick={handleLogOut} title='Log Out' />
      </Redirect>
    </StyledSection>
  )
}

const Redirect = styled(Link)`
  text-decoration: none;
`

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 700px;
`